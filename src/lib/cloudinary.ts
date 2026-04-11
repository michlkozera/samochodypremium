import crypto from 'node:crypto';

function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret };
}

function buildSignature(publicId: string, timestamp: number, apiSecret: string) {
  return crypto
    .createHash('sha1')
    .update(`invalidate=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
}

export async function deleteCloudinaryImages(publicIds: string[]) {
  const uniquePublicIds = Array.from(
    new Set(publicIds.map((publicId) => publicId.trim()).filter(Boolean)),
  );

  if (uniquePublicIds.length === 0) {
    return { deleted: [] as string[], skipped: [] as string[] };
  }

  const config = getCloudinaryConfig();

  if (!config) {
    return { deleted: [] as string[], skipped: uniquePublicIds };
  }

  const deleted: string[] = [];
  const skipped: string[] = [];

  await Promise.all(
    uniquePublicIds.map(async (publicId) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = buildSignature(publicId, timestamp, config.apiSecret);
      const body = new URLSearchParams({
        public_id: publicId,
        timestamp: String(timestamp),
        api_key: config.apiKey,
        signature,
        invalidate: 'true',
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        },
      );

      if (!response.ok) {
        skipped.push(publicId);
        return;
      }

      deleted.push(publicId);
    }),
  );

  return { deleted, skipped };
}
