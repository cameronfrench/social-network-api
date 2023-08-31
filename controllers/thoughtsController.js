const { User, Thought } = require('../models');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId }, 
        { $addToSet: { thoughts: newThought._id }}, 
        { new: true },
      );
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// delete a thought
async deleteThought(req, res) {
  try {
    const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    const user = await User.findOneAndUpdate(
    { username: deleteThought.username },
    { $pull: { thoughts: deleteThought._id }},
    { new: true }
    );

    if (!deleteThought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
// Update a thought
async updateThought(req, res) {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updateThought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(updateThought);
  } catch (err) {
    res.status(500).json(err);
  }
},
// create a reaction stored in a single thought's reactions array field
async addReaction(req, res) {
  try {
    const thoughtReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thoughtReaction) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' })
    }

    res.json(thoughtReaction);
  } catch (err) {
    res.status(500).json(err);
  }
},
// pull and remove a reaction by the reaction's reactionId value
async removeReaction(req, res) {
  try {
    const removeReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!removeReaction) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(removeReaction);
  } catch (err) {
    res.status(500).json(err);
  }
},
};
