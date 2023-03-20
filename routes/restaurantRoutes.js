import express from "express";
import {
  getRestaurants,
  createRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.route("/").get(getRestaurants).post(createRestaurant);

export default router;
