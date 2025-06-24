const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// Setup in-memory MongoDB for tests
const setupTestDB = async () => {
  // If already connected, just return the connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  
  // If already connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve) => {
      mongoose.connection.once('connected', () => resolve(mongoose.connection));
    });
  }
  
  // Close any existing connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
  
  return mongoose.connection;
};

// Cleanup database after tests
const teardownTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
};

// Clear all collections between tests
const clearDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    return; // Not connected
  }
  
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
  setupTestDB,
  teardownTestDB,
  clearDatabase
}; 