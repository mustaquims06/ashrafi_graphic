// src/utils/getPrimaryImage.js
export const getPrimaryImage = (product) => {
  try {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      return (
        product.images.find((img) => img.isPrimary)?.url ||
        product.images[0]?.url
      );
    }
    if (product?.image) return product.image;   // admin uploaded product
    return "/placeholder.png";                  // fallback image
  } catch (e) {
    console.error("⚠️ getPrimaryImage failed:", e);
    return "/placeholder.png";
  }
};