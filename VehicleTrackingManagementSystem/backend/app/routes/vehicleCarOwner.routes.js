const {
  getAllVehicleCarOwners,
  createVehicleCarOwner,
  updateVehicleCarOwner,
  deleteVehicleCarOwner
} = require("../controllers/vehicleCarOwner.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/")
    /**
     * @swagger
     * /vehicleCarOwners:
     *   get:
     *     tags:
     *       - VehicleCarOwner
     *     description: Returns all VehicleCarOwners
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
    .get([auth, getAllVehicleCarOwners])
    /**
     * @swagger
     * /vehicleCarOwners:
     *   post:
     *     tags:
     *       - VehicleCarOwner
     *     description: Create a vehicleCarOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a vehicleCarOwner
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/VehicleCarOwner'
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
    .post([auth, createVehicleCarOwner]);

  // Create a new User
  router.route("/:id")
    /**
     * @swagger
     * /vehicleCarOwners/{id}:
     *   put:
     *     tags:
     *       - VehicleCarOwner
     *     description: Create a ehicleCarOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: vehicleCarOwner id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a vehicleCarOwner
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/VehicleCarOwner'
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
    .put([auth, updateVehicleCarOwner])
    /**
     * @swagger
     * /vehicleCarOwners/{id}:
     *   delete:
     *     tags:
     *       - VehicleCarOwner
     *     description: Delete vehicleCarOwner
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: vehicleCarOwner id
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
    .delete([auth, deleteVehicleCarOwner]);

  app.use("/api/vehicleCarOwners", router);
};