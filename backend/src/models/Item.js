import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add indexes for better query performance
itemSchema.index({ name: 1 });
itemSchema.index({ status: 1 });
itemSchema.index({ createdAt: -1 });

const Item = mongoose.model('Item', itemSchema);

export default Item;
