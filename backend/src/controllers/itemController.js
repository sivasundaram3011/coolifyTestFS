import { Item, paginate } from '../../../database/index.js';

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = status ? { status } : {};
    
    // Use the paginate utility from database module
    const result = await paginate(Item, query, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message,
    });
  }
};

// Get single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message,
    });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      data: item,
      message: 'Item created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating item',
      error: error.message,
    });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      data: item,
      message: 'Item updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating item',
      error: error.message,
    });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message,
    });
  }
};
