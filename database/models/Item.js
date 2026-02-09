import mongoose from 'mongoose';
import itemSchema from '../schemas/itemSchema.js';

/**
 * Item Model
 * Handles all database operations for items
 */

const Item = mongoose.model('Item', itemSchema);

export default Item;
