const {
    validateCarOwner,
    CarOwner
} = require("../models/carOwner.model");
const { VehicleCarOwner } = require("../models/vehicleOwner.model");
const { validateObjectId } = require("../utils/imports");

/***
 * Get all carOwners
 * @param req
 * @param res
 */
exports.getAllCarOwners = async (req, res) => {
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

        const data = await CarOwner.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new carOwner
 * @param req
 * @param res
 */
exports.createCarOwner = async (req, res) => {
    try {
        const {
            error
        } = validateCarOwner(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId,
            phone
        } = req.body

        let carOwner = await CarOwner.findOne({
            $or: [{
                nationalId
            }, {
                phone
            }],
        })

        if (carOwner) {
            const phoneFound = phone == carOwner.phone
            return res.status(400).send({
                message: `CarOwner with same ${phoneFound ? 'phone ' : 'nationalId '} arleady exist`
            });
        }

        const newCarOwner = new CarOwner(req.body);

        const result = await newCarOwner.save();

        return res.status(201).send({
            message: 'CREATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new carOwner
 * @param req
 * @param res
 */
exports.updateCarOwner = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateCarOwner(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId,
            phone
        } = req.body

        let dupplicate_carOwner = await CarOwner.findOne({
            _id: {
                $ne: req.params.id
            },
            $or: [{
                nationalId: nationalId
            }, {
                phone: phone
            }],
        })

        if (dupplicate_carOwner) {
            const phoneFound = phone == dupplicate_carOwner.phone
            return res.status(400).send({
                message: `CarOwner with same ${phoneFound ? 'phone ' : 'nationalId '} arleady exist`
            });
        }

        const result = await CarOwner.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        if (!result)
            return res.status(404).send({
                message: 'CarOwner Not found'
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
 *  updates's a new carOwner
 * @param req
 * @param res
 */
exports.deleteCarOwner = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await CarOwner.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'CarOwner not found'
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