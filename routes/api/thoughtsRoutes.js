const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought, 
  addThought,
  removeThought,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughttId/reactions').post(addThought);

// /api/thoughts/:thoughtId/reactions/:reactionid
router.route('/:thoughtId/reactions/:reactionid').delete(removeThought);

module.exports = router;