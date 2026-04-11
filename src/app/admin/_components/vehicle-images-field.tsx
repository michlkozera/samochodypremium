'use client';

import Image from 'next/image';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import type { UploadedVehicleImage } from '@/lib/vehicle-form';
import { labelCls } from './vehicle-form-primitives';

type VehicleImagesFieldProps = {
  images: UploadedVehicleImage[];
  primaryImageIndex: number;
  error?: string;
  onUpload: (image: UploadedVehicleImage) => void;
  onRemove: (index: number) => void;
  onSetPrimary: (index: number) => void;
};

function isUploadInfo(
  value: unknown,
): value is { secure_url: string; public_id: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'secure_url' in value &&
    typeof value.secure_url === 'string' &&
    'public_id' in value &&
    typeof value.public_id === 'string'
  );
}

export function VehicleImagesField({
  images,
  primaryImageIndex,
  error,
  onUpload,
  onRemove,
  onSetPrimary,
}: VehicleImagesFieldProps) {
  return (
    <div>
      <span className={labelCls}>Zdjecia</span>
      <CldUploadWidget
        uploadPreset="premium_cars"
        options={{
          multiple: true,
          maxFiles: Math.max(0, 30 - images.length),
          sources: ['local', 'url', 'camera'],
        }}
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          if (isUploadInfo(result.info)) {
            onUpload({
              url: result.info.secure_url,
              publicId: result.info.public_id,
            });
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={images.length >= 30}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-10 text-graphite-500 transition hover:border-amber-500/30 hover:bg-white/[0.04] hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
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
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            <span className="text-sm font-medium">
              {images.length >= 30
                ? 'Osiagnieto limit 30 zdjec'
                : 'Kliknij lub przeciagnij pliki, aby wgrac zdjecia'}
            </span>
            <span className="text-xs text-graphite-600">
              JPG, PNG, WebP - maks. 30 plikow
            </span>
          </button>
        )}
      </CldUploadWidget>

      {error ? <p className="mt-1.5 text-xs text-red-400">{error}</p> : null}

      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => {
            const isPrimary = index === primaryImageIndex;

            return (
              <div
                key={`${image.publicId}-${index}`}
                className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={`Zdjecie ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <div className="absolute left-1.5 top-1.5 flex flex-wrap gap-1.5">
                  {isPrimary ? (
                    <span className="rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-graphite-950">
                      Glowne
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSetPrimary(index)}
                      className="rounded bg-graphite-950/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-amber-500 hover:text-graphite-950"
                    >
                      Ustaw glowne
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-graphite-950/80 text-graphite-400 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-red-500/80 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>

                <div className="border-t border-white/[0.06] px-3 py-2 text-[11px] text-graphite-500">
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
