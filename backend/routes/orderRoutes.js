import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrders
} from '../controllers/orderController.js';
import { protect, admin } from "../middleware/authMiddleware.js"

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

export default router