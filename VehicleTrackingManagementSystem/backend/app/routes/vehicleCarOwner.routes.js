const { getAllVehicleCarOwners,createVehicleCarOwner, updateVehicleCarOwner, deleteVehicleCarOwner } = require("../controllers/vehicleCarOwner.controller");
const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/").get([auth,getAllVehicleCarOwners]).post([auth,createVehicleCarOwner]);

  // Create a new User
  router.route("/:id").put([auth,updateVehicleCarOwner]).delete([auth,deleteVehicleCarOwner]);

  app.use("/api/vehicleCarOwners", router);
};
