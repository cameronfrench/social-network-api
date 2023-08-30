const User = require('../models/User');

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .select('-__v');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('username')
        .populate('thoughts')
        .populate('friends');
        

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const createUser = await User.create(req.body);
      res.json(createUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

async deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
// Update a user
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},
};
