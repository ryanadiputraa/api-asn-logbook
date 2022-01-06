import { IRegisterDTO } from "./auth.dto";

import mongooseService from "../common/mongoose.service";

class AuthDao {
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
}

export default new AuthDao();
