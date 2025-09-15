import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: 'milk' | 'cheese' | 'yogurt' | 'butter' | 'cream' | 'ice-cream' | 'other';
  image: string;
  stock: number;
  unit: string; // e.g., 'liter', 'kg', 'pack'
  brand: string;
  expiryDays: number; // days until expiry
  isOrganic: boolean;
  fatContent?: number; // percentage
  volume?: number; // in ml or grams
  rating: number;
  numReviews: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'ice-cream', 'other']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['liter', 'ml', 'kg', 'g', 'pack', 'piece']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  expiryDays: {
    type: Number,
    required: [true, 'Expiry days is required'],
    min: [1, 'Expiry days must be at least 1']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  fatContent: {
    type: Number,
    min: [0, 'Fat content cannot be negative'],
    max: [100, 'Fat content cannot exceed 100%']
  },
  volume: {
    type: Number,
    min: [0, 'Volume cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  numReviews: {
    type: Number,
    default: 0,
    min: [0, 'Number of reviews cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search optimization
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ price: 1 });

export default mongoose.model<IProduct>('Product', productSchema);
