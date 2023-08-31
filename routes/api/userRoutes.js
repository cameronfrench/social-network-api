const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users - to get all users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId - to get, update, or delete a single user
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

// /api/users/:userId/:friendId - to add or remove a friend
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;