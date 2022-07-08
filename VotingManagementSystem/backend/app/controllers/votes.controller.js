const {
    Candidate
} = require("../models/candidate.model");
const {
    User
} = require("../models/user.model");
const {
    validateVotes,
    Votes
} = require("../models/votes.model");
const {
    validateObjectId
} = require("../utils/imports");

/***
 * Get all userCandidates
 * @param req
 * @param res
 */
exports.getAllVotes = async (req, res) => {
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
            populate: ['user', 'candidate']
        };

        const data = await Votes.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new vote
 * @param req
 * @param res
 */
exports.createVotes = async (req, res) => {
    try {
        console.log(req.body)
        const {
            error
        } = validateVotes(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!validateObjectId(req.body.user))
            return res.status(400).send({
                message: 'Invalid user'
            });

        if (!validateObjectId(req.body.candidate))
            return res.status(400).send({
                message: 'Invalid candidate'
            });

        const user = await User.findById(req.body.user);

        if (!user)
            return res.status(404).send({
                message: 'User Not found'
            });

        const candidate = await Candidate.findById(req.body.candidate);

        if (!candidate)
            return res.status(404).send({
                message: 'Candidate Not found'
            });

        const isDuplicate = await Votes.findOne({
            user: req.body.user
        });

        if (isDuplicate)
            return res.status(404).send({
                message: 'You can\'t vote twice'
            });

        const newVote = new Votes(req.body);

        const result = await newVote.save();

        return res.status(201).send({
            message: 'CREATED',
            data: {...result._doc,candidate,user}
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}