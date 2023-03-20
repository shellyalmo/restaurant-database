import express from "express";
import {
  getRestaurants,
  createRestaurant,
  getRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.route("/").get(getRestaurants).post(createRestaurant);
router.route("/:id").get(getRestaurant);
export default router;
