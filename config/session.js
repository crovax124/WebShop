const mongodbStore = require('connect-mongodb-session');                                        // this is the session handling with "express-session" and "connect-mongodb-session" npm packages. in App.js you gotta use them.

function createSessionStore(session) {                                                                 //session store location
    const MongoDBStore = mongodbStore(session);
    const sessionStore = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'vjloop-shop',
    collection: 'sessions'
  });
return sessionStore;
};

function createSessionConfig(sessionStore) {
 return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000                                                                   //max age of cookies
        }
      };
}

  module.exports = {
      createSessionStore: createSessionStore,
      createSessionConfig: createSessionConfig,
  }