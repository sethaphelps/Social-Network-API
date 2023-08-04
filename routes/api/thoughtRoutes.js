const router = require("express").Router();

const {
  getThoughts,
  getSingleThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/students
router.route("/").get(getThoughts).post(createThought);

// /api/students/:studentId
router
  .route("/:thoughtId")
  .get(getSingleThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/students/:studentId/assignments
router.route("/:thoughtId/reactions").post(createReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
