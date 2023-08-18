const router = require("express").Router();

const {
  getAllUsers,
  getSingleUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Gets all users and posts new user
router.route("/").get(getAllUsers).post(createNewUser);

// Gets single user by id, deletes user, and updates user by id
router
  .route("/:userId")
  .get(getSingleUserById)
  .delete(deleteUserById)
  .put(updateUserById);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)
  
module.exports = router;
