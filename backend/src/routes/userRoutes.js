import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from '../controllers/userController.js';

const router = express.Router();

// Stats route must come before /:id route
router.get('/stats/overview', getUserStats);

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;