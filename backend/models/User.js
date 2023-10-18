const mongoose = require("mongoose");

const { schema } = require("./secure/userValidation");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام الزامی می باشد"],
    trim: true,
    maxlength: [225, "نام  نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نام نباید کمتر از 3 کاراکتر باشد"],
  },
  lastname: {
    type: String,
    required: [true, "نام خانوادگی الزامی می باشد"],
    trim: true,
    maxlength: [225, " نام خانوادگی نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, " نام خانوادگی نباید کمتر از 3 کاراکتر باشد"],
  },
  status: {
    type: String,
    default: "notArriwed",
    enum: ["arriwed", "notArriwed"],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};


module.exports = mongoose.models.User || mongoose.model("User", userSchema);
