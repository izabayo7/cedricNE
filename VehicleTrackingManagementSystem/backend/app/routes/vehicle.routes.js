const { getAllVehicles,createVehicle, updateVehicle, deleteVehicle } = require("../controllers/vehicle.controller");
const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/").get([auth,getAllVehicles]).post([auth,createVehicle]);

  // Create a new User
  router.route("/:id").put([auth,updateVehicle]).delete([auth,deleteVehicle]);

  app.use("/api/vehicles", router);
};
