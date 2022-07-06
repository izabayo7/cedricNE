const { createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/").post(createUser);

  // Create a new User
  router.route("/:id").put([auth,updateUser]).delete([auth,deleteUser]);

  app.use("/api/users", router);
};
