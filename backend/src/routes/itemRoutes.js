import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';

const router = express.Router();

router.route('/')
  .get(getAllItems)
  .post(createItem);

router.route('/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

export default router;
