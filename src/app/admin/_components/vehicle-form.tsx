'use client';

import { useActionState, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  addVehicle,
  deleteTemporaryVehicleImage,
  updateVehicle,
  type ActionState,
} from '@/app/actions/vehicle';
import {
  flattenVehicleFieldErrors,
  normalizePrimaryImageIndex,
  validateVehicleForm,
  zipVehicleImages,
  type UploadedVehicleImage,
  type VehicleFieldErrors,
  type SerializedVehicle,
} from '@/lib/vehicle-form';
import { VehicleImagesField } from './vehicle-images-field';
import { SubmitButton, ValidationSummary } from './vehicle-form-primitives';
import {
  VehicleAppearanceSection,
  VehicleBasicsSection,
  VehicleDescriptionSection,
  VehicleEngineSection,
  VehicleHistorySection,
  VehicleSalesSection,
} from './vehicle-form-sections';

interface VehicleFormProps {
  vehicle?: SerializedVehicle | null;
}

function getUnsavedUploadIds(images: UploadedVehicleImage[], persistedIds: Set<string>) {
  return images
    .filter((image) => !persistedIds.has(image.publicId))
    .map((image) => image.publicId);
}

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter();
  const editMode = Boolean(vehicle);
  const action = editMode ? updateVehicle : addVehicle;
  const initialImages = useMemo(
    () => zipVehicleImages(vehicle?.images ?? [], vehicle?.imagePublicIds ?? []),
    [vehicle],
  );
  const persistedImageIds = useMemo(
    () => new Set(initialImages.map((image) => image.publicId)),
    [initialImages],
  );

  const [state, formAction] = useActionState<ActionState | null, FormData>(action, null);
  const [images, setImages] = useState<UploadedVehicleImage[]>(initialImages);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(
    normalizePrimaryImageIndex(vehicle?.primaryImageIndex ?? 0, initialImages.length),
  );
  const [clientFieldErrors, setClientFieldErrors] = useState<VehicleFieldErrors>({});
  const [clientMessages, setClientMessages] = useState<string[]>([]);
  const [cleanupMessages, setCleanupMessages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isFormLocked = isSubmitting && !state?.error;

  const cleanupUnsavedUploads = useCallback(async () => {
    const temporaryUploadIds = getUnsavedUploadIds(images, persistedImageIds);

    if (temporaryUploadIds.length === 0) {
      return;
    }

    const results = await Promise.all(
      temporaryUploadIds.map((publicId) => deleteTemporaryVehicleImage(publicId)),
    );

    if (results.some((result) => !result.success)) {
      setCleanupMessages([
        'Nie wszystkie tymczasowe zdjecia udalo sie usunac automatycznie z Cloudinary.',
      ]);
    }
  }, [images, persistedImageIds]);

  const confirmNavigation = useCallback(async (href: string) => {
    const shouldLeave = window.confirm(
      'Masz niezapisane zmiany. Czy na pewno chcesz opuscic formularz bez zapisu?',
    );

    if (!shouldLeave) {
      return;
    }

    await cleanupUnsavedUploads();
    setIsDirty(false);
    router.push(href);
  }, [cleanupUnsavedUploads, router]);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute('href');

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank'
      ) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.href === currentUrl.href) {
        return;
      }

      event.preventDefault();
      void confirmNavigation(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [confirmNavigation, isDirty]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isFormLocked) {
      event.preventDefault();
      return;
    }

    const validation = validateVehicleForm(new FormData(event.currentTarget));

    if (!validation.success) {
      event.preventDefault();
      setClientFieldErrors(flattenVehicleFieldErrors(validation.error));
      setClientMessages(['Popraw oznaczone pola i sproboj ponownie.']);
      return;
    }

    setClientFieldErrors({});
    setClientMessages([]);
    setCleanupMessages([]);
    setIsSubmitting(true);
  }

  async function handleCancel() {
    if (!isDirty) {
      router.push('/admin');
      return;
    }

    await confirmNavigation('/admin');
  }

  async function handleRemoveImage(index: number) {
    const image = images[index];

    if (!image) {
      return;
    }

    const nextImages = images.filter((_, currentIndex) => currentIndex !== index);
    const nextPrimaryIndex = normalizePrimaryImageIndex(
      index === primaryImageIndex
        ? 0
        : index < primaryImageIndex
          ? primaryImageIndex - 1
          : primaryImageIndex,
      nextImages.length,
    );

    setImages(nextImages);
    setPrimaryImageIndex(nextPrimaryIndex);
    setIsDirty(true);

    if (!persistedImageIds.has(image.publicId)) {
      const result = await deleteTemporaryVehicleImage(image.publicId);

      if (!result.success) {
        setCleanupMessages([
          'Nowo wgrane zdjecie zostalo usuniete z formularza, ale nie z Cloudinary.',
        ]);
      }
    }
  }

  const fieldErrors =
    Object.keys(clientFieldErrors).length > 0 ? clientFieldErrors : state?.fieldErrors ?? {};

  const summaryMessages = Array.from(
    new Set(
      [
        ...clientMessages,
        ...(state?.error ? [state.error] : []),
        ...cleanupMessages,
      ].filter(Boolean),
    ),
  );

  return (
    <div className="mt-8 space-y-6">
      <ValidationSummary title="Sprawdz formularz" messages={summaryMessages} />

      <form
        action={formAction}
        onSubmit={handleSubmit}
        onChangeCapture={() => setIsDirty(true)}
        className="space-y-8"
        aria-busy={isFormLocked}
      >
        {editMode ? <input type="hidden" name="id" value={vehicle!.id} /> : null}
        <input type="hidden" name="images" value={JSON.stringify(images)} />
        <input type="hidden" name="primaryImageIndex" value={String(primaryImageIndex)} />

        <fieldset disabled={isFormLocked} className="space-y-8 disabled:opacity-90">
          <VehicleBasicsSection vehicle={vehicle} errors={fieldErrors} />
          <VehicleEngineSection vehicle={vehicle} errors={fieldErrors} />
          <VehicleAppearanceSection vehicle={vehicle} errors={fieldErrors} />
          <VehicleHistorySection vehicle={vehicle} errors={fieldErrors} />
          <VehicleSalesSection vehicle={vehicle} errors={fieldErrors} />
          <VehicleDescriptionSection
            vehicle={vehicle}
            errors={fieldErrors}
            imagesSlot={
              <VehicleImagesField
                images={images}
                primaryImageIndex={primaryImageIndex}
                error={fieldErrors.images?.[0] ?? fieldErrors.primaryImageIndex?.[0]}
                onUpload={(image) => {
                  setImages((currentImages) => {
                    if (currentImages.length === 0) {
                      setPrimaryImageIndex(0);
                    }

                    return [...currentImages, image];
                  });
                  setIsDirty(true);
                }}
                onRemove={(index) => {
                  void handleRemoveImage(index);
                }}
                onSetPrimary={(index) => {
                  setPrimaryImageIndex(index);
                  setIsDirty(true);
                }}
              />
            }
          />

          <div className="admin-appear flex flex-wrap items-center gap-4 pt-2">
            <SubmitButton editMode={editMode} locked={isFormLocked} />
            <button
              type="button"
              onClick={() => {
                void handleCancel();
              }}
              className="admin-btn-secondary px-6"
            >
              Anuluj
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
