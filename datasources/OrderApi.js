const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.ORDERS_MONGO_URL);
const Order = conn.model("Order", require("../models/Order"));

class OrderApi {
  async getOrderByAccountIdAndTourId({ accountId, tourId }) {
    try {
      return await Order.findOne({ accountId, tourId });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrderApi;
