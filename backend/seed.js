import mongoose from 'mongoose';

// Use native MongoDB collections to avoid importing TypeScript model files
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/blogapp';

async function seed() {
  console.log('Connecting to', MONGODB_URL);
  await mongoose.connect(MONGODB_URL, { });

  const db = mongoose.connection.db;

  // Clear existing data (warning: destructive)
  console.log('Clearing existing collections (posts, comments) if they exist...');
  try {
    await db.collection('comments').deleteMany({});
    await db.collection('posts').deleteMany({});
  } catch (e) {
    // ignore
  }

  // Insert a sample post
  const now = new Date();
  const post = {
    title: 'The Paladin’s Burden',
    content: 'To swear an oath is not simply to raise a blade in the name of justice—it is to bind your soul to a cause greater than yourself. A paladin carries the weight of every vow, and every broken promise is a scar that never fades. The world sees shining armor and holy wrath. Few see the sleepless nights, haunted by questions of worthiness.',
    author: 'Sir Alden Graymantle',
    createdAt: now,
    updatedAt: now
  };

  const postResult = await db.collection('posts').insertOne(post);
  console.log('Inserted post id=', postResult.insertedId.toString());

  // Insert sample comments referencing the postId
  const comments = [
    { postId: postResult.insertedId, content: 'Beautifully said. The heaviest chains are often the ones forged by our own honor.', author: 'Mirael the Wanderer', createdAt: now, updatedAt: now },
    { postId: postResult.insertedId, content: 'Bah! I’d rather live free and laugh than bind myself to anyone’s code.', author: 'Jax the Trickster', createdAt: now, updatedAt: now }
  ];

  const commentsResult = await db.collection('comments').insertMany(comments);
  console.log('Inserted comments:', Object.values(commentsResult.insertedIds).map(id => id.toString()));

  console.log('Seeding complete. Closing connection.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
