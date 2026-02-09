import mongoose from 'mongoose';

/**
 * Item Schema Definition
 * Separated schema for reusability and testing
 */

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive', 'pending'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
      index: true,
    },
    metadata: {
      type: Map,
      of: String,
      default: new Map(),
    },
    tags: {
      type: [String],
      default: [],
    },
    priority: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false, // Don't include in queries by default
    },
  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
itemSchema.index({ name: 1, status: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ tags: 1 });

// Virtual properties
itemSchema.virtual('isActive').get(function() {
  return this.status === 'active';
});

// Instance methods
itemSchema.methods.activate = function() {
  this.status = 'active';
  return this.save();
};

itemSchema.methods.deactivate = function() {
  this.status = 'inactive';
  return this.save();
};

itemSchema.methods.softDelete = function() {
  this.isDeleted = true;
  return this.save();
};

// Static methods
itemSchema.statics.findActive = function() {
  return this.find({ status: 'active', isDeleted: false });
};

itemSchema.statics.findByTag = function(tag) {
  return this.find({ tags: tag, isDeleted: false });
};

// Pre-save hook
itemSchema.pre('save', function(next) {
  // Add any pre-save logic here
  next();
});

// Query middleware - exclude soft deleted items by default
itemSchema.pre(/^find/, function(next) {
  if (!this.getOptions().includeDeleted) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});

export default itemSchema;
