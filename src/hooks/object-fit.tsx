import { useEffect, useState } from 'react';

export default function useObjectFit(imageUrls: string[]) {
  const [objectFits, setObjectFits] = useState<("cover" | "contain")[]>([]);

  useEffect(() => {
    const calculateObjectFit = (imageUrl: string) => {
      return new Promise<"cover" | "contain">((resolve) => {
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          const intrinsicWidth = img.naturalWidth;
          const intrinsicHeight = img.naturalHeight;

          const imageRatio = intrinsicWidth / intrinsicHeight;

          const containerRatio = 1;

          resolve(imageRatio > containerRatio ? "cover" : "contain");
        };
      });
    };

    const calculateAllObjectFits = async () => {
      const fits = await Promise.all(imageUrls.map(calculateObjectFit));
      setObjectFits(fits);
    };

    if (imageUrls?.length > 0) {
      calculateAllObjectFits();
    }
  }, [imageUrls]);

  if (!imageUrls) return []

  return objectFits;
}