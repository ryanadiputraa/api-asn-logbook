import mongoose from "mongoose";

import { logger } from "./logger";

const mongoHost = Boolean(process.env.LOCAL_DB) ? "localhost" : "mongo";
const localMongoURI = `mongodb://${mongoHost}:27017/laporanasn-db`;
const cloudMongoURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@laporan-asn-shard-00-00.ulnkp.mongodb.net:27017,laporan-asn-shard-00-01.ulnkp.mongodb.net:27017,laporan-asn-shard-00-02.ulnkp.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-uf99ze-shard-0&authSource=admin&retryWrites=true&w=majority`;

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
      .connect(
        process.env.STAGE === "prod" ? cloudMongoURI : localMongoURI,
        this.mongooseOptions
      )
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
