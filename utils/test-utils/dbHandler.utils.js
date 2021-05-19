const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

exports.dbConnect = async () => {
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
  await mongoose.set('useNewUrlParser', true);
  await mongoose.set('useFindAndModify', false);
  await mongoose.set('useCreateIndex', true);
  await mongoose.set('useUnifiedTopology', true);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
};
