const {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicle.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /vehicles:
     *   get:
     *     tags:
     *       - Vehicle
     *     description: Returns all Vehicles
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
    .get([auth, getAllVehicles])
    /**
     * @swagger
     * /vehicles:
     *   post:
     *     tags:
     *       - Vehicle
     *     description: Create a vehicle
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a vehicle
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Vehicle'
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
    .post([auth, createVehicle]);

  router.route("/:id")
    /**
     * @swagger
     * /vehicles/{id}:
     *   put:
     *     tags:
     *       - Vehicle
     *     description: Create a vehicle
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: vehicle id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a vehicle
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Vehicle'
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
    .put([auth, updateVehicle])
    /**
     * @swagger
     * /vehicles/{id}:
     *   delete:
     *     tags:
     *       - Vehicle
     *     description: Delete Vehicle
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: vehicle id
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
    .delete([auth, deleteVehicle]);

  app.use("/api/vehicles", router);
};