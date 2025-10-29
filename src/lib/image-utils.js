export const cropImageToSquare = (imageSrc, box) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Could not get canvas context"));
      }

      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = img;

      // Convert normalized coordinates to absolute pixel values
      const absX = box.x * imgWidth;
      const absY = box.y * imgHeight;
      const absWidth = box.width * imgWidth;
      const absHeight = box.height * imgHeight;

      // Determine the size of the square crop
      const size = Math.max(absWidth, absHeight) * 1.2; // Add 20% padding

      // Calculate the center of the bounding box
      const centerX = absX + absWidth / 2;
      const centerY = absY + absHeight / 2;

      // Calculate the top-left corner of the square crop
      let cropX = centerX - size / 2;
      let cropY = centerY - size / 2;

      // Clamp the crop coordinates to stay within the image boundaries
      cropX = Math.max(0, Math.min(cropX, imgWidth - size));
      cropY = Math.max(0, Math.min(cropY, imgHeight - size));

      const finalSize = Math.min(size, imgWidth - cropX, imgHeight - cropY);

      const outputSize = 512;
      canvas.width = outputSize;
      canvas.height = outputSize;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, outputSize, outputSize);

      ctx.drawImage(
        img,
        cropX,
        cropY,
        finalSize,
        finalSize,
        0,
        0,
        outputSize,
        outputSize
      );

      // Convert canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error("Could not create blob from canvas"));
          }
          resolve(blob);
        },
        "image/png",
        0.95
      ); // 0.95 is the quality (only applies to jpeg)
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};
