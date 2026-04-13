'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { UploadedVehicleImage } from '@/lib/vehicle-form';
import { labelCls } from './vehicle-form-primitives';

const MAX_IMAGES = 30;
const UPLOAD_PRESET = 'premium_cars';
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type VehicleImagesFieldProps = {
  images: UploadedVehicleImage[];
  primaryImageIndex: number;
  error?: string;
  onUpload: (image: UploadedVehicleImage) => void;
  onRemove: (index: number) => void;
  onSetPrimary: (index: number) => void;
};

async function uploadImageFile(file: File): Promise<UploadedVehicleImage> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Brak konfiguracji Cloudinary.');
  }

  const payload = new FormData();
  payload.append('file', file);
  payload.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      body: payload,
    },
  );

  if (!response.ok) {
    throw new Error('Nie udalo sie wyslac pliku do Cloudinary.');
  }

  const result = await response.json() as {
    secure_url?: string;
    public_id?: string;
  };

  if (!result.secure_url || !result.public_id) {
    throw new Error('Cloudinary nie zwrocilo danych o przeslanym pliku.');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

function isImageFile(file: File) {
  if (file.type.startsWith('image/')) {
    return true;
  }

  return /\.(avif|gif|heic|heif|jpe?g|png|webp)$/i.test(file.name);
}

export function VehicleImagesField({
  images,
  primaryImageIndex,
  error,
  onUpload,
  onRemove,
  onSetPrimary,
}: VehicleImagesFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const slotsLeft = Math.max(0, MAX_IMAGES - images.length);
  const interactionLocked = isUploading || slotsLeft === 0;

  async function handleUpload(files: File[]) {
    if (interactionLocked) {
      return;
    }

    if (!CLOUDINARY_CLOUD_NAME) {
      setUploadMessage('Brak konfiguracji Cloudinary. Ustaw NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.');
      return;
    }

    const imageFiles = files.filter((file) => isImageFile(file));

    if (imageFiles.length === 0) {
      setUploadMessage('Dodaj pliki graficzne (JPG, PNG, WebP lub AVIF).');
      return;
    }

    const acceptedFiles = imageFiles.slice(0, slotsLeft);
    const skippedByLimit = imageFiles.length - acceptedFiles.length;
    const failedFiles: string[] = [];

    setUploadMessage(null);
    setIsUploading(true);
    setUploadProgress({ done: 0, total: acceptedFiles.length });

    for (const [index, file] of acceptedFiles.entries()) {
      try {
        const uploadedImage = await uploadImageFile(file);
        onUpload(uploadedImage);
      } catch {
        failedFiles.push(file.name);
      } finally {
        setUploadProgress({ done: index + 1, total: acceptedFiles.length });
      }
    }

    setIsUploading(false);
    setUploadProgress(null);

    if (failedFiles.length > 0 || skippedByLimit > 0) {
      const reasons: string[] = [];

      if (failedFiles.length > 0) {
        reasons.push(`Nie udalo sie wgrac ${failedFiles.length} plikow.`);
      }

      if (skippedByLimit > 0) {
        reasons.push(`Pominieto ${skippedByLimit} plikow (limit ${MAX_IMAGES} zdjec).`);
      }

      setUploadMessage(reasons.join(' '));
      return;
    }

    setUploadMessage('Pliki zostaly poprawnie dodane do galerii.');
  }

  function openFilePicker() {
    if (interactionLocked) {
      return;
    }

    fileInputRef.current?.click();
  }

  return (
    <div>
      <span className={labelCls}>Zdjecia</span>
      <div
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!interactionLocked) {
            setIsDragging(true);
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!interactionLocked) {
            setIsDragging(true);
          }
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (interactionLocked) {
            return;
          }

          const files = Array.from(event.dataTransfer.files);
          void handleUpload(files);
        }}
        role="button"
        tabIndex={interactionLocked ? -1 : 0}
        aria-disabled={interactionLocked}
        className={`admin-surface-soft mt-2 flex w-full flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition ${
          isDragging
            ? 'border-zinc-950 bg-zinc-950 text-white'
            : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950'
        } ${interactionLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            const pickedFiles = Array.from(event.target.files ?? []);
            if (pickedFiles.length > 0) {
              void handleUpload(pickedFiles);
            }

            event.currentTarget.value = '';
          }}
        />
        {isUploading ? (
          <svg
            className="h-10 w-10 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25V6A2.25 2.25 0 0 1 9.75 3.75h4.5A2.25 2.25 0 0 1 16.5 6v2.25m-10.5 0h12A2.25 2.25 0 0 1 20.25 10.5v7.5A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18v-7.5A2.25 2.25 0 0 1 6 8.25Zm6 2.25v5m0 0 2.25-2.25M12 15.75 9.75 13.5"
            />
          </svg>
        )}
        <span className="text-sm font-semibold uppercase tracking-[0.12em]">
          {slotsLeft === 0
            ? `Osiagnieto limit ${MAX_IMAGES} zdjec`
            : isDragging
              ? 'Upusc zdjecia, aby je dodac'
              : 'Przeciagnij i upusc zdjecia tutaj'}
        </span>
        <span className="text-xs text-zinc-500">
          Lub kliknij, aby wybrac pliki. JPG, PNG, WebP, AVIF | pozostalo {slotsLeft} z {MAX_IMAGES}.
        </span>
        {uploadProgress ? (
          <span className="text-xs font-medium uppercase tracking-[0.1em]">
            Wysylanie: {uploadProgress.done}/{uploadProgress.total}
          </span>
        ) : null}
      </div>

      {error ? <p className="mt-1.5 text-xs text-zinc-700">{error}</p> : null}
      {uploadMessage ? <p className="mt-1.5 text-xs text-zinc-700">{uploadMessage}</p> : null}

      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => {
            const isPrimary = index === primaryImageIndex;

            return (
              <div
                key={`${image.publicId}-${index}`}
                className="group relative overflow-hidden border border-zinc-300 bg-white transition hover:border-zinc-950"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={`Zdjecie ${index + 1}`}
                    fill
                    className="object-cover saturate-110 transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <div className="absolute left-1.5 top-1.5 flex flex-wrap gap-1.5">
                  {isPrimary ? (
                    <span className="border border-zinc-950 bg-zinc-950 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Glowne
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSetPrimary(index)}
                      className="border border-zinc-950 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
                    >
                      Ustaw glowne
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center border border-zinc-950 bg-white text-zinc-950 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-950 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>

                <div className="border-t border-zinc-200 px-3 py-2 text-[11px] text-zinc-500">
                  Zdjecie {index + 1} z {images.length}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
