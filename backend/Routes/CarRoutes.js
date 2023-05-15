const express = require("express");
const router = express.Router();

let {  getCarsByDescription,getCarByMake,getAllMakesAndModels,getCarByMakeModelYear, addCar } = require("../Controllers/CarController");



router.get("/getAllMakesAndModels", getAllMakesAndModels);
router.get("/search/:keyword", getCarsByDescription);
router.get("/:make", getCarByMake);
router.get("/:make/:model/:year", getCarByMakeModelYear);

router.post("/addCar", addCar);
module.exports = router;