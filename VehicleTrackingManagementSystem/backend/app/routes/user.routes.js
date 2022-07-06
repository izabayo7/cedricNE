const {
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - User
     *     description: Create a user
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post(createUser);

  router.route("/:id")
    /**
     * @swagger
     * /users:
     *   put:
     *     tags:
     *       - User
     *     description: Update a user
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: user id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put([auth, updateUser])
    /**
     * @swagger
     * /users:
     *   delete:
     *     tags:
     *       - User
     *     description: Delete User
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: user id
     *         in: path
     *         type: string
     *         required: true
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete([auth, deleteUser]);

  app.use("/api/users", router);
};