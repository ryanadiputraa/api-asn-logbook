import { IRegisterDTO } from "./auth.dto";

import { logger } from "../common/logger";
import mongooseService from "../common/services/mongoose.service";

class AuthDao {
  Schema = mongooseService.getMongoose().Schema;
  userSchema = new this.Schema(
    {
      _id: String,
      fullname: String,
      nip: String,
      position: String,
      supervisor: String,
      supervisorPosition: String,
      city: String,
      password: { type: String, select: false },
    },
    { id: false }
  );

  User = mongooseService.getMongoose().model("Users", this.userSchema);

  async register(userField: IRegisterDTO) {
    try {
      const user = new this.User(userField);
      await user.save();
    } catch (error) {
      logger.error(`auth dao: ${error}`);
      throw new Error(
        error instanceof Error ? error.message : "fail to register"
      );
    }
  }
}

export default new AuthDao();
