import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';


/* 
  *.test.ts = unit test
  *.ispec.ts = integration test
*/ 


let mongo: MongoMemoryServer;

  // eslint-disable-next-line
  // @ts-ignore
const isIntegrationTest = testTypeCheck(jasmine.testPath);

const MONGO_OPTS = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

// set global variables here
if (isIntegrationTest) {
  /* 
    cannot set global variables from within functions (beforeAll) 
    therefor it cannot create apollo server after init mongoDB.
    if order is a priority, init in test file
  */
  require('./apollo-server-setup'); // apollo GQL server
}


beforeAll(async function () {

  if (isIntegrationTest) {
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, MONGO_OPTS);
  }
});

beforeEach(async () => {
  jest.clearAllMocks();
  if (isIntegrationTest){
    await mongoose.connection.db.dropDatabase();
  }
  
});

afterAll(async() => {
  // eslint-disable-next-line
  // @ts-ignore
  if (isIntegrationTest) {
    await mongoose.disconnect();
    await mongo.stop();
  }
})

function testTypeCheck(text: string): boolean {
  const regex = new RegExp(/(?:\.ispec\.ts)/);
  return regex.test(text);
}