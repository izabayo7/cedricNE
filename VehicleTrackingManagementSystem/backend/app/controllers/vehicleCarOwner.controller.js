const {
    CarOwner
} = require("../models/carOwner.model");
const {
    Vehicle
} = require("../models/vehicle.model");
const {
    validateVehicleCarOwner,
    VehicleCarOwner
} = require("../models/vehicleOwner.model");
const {
    validateObjectId
} = require("../utils/imports");

const { isValid } = require("rwandan-plate-number");

/***
 * Get all vehicleCarOwners
 * @param req
 * @param res
 */
exports.getAllVehicleCarOwners = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit,
            populate: ['vehicle', 'carOwner']
        };

        const data = await VehicleCarOwner.paginate({}, options)

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
exports.createVehicleCarOwner = async (req, res) => {
    try {
        const {
            error
        } = validateVehicleCarOwner(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!isValid(req.body.vehiclePlateNumber))
            return res.status(400).send({
                message: 'Invalid Plate Number'
            });

        if (!validateObjectId(req.body.vehicle))
            return res.status(400).send({
                message: 'Invalid vehicle id'
            });

        if (!validateObjectId(req.body.carOwner))
            return res.status(400).send({
                message: 'Invalid carOwner id'
            });

        const vehicle = await Vehicle.findById(req.body.vehicle);

        if (!vehicle)
            return res.status(404).send({
                message: 'Vehicle Not found'
            });

        const carOwner = await CarOwner.findById(req.body.carOwner);

        if (!carOwner)
            return res.status(404).send({
                message: 'CarOwner Not found'
            });

        const isDupplicate = await VehicleCarOwner.findOne({
            vehiclePlateNumber: req.body.vehiclePlateNumber
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'VehiclePlateNumber is already used'
            });

        const newVehicleCarOwner = new VehicleCarOwner(req.body);

        const result = await newVehicleCarOwner.save();

        return res.status(201).send({
            message: 'CREATED',
            data: {...result._doc,carOwner,vehicle}
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
exports.updateVehicleCarOwner = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateVehicleCarOwner(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!isValid(req.body.vehiclePlateNumber))
            return res.status(400).send({
                message: 'Invalid Plate Number'
            });

        if (!validateObjectId(req.body.vehicle))
            return res.status(400).send({
                message: 'Invalid vehicle id'
            });

        if (!validateObjectId(req.body.carOwner))
            return res.status(400).send({
                message: 'Invalid carOwner id'
            });

        const vehicle = await Vehicle.findById(req.body.vehicle);

        if (!vehicle)
            return res.status(404).send({
                message: 'Vehicle Not found'
            });

        const carOwner = await CarOwner.findById(req.body.carOwner);

        if (!carOwner)
            return res.status(404).send({
                message: 'CarOwner Not found'
            });

        const isDupplicate = await VehicleCarOwner.findOne({
            _id: {
                $ne: req.params.id
            },
            vehiclePlateNumber: req.body.vehiclePlateNumber
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'VehiclePlateNumber is already used'
            });

        const result = await VehicleCarOwner.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });
        if (!result)
            return res.status(404).send({
                message: 'VehicleCarOwner Not found'
            });

        return res.status(200).send({
            message: 'UPDATED',
            data: {...result,carOwner,vehicle}
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
exports.deleteVehicleCarOwner = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await VehicleCarOwner.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'vehicleCarOwner not found'
            });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}