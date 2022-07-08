const {
    validateCandidate,
    Candidate
} = require("../models/candidate.model");
const { Votes } = require("../models/votes.model");
const { validateObjectId } = require("../utils/imports");

/***
 * Get all candidates
 * @param req
 * @param res
 */
exports.getAllCandidates = async (req, res) => {
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

        let data = await Candidate.paginate({}, options)
        data = JSON.parse(JSON.stringify(data));
        for (const el of data.docs) {
            let count = await Votes.countDocuments({candidate: el._id});
            el.total_votes = count;
        }

        res.send({
            data
        });

    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new candidate
 * @param req
 * @param res
 */
exports.createCandidate = async (req, res) => {
    try {
        const {
            error
        } = validateCandidate(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId,
        } = req.body

        let candidate = await Candidate.findOne({
            nationalId
        })

        if (candidate) {
            return res.status(400).send({
                message: `Candidate with same nationalId already exist`
            });
        }

        const newCandidate = new Candidate(req.body);

        const result = await newCandidate.save();

        return res.status(201).send({
            message: 'CREATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new candidate
 * @param req
 * @param res
 */
exports.updateCandidate = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateCandidate(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId
        } = req.body

        let candidate = await Candidate.findOne({
            _id: {
                $ne: req.params.id
            },
            nationalId
        })

        if (candidate) {
            return res.status(400).send({
                message: `Candidate with same nationalId already exist`
            });
        }

        const result = await Candidate.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        if (!result)
            return res.status(404).send({
                message: 'Candidate Not found'
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
 *  delete's a candidate
 * @param req
 * @param res
 */
exports.deleteCandidate = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await Candidate.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'Candidate not found'
            });

        await Votes.deleteMany({
            candidate: req.params.id
        });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}