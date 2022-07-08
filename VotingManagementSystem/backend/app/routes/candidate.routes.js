const {
  getAllCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
} = require("../controllers/candidate.controller");
const { admin } = require("../middlewares/admin.middleware");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /candidates:
     *   get:
     *     tags:
     *       - Candidate
     *     description: Returns all Candidates
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
    .get([auth, getAllCandidates])
    /**
     * @swagger
     * /candidates:
     *   post:
     *     tags:
     *       - Candidate
     *     description: Create a candidate
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a candidate
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Candidate'
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
    .post([auth,admin, createCandidate]);

  router.route("/:id")
    /**
     * @swagger
     * /candidates/{id}:
     *   put:
     *     tags:
     *       - Candidate
     *     description: Create a candidate
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: candidate id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a candidate
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Candidate'
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
    .put([auth,admin, updateCandidate])
    /**
     * @swagger
     * /candidates/{id}:
     *   delete:
     *     tags:
     *       - Candidate
     *     description: Delete Candidate
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: candidate id
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
    .delete([auth,admin, deleteCandidate]);

  app.use("/api/candidates", router);
};