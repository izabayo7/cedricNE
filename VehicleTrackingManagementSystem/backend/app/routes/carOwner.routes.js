const { getAllCarOwners,createCarOwner, updateCarOwner, deleteCarOwner } = require("../controllers/carOwner.controller");
const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/").get([auth,getAllCarOwners]).post([auth,createCarOwner]);

  // Create a new User
  router.route("/:id").put([auth,updateCarOwner]).delete([auth,deleteCarOwner]);

  app.use("/api/carOwners", router);
};
