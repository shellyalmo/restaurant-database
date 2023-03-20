import Restaurant from "../models/Restaurant";

//@desc Get all restaurants
//@route GET /api/v1/restaurants
//@access Public
export const getRestaurants = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find({});
    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      error: error.message,
    });
  }
};

//@desc Create a restaurant
//@route POST /api/v1/restaurants
//@access Private
export const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      error: error.message,
    });
  }
};
