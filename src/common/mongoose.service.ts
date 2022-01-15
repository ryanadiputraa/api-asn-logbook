import mongoose from "mongoose";

import { logger } from "./logger";

const dbConnection = String(process.env.DB_CONNECTION);
class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry() {
    logger.info("Attempting MongoDB connection (will retry if needed)");
    mongoose
      .connect(dbConnection, this.mongooseOptions)
      .then(() => {
        logger.info("MongoDB connected");
      })
      .catch((error) => {
        console.log(error);

        const retrySeconds = 5;
        logger.error(
          `Fail to connect to MongoDB (will retry ${++this
            .count} after ${retrySeconds} seconds): ${error}`
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService();
