const User = require("../models/User");
const Dinner = require("../models/Dinner");

const QRcode = require("qrcode");

const Zarinpal = require("zarinpal-nodejs");

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

exports.CreateQrCode = async (req, res) => {
  const { userId } = req.body;
  const url = `https://kulucheh.ir/login/${userId}`;
  const user = await User.findById(userId);

  QRcode.toDataURL(url, async function (err, url) {
    console.log(err);
    user.QRCode = url;
    await user.save();
    res.status(200).json({ message: "qrcode ساخته شد", url, user });
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
      res.status(404).json({ message: "کاربر پیدا نشد." });
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
      res.status(404).json({ message: "کاربر پیدا نشد." });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.GetAllUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};

exports.DeleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ message: "کاربر پیدا نشد." });
    }
    return res.status(200).json({ user, message: "کاربر حذف شد." });
  } catch (err) {
    console.log(err);
  }
};

exports.createTransaction = async (req, res) => {
  console.log("first")
  const merchantID = "9fbac503-4969-40cf-b95b-5aeed5346add";
  const zarinpal = new Zarinpal(merchantID);
  const { price  , userId} = req.body;
  try {
    // currency by default is Toman
    const paymentResponse = await zarinpal.paymentRequest({
      amount: price,
      callback_url: "https://kulucheh.ir",
      description: userId,
    });

    // if creating payement transaction was not successfull the redirect url
    // will be an empty string
    if (zarinpal.wasSuccessfull(paymentResponse)) {
      const redirectURL = zarinpal.getRedirectURL(paymentResponse);
      res.status(200).send(redirectURL);
    } else {
      const farsiError =  zarinpal.translateError(paymentResponse);
      res.status(400).send(farsiError)
    }
  } catch (e) {
    console.log("Error happend while trying to create a new transaction", e);
    return "";
  }
};
