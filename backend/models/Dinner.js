const mongoose = require("mongoose");

const { schema } = require("./secure/dinnerValidation");

const dinnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "ای دی کاربر الزامی می باشد"],
    ref: "User",
  },
  dinnerStatus: {
    type: String,
    default: null,
    enum: ["nodinner", "olvie", null],
  },
  drinksStatus: {
    type: String,
    default: null,
    enum: ["cocakola", "fanta", "noDrink" , null],
  },
  price:{
    type:Number,
    required: [true, "قیمت الزامی می باشد"],
  },
});

dinnerSchema.statics.dinnerValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports =
  mongoose.models.Dinner || mongoose.model("Dinner", dinnerSchema);
