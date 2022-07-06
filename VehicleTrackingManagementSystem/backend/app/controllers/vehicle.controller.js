const {
    validateVehicle,
    Vehicle
} = require("../models/vehicle.model");
const {
    VehicleCarOwner
} = require("../models/vehicleOwner.model");
const {
    validateObjectId
} = require("../utils/imports");

/***
 * Get all vehicles
 * @param req
 * @param res
 */
exports.getAllVehicles = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit
        };

        const data = await Vehicle.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new vehicle
 * @param req
 * @param res
 */
exports.createVehicle = async (req, res) => {
    try {
        const {
            error
        } = validateVehicle(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        const dupplicate = await Vehicle.findOne(req.body);
        if (dupplicate) return res.status(400).send({
            message: 'Vehicle already exists'
        });

        const newVehicle = new Vehicle(req.body);

        const result = await newVehicle.save();

        return res.status(201).send({
            message: 'CREATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new vehicle
 * @param req
 * @param res
 */
exports.updateVehicle = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateVehicle(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        const result = await Vehicle.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        if (!result)
            return res.status(404).send({
                message: 'Vehicle Not found'
            });

        return res.status(200).send({
            message: 'UPDATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new vehicle
 * @param req
 * @param res
 */
exports.deleteVehicle = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await Vehicle.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'Vehicle not found'
            });

        await VehicleCarOwner.deleteMany({
            vehicle: req.params.id
        });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}