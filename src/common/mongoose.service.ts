import mongoose from "mongoose";

import { logger } from "./logger";

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
    useFindModify: false,
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
      .connect("mongodb://localhost:27017/laporanasn-db", this.mongooseOptions)
      .then(() => {
        logger.info("MongoDB connected");
      })
      .catch((error) => {
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
