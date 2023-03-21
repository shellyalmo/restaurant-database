import asyncHandler from "../middleware/asyncHandler.js";
import Restaurant from "../models/Restaurant.js";

//@desc Get all restaurants
//@route GET /api/v1/restaurants
//@access Public
export const getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.find({});
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

//@desc Create a restaurant
//@route POST /api/v1/restaurants
//@access Private
export const createRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

//@desc Get a restaurant
//@route GET /api/v1/restaurants/:id
//@access Private
export const getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new Error(`Restaurant with id: ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

//@desc Update a restaurant
//@route PUT /api/v1/restaurants/:id
//@access Private
export const updateRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!restaurant) {
    return next(new Error(`Restaurant with id: ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

// @desc    Delete a Restaurant
// @route   DELETE /api/v1/restaurants/:id
// @access  Private
export const deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new Error(`Restaurant with ID ${req.params.id} not found`));
  }

  restaurant.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
