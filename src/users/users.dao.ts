import { IRegisterDTO } from "../auth/auth.dto";
import mongooseService from "../common/mongoose.service";

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;
  userSchema = new this.Schema(
    {
      _id: String,
      fullname: String,
      nip: String,
      position: String,
      supervisor: String,
      supervisor_position: String,
      city: String,
      password: { type: String, select: false },
    },
    { id: false }
  );

  User = mongooseService.getMongoose().model("Users", this.userSchema);

  async register(payload: IRegisterDTO) {
    try {
      const user = new this.User(payload);
      await user.save();
    } catch (error) {
      throw new Error(
        `auth dao: ${
          error instanceof Error ? error.message : "fail to register"
        }`
      );
    }
  }

  async getUserLoginInfo(nip: string) {
    try {
      return this.User.findOne({ nip: nip }).select("_id nip +password").exec();
    } catch (error) {
      throw new Error(
        `auth dao: ${
          error instanceof Error
            ? error.message
            : "fail to retrieve user information"
        }`
      );
    }
  }

  async getUserProfile(id: string) {
    try {
      return this.User.findOne({ _id: id }).exec();
    } catch (error) {
      throw new Error(
        `users dao: ${
          error instanceof Error
            ? error.message
            : "fail to retrieve user information"
        }`
      );
    }
  }
}

export default new UsersDao();
