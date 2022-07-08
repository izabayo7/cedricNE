const {
  getAllVotes,
  createVotes
} = require("../controllers/votes.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /votes:
     *   get:
     *     tags:
     *       - Votes
     *     description: Returns all Votes
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
    .get([auth, getAllVotes])
    /**
     * @swagger
     * /votes:
     *   post:
     *     tags:
     *       - Votes
     *     description: Create a votes
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a votes
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Votes'
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
    .post([auth, createVotes]);

  app.use("/api/votes", router);
};