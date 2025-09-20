import { faker } from '@faker-js/faker';

import P1Img1 from '../images/product1_images/P1Img1.png'
import P1Img2 from '../images/product1_images/P1Img2.png'
import P1Img3 from '../images/product1_images/P1Img3.png'
import P1Img4 from '../images/product1_images/P1Img4.png'
import P2Img1 from '../images/product2_images/P2Img1.png'
import P2Img2 from '../images/product2_images/P2Img2.png'
import P2Img3 from '../images/product2_images/P2Img3.png'
import P2Img4 from '../images/product2_images/P2Img4.png'


// Available sizes for Islamic caps
const availableSizes = [
  { id: '20.5', value: '20.5', label: '20.5 cm' },
  { id: '21', value: '21', label: '21 cm' },
  { id: '21.5', value: '21.5', label: '21.5 cm' },
  { id: '22', value: '22', label: '22 cm' },
  { id: '22.5', value: '22.5', label: '22.5 cm' },
  { id: '23', value: '23', label: '23 cm' }
];

// Generate mock products - Database-ready structure
export const products = [
  {
    id: 1,
    name: 'Premium Ashrafi Islamic Cap - Black with Golden Embroidery',
    slug: 'premium-ashrafi-islamic-cap-black-golden',
    price: 280,
    currency: 'INR',
    currencySymbol: '₹',
    images: [
      {
        id: 1,
        url: P1Img1,
        alt: 'Ashrafi Islamic Cap - Front View',
        isPrimary: true,
        sortOrder: 1
      },
      {
        id: 2,
        url: P1Img2,
        alt: 'Ashrafi Islamic Cap - Side View',
        isPrimary: false,
        sortOrder: 2
      },
      {
        id: 3,
        url: P1Img3,
        alt: 'Ashrafi Islamic Cap - Top View',
        isPrimary: false,
        sortOrder: 3
      },
      {
        id: 4,
        url: P1Img4,
        alt: 'Ashrafi Islamic Cap - Detail View',
        isPrimary: false,
        sortOrder: 4
      }
    ],
    shortDescription: 'Elegant black Islamic cap with premium golden embroidery and Arabic calligraphy.',
    fullDescription: `This is an elegant Ashrafi Islamic cap, designed with a blend of tradition and style. Made from premium black fabric, it features a sleek look enhanced by fine golden embroidery. The front showcases beautifully stitched Arabic calligraphy reading "Ashrafi", encircled by a golden halo design that adds a touch of distinction. Two parallel golden embroidery lines run around the cap, giving it a refined and graceful finish.

Perfect for prayers, religious gatherings, and cultural events, this cap offers both comfort and durability. Its lightweight fabric ensures breathability, making it suitable for long wear.

Key Features:
• Premium black fabric
• Golden and white embroidery
• Arabic calligraphy "Ashrafi" with halo motif
• Double-line golden stitch detailing
• Comfortable, durable, and lightweight

This cap is a perfect combination of spiritual identity and sophisticated design, ideal for daily and special occasions alike.`,
    category: 'Islamic Caps',
    categoryId: 1,
    subcategory: 'Premium Caps',
    subcategoryId: 1,
    brand: 'Ashrafi Collection',
    brandId: 1,
    sku: 'ASH-CAP-001',
    barcode: '1234567890123',
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    stockQuantity: 50,
    sizes: availableSizes,
    defaultSize: '22',
    weight: 50, // in grams
    dimensions: {
      length: 22,
      width: 22,
      height: 8
    },
    material: 'Premium Cotton Blend',
    careInstructions: 'Hand wash only, air dry',
    tags: ['islamic', 'prayer', 'ashrafi', 'embroidery', 'traditional'],
    seoTitle: 'Premium Ashrafi Islamic Cap - Black with Golden Embroidery',
    seoDescription: 'Elegant Islamic cap with Arabic calligraphy and golden embroidery. Perfect for prayers and religious occasions.',
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 2,
    name: 'Classic Ashrafi Islamic Cap - Traditional Black Design',
    slug: 'classic-ashrafi-islamic-cap-traditional-black',
    price: 280,
    currency: 'INR',
    currencySymbol: '₹',
    images: [
      {
        id: 5,
        url: P2Img1,
        alt: 'Classic Ashrafi Islamic Cap - Front View',
        isPrimary: true,
        sortOrder: 1
      },
      {
        id: 6,
        url: P2Img2,
        alt: 'Classic Ashrafi Islamic Cap - Side View',
        isPrimary: false,
        sortOrder: 2
      },
      {
        id: 7,
        url: P2Img3,
        alt: 'Classic Ashrafi Islamic Cap - Top View',
        isPrimary: false,
        sortOrder: 3
      },
      {
        id: 8,
        url: P2Img4,
        alt: 'Classic Ashrafi Islamic Cap - Detail View',
        isPrimary: false,
        sortOrder: 4
      }
    ],
    shortDescription: 'Traditional black Islamic cap with elegant design and superior craftsmanship.',
    fullDescription: `This is an elegant Ashrafi Islamic cap, designed with a blend of tradition and style. Made from premium black fabric, it features a sleek look enhanced by fine golden embroidery. The front showcases beautifully stitched Arabic calligraphy reading "Ashrafi", encircled by a golden halo design that adds a touch of distinction. Two parallel golden embroidery lines run around the cap, giving it a refined and graceful finish.

Perfect for prayers, religious gatherings, and cultural events, this cap offers both comfort and durability. Its lightweight fabric ensures breathability, making it suitable for long wear.

Key Features:
• Premium black fabric
• Golden and white embroidery
• Arabic calligraphy "Ashrafi" with halo motif
• Double-line golden stitch detailing
• Comfortable, durable, and lightweight

This cap is a perfect combination of spiritual identity and sophisticated design, ideal for daily and special occasions alike.`,
    category: 'Islamic Caps',
    categoryId: 1,
    subcategory: 'Classic Caps',
    subcategoryId: 2,
    brand: 'Ashrafi Collection',
    brandId: 1,
    sku: 'ASH-CAP-002',
    barcode: '1234567890124',
    rating: 4.7,
    reviewCount: 34,
    inStock: true,
    stockQuantity: 45,
    sizes: availableSizes,
    defaultSize: '22',
    weight: 50, // in grams
    dimensions: {
      length: 22,
      width: 22,
      height: 8
    },
    material: 'Premium Cotton Blend',
    careInstructions: 'Hand wash only, air dry',
    tags: ['islamic', 'prayer', 'ashrafi', 'traditional', 'classic'],
    seoTitle: 'Classic Ashrafi Islamic Cap - Traditional Black Design',
    seoDescription: 'Traditional Islamic cap with classic design and premium quality. Ideal for daily prayers and special occasions.',
    isActive: true,
    isFeatured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  }
];

// Helper function to get primary image
export const getPrimaryImage = (product) => {
  const primaryImage = product.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.url : product.images[0]?.url;
};

// Generate mock reviews for each product
export const reviews = products.reduce((acc, product) => {
  const productReviews = [];
  const reviewCount = faker.number.int({ min: 8, max: 20 });
  
  for (let i = 0; i < reviewCount; i++) {
    productReviews.push({
      id: faker.string.uuid(),
      productId: product.id,
      userId: faker.string.uuid(),
      userName: faker.person.fullName(),
      rating: faker.number.int({ min: 4, max: 5 }),
      comment: faker.lorem.paragraph({ min: 1, max: 3 }),
      date: faker.date.recent({ days: 90 }),
      verified: faker.datatype.boolean({ probability: 0.85 }),
      helpful: faker.number.int({ min: 0, max: 15 }),
      size: faker.helpers.arrayElement(availableSizes).value
    });
  }
  
  acc[product.id] = productReviews;
  return acc;
}, {});

// Generate mock purchase history for the current user
export const userPurchases = [
  { 
    productId: 1, 
    purchaseDate: faker.date.recent({ days: 30 }),
    orderId: 'ORD-001',
    size: '22',
    quantity: 1
  },
  { 
    productId: 2, 
    purchaseDate: faker.date.recent({ days: 15 }),
    orderId: 'ORD-002', 
    size: '21.5',
    quantity: 1
  }
];

// Mock current user - Database-ready structure
export const currentUser = {
  id: faker.string.uuid(),
  name: 'Ahmed Khan',
  email: 'ahmed.khan@example.com',
  phone: '+91 9876543210',
  avatar: null,
  isVerified: true,
  createdAt: new Date('2023-12-01'),
  preferences: {
    currency: 'INR',
    language: 'en-GB'
  }
};

// Mock categories for future database use
export const categories = [
  {
    id: 1,
    name: 'Islamic Caps',
    slug: 'islamic-caps',
    description: 'Traditional and modern Islamic caps for all occasions',
    isActive: true,
    sortOrder: 1
  }
];

// Mock brands for future database use
export const brands = [
  {
    id: 1,
    name: 'Ashrafi Collection',
    slug: 'ashrafi-collection',
    description: 'Premium Islamic wear and accessories',
    logo: null,
    isActive: true
  }
];
