const express = require("express")
const Order = require("../models/order")
const security = require("../middleware/security")
const router = express.Router()

router.get('/', security.requireAuthenticatedUser ,async (req, res, next) => {
    try {
        const user = res.locals.user;
        const orders = await Order.listOrdersForUser(user);
        return res.status(200).json({ orders });
      } catch (err) {
        next(err)
      }
})

router.post('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const req_order = req.body.order
        const params = {order: req_order, user: user}
        const order = await Order.createOrder(params);
        return res.status(200).json({ order });
      } catch (err) {
        next(err)
      }
})

module.exports = router;