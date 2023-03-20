import mongoose from "mongoose";
import slugify from "slugify";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a restaurant name"],
      unique: [true, "Restaurant name already exists"],
      trim: true,
      maxlength: [50, "Restaurant name can not be more than 50 characters"],
    },
    slug: String,
    address: {
      city: {
        type: String,
        required: [true, "Please add a city name"],
        trim: true,
      },
      street: {
        type: String,
        required: [true, "Please add a street name"],
        trim: true,
      },
      coordinates: {
        type: [Number],
        required: [true, "Please add coordinates"],
        trim: true,
      },
    },
    cuisine: {
      type: String,
      required: [true, "Please add a cuisine type"],
      trim: true,
      maxlength: [50, "Cuisine type can not be more than 50 characters"],
    },
    kosher: Boolean,
    reviews: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        score: {
          type: Number,
          min: [1, "Score must be at least 1"],
          max: [5, "Score can not be more than 5"],
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      //hide the _id and the __v fields from the frontend
      transform: function (doc, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
    toObject: {
      virtuals: true,
      //hide the _id and the __v fields from the frontend
      transform: function (doc, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

//Middleware - create slug from name
RestaurantSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Restaurant", RestaurantSchema);
