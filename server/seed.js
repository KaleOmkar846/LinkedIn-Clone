import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();

const sampleUsers = [
  { email: 'john.doe@example.com', password: 'password123' },
  { email: 'jane.smith@example.com', password: 'password123' },
  { email: 'mike.johnson@example.com', password: 'password123' },
  { email: 'sarah.williams@example.com', password: 'password123' },
  { email: 'david.brown@example.com', password: 'password123' }
];

const samplePosts = [
  "Just started my new job as a Software Engineer! Excited for this new chapter in my career. 🚀",
  "Thrilled to announce that I've completed my certification in Cloud Computing. Thanks to everyone who supported me!",
  "Looking for talented developers to join our team. We're building something amazing! #Hiring #SoftwareEngineering",
  "Had an incredible experience speaking at the Tech Conference 2025. Thank you to all who attended!",
  "Just published my first article on Medium about best practices in React development. Check it out!",
  "Celebrating 5 years at my company today! Time flies when you're doing what you love. 💼",
  "Anyone else attending the AI Summit next month? Would love to connect!",
  "Just deployed my side project to production. It's been 6 months in the making. Feeling proud! 🎉",
  "Learning is a never-ending journey. Started exploring Machine Learning this week. Excited!",
  "Grateful for my amazing team. We just shipped our biggest feature yet! 🙌",
  "Remote work has taught me so much about productivity and work-life balance.",
  "Sharing my thoughts on the future of web development in my latest blog post. Link in bio!",
  "Networking tip: Always follow up after making a new connection. It makes a difference!",
  "Just hit 10k followers! Thank you all for your support and engagement. 🎊",
  "Coffee, code, repeat. That's been my routine this week. How's everyone else doing?",
  "Excited to announce our company's new product launch next week! Stay tuned for updates.",
  "Remember: Imposter syndrome is real, but so are your accomplishments. Keep pushing forward!",
  "Looking for recommendations on the best project management tools. What do you use?",
  "Just finished reading 'Clean Code' by Robert Martin. Highly recommended for all developers!",
  "Teamwork makes the dream work. Shoutout to my colleagues for an amazing quarter! 💪"
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linkedin-clone');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared');

    // Create users
    console.log('Creating sample users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const user = new User({ email: userData.email });
      await User.register(user, userData.password);
      createdUsers.push(user);
      console.log(`✓ Created user: ${userData.email}`);
    }

    // Create posts with random authors and timestamps
    console.log('\nCreating sample posts...');
    const posts = [];
    
    for (let i = 0; i < samplePosts.length; i++) {
      // Randomly select an author
      const randomAuthor = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      
      // Create posts with varying timestamps (last 30 days)
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
      createdAt.setHours(createdAt.getHours() - hoursAgo);
      createdAt.setMinutes(createdAt.getMinutes() - minutesAgo);
      
      const post = new Post({
        content: samplePosts[i],
        author: randomAuthor._id,
        createdAt: createdAt
      });
      
      await post.save();
      posts.push(post);
      console.log(`✓ Created post ${i + 1}/${samplePosts.length}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`\nSummary:`);
    console.log(`- Created ${createdUsers.length} users`);
    console.log(`- Created ${posts.length} posts`);
    console.log('\nSample Login Credentials:');
    console.log('Email: john.doe@example.com');
    console.log('Password: password123');
    console.log('\n(All users have the same password: password123)');

    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
