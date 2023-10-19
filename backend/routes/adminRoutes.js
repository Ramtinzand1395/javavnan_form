const { Router } = require("express");

const adminController = require("../controller/adminController");
const { auththeIp } = require("../middlewares/auth");

const router = new Router();

//create user
router.post("/register-user", adminController.createUser);

//create dinner
router.post("/dinner", adminController.createDinner);

//get user
router.post("/get-user", adminController.GetUser);

//get user and dinner
router.post("/get-info", adminController.GetInfo);

//create QrCode
router.post("/create-QRcode", adminController.CreateQrCode);

//create QrCode
router.post("/is-arriwed", auththeIp, adminController.arriwed);

//create QrCode
router.post("/deliver-dinner", auththeIp, adminController.deliverDinner);


//create QrCode
router.get("/get-users",auththeIp, adminController.GetAllUser);

//create QrCode
router.delete("/delete-user/:userId",auththeIp, adminController.DeleteUser);
module.exports = router;
