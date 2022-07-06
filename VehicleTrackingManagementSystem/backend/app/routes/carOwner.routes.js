const {
  getAllCarOwners,
  createCarOwner,
  updateCarOwner,
  deleteCarOwner
} = require("../controllers/carOwner.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/")
    /**
     * @swagger
     * /carOwners:
     *   get:
     *     tags:
     *       - CarOwner
     *     description: Returns all CarOwners
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: page
     *         description: page number
     *         in: query
     *         type: string
     *       - name: limit
     *         description: elements per page
     *         in: query
     *         type: string
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
    .get([auth, getAllCarOwners])
    /**
     * @swagger
     * /carOwners:
     *   post:
     *     tags:
     *       - CarOwner
     *     description: Create a carOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a carOwner
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/CarOwner'
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
    .post([auth, createCarOwner]);

  // Create a new User
  router.route("/:id")
    /**
     * @swagger
     * /carOwners/{id}:
     *   put:
     *     tags:
     *       - CarOwner
     *     description: Create a carOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: carOwner id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a carOwner
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/CarOwner'
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
    .put([auth, updateCarOwner])
    /**
     * @swagger
     * /carOwners/{id}:
     *   delete:
     *     tags:
     *       - CarOwner
     *     description: Delete CarOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: carOwner id
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
    .delete([auth, deleteCarOwner]);

  app.use("/api/carOwners", router);
};