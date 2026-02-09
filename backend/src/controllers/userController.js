import { User, paginate, isValidObjectId } from '../../../database/index.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastActive: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const inactiveUsers = await User.countDocuments({ status: 'inactive' });
    
    // Get users created this month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = await User.countDocuments({
      createdAt: { $gte: firstDayOfMonth }
    });

    // Get users created last month for growth calculation
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const newLastMonth = await User.countDocuments({
      createdAt: { 
        $gte: firstDayOfLastMonth,
        $lte: lastDayOfLastMonth
      }
    });

    // Calculate growth percentage
    const userGrowth = newLastMonth > 0 
      ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100)
      : 100;

    // Get active users from last month
    const activeLastMonth = await User.countDocuments({
      status: 'active',
      updatedAt: {
        $gte: firstDayOfLastMonth,
        $lte: lastDayOfLastMonth
      }
    });

    const activeGrowth = activeLastMonth > 0
      ? Math.round(((activeUsers - activeLastMonth) / activeLastMonth) * 100)
      : 100;

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        newThisMonth,
        userGrowth,
        activeGrowth
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
};