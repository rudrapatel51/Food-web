import express  from 'express'
import Order from '../models/Order.js'


const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    let orderData = { ...req.body };
    if (Array.isArray(orderData.items) && Array.isArray(orderData.items[0])) {
      orderData.items = orderData.items[0];
    }
    const newOrder = new Order(orderData);
    await newOrder.validate();
    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      orderId: savedOrder._id,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error placing order',
      error: error.message
    });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

export default router;
