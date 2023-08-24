const connection = require('../config/connection');
const { Thought, User } = require('../models');
// const {
// getRandomName,
// getRandomComments,
// getRandomPost,
// genRandomIndex,
// } = require('./data');

// Start the seeding runtime timer

console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

   // Empty arrays for randomly generated posts and comments
   const thoughts = [...getRandomThought(3)];
   const users = [];

   // Makes thoughts array
  const makeUser = (text) => {
    posts.push({
      text,
      username: getRandomName().split(' ')[0],
      thoughts: [thoughts[genRandomIndex(thoughts)]._id],
    });
  };

  // Wait for the thought to be inserted into the database
  await Thought.collection.insertMany(thoughts);

   // For each of the users that exist, get a random thought 
   comments.forEach(() => makeUser(getRandomThought));

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);

  // Log out a pretty table for comments and posts
  console.table(thoughts);
  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
