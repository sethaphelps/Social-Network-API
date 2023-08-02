const { Thought, User } = require("../Models");

module.exports = {
  // This loads all the users
  getAllUsers(req, res) {
    User.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  // Grabs a singular user by its id
  getSingleUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },
  //   Creates a user
  createNewUser({ body }, res) {
    User.create(body)
      .then((userResults) => {
        res.json(userResults);
      })
      .catch((err) => res.status(400).json(err));
  },

  //   Update user by id
  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res.status(404).json({ message: "No user was found with that id." })
          : res.json(data)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user
  deleteUserById(req, res) {
    let un;

    User.findOneAndRemove({ _id: req.params.userId }).then((data) => {
      // assign un the username of the just-deleted user?
      un = data.username;

      !data
        ? res.status(404).json({ message: "No user was found with that id." })
        : res.json({ message: "Your user was successfully deleted." });
    });

    Thought.deleteMany({ username: un }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
};
