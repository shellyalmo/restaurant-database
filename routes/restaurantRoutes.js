import express from "express";
import {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";
import advancedResults from "../middleware/advancedResults.js";
// import Restaurant from '../models/Restaurant.js';

const router = express.Router();

router.route("/").get(getRestaurants).post(createRestaurant);

router
  .route("/:id")
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

export default router;
