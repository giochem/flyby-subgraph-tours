const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.TOURS_MONGO_URL);
const Tour = conn.model("Tour", require("../models/Tour"));

class TourApi {
  async getTourById(id) {
    try {
      return await Tour.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTours() {
    try {
      return await Tour.find();
    } catch (error) {
      console.log(error);
    }
  }
  async createTour(tour) {
    try {
      return await Tour.create(tour);
    } catch (error) {
      console.log(error);
    }
  }
  async updateTour(id, tour) {
    try {
      return await Tour.findByIdAndUpdate(id, tour, { new: true });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTour(id) {
    try {
      return await Tour.findByIdAndDelete(id);
    } catch (error) {
      console;
    }
  }
}

module.exports = TourApi;
