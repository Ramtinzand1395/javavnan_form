const { Router } = require("express");

const adminController = require("../controller/adminController");

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
module.exports = router;
