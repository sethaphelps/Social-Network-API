const { Thought, User } = require("../Models");

module.exports = {
  // This loads all the thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  // Grabs a singular thought
  getSingleThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  //   Creates a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((data) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: data._id } },
          { new: true }
        )
          .then((userResults) => {
            if (!userResults) {
              res.status(404).json({
                message: "A thought was created, but there is no user id.",
              });
              return;
            }
            res.json(userResults);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  //   Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res
              .status(404)
              .json({ message: "No thought was found with that id." })
          : res.json(data)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId }).then((data) =>
      !data
        ? res
            .status(404)
            .json({ message: "No thought was found with that id." })
        : res.json({ message: "Your thought was successfully deleted." })
    );
    User.findOneAndUpdate(
      { username: req.params.thoughtId.username },
      { $pull: { thoughts: req.params.thoughtId } }
    ).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Create a Reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res
              .status(404)
              .json({ message: "No thought was found with that id." })
          : res.json(data)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res
              .status(404)
              .json({ message: "No thought was found with that id." })
          : res.json(data)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
