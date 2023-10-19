const User = require("../models/User");
const Dinner = require("../models/Dinner");

const QRcode = require("qrcode");

exports.createUser = async (req, res) => {
  const { name, lastname } = req.body.user;
  const { UserId } = req.body;
  try {
    if (UserId.length !== 0) {
      const duplicateUser = await User.findOne({ _id: UserId });

      if (duplicateUser) {
        duplicateUser.name = name;
        duplicateUser.lastname = lastname;
        const user = await duplicateUser.save();
        res.status(201).json({
          message: "تغغیرات با موفقیت انجام شد.",
          user,
          userId: user._id,
        });
      }
    } else {
      const user = await User.create({ name, lastname });
      return res
        .status(201)
        .json({ message: "کاربر با موفقیت ذخیره شد.", userId: user._id, user });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.GetUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

//DINNER

exports.createDinner = async (req, res) => {
  const { dinner, drinks } = req.body.values;
  const { UserId, Totall } = req.body;
  try {
    const selectDinnerByUser = await Dinner.findOne({ userId: UserId });
    if (selectDinnerByUser) {
      selectDinnerByUser.dinnerStatus = dinner;
      selectDinnerByUser.drinksStatus = drinks;
      selectDinnerByUser.price = Totall;
      const selectedDinner = await selectDinnerByUser.save();
      res
        .status(201)
        .json({ message: "تغغیرات با موفقیت انجام شد.", selectedDinner });
    } else {
      const selectedDinner = await Dinner.create({
        userId: UserId,
        dinnerStatus: dinner,
        drinksStatus: drinks,
        price: Totall,
      });
      return res
        .status(201)
        .json({ message: " اطلاعات با موفقیت ذخیره شد. ", selectedDinner });
    }
  } catch (err) {
    console.log(err);
  }
};

//getDATA
exports.GetInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    const dinner = await Dinner.find({ userId });
    const user = await User.find({ _id: userId });

    return res.status(200).json({ dinner, user });
  } catch (err) {
    console.log(err);
  }
};

//QR CODE

exports.CreateQrCode = (req, res) => {
  const { userId } = req.body;
  const url = `https://javavnan-form-user.vercel.app/login/${userId}`;

  QRcode.toDataURL(url, function (err, url) {
    console.log(err);
    res.status(200).json({ message: "qrcode ساخته شد", url });
  });
};

//IS ARRIWED
exports.arriwed = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.status = "arriwed";
      const selectedUser = await user.save();
      res
        .status(201)
        .json({ message: "تغغیرات با موفقیت انجام شد.", selectedUser });
    } else {
      res
        .status(404)
        .json({ message: "کاربر پیدا نشد." });
    }
  } catch (err) {
    console.log(err);
  }
};

//IS dinner
exports.deliverDinner = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.dinnerstatus = "delliverd";
      const selectedUser = await user.save();
      res
        .status(201)
        .json({ message: "تغغیرات با موفقیت انجام شد.", selectedUser });
    } else {
      res
        .status(404)
        .json({ message: "کاربر پیدا نشد." });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.GetAllUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json([user]);
  } catch (err) {
    console.log(err);
  }
};
