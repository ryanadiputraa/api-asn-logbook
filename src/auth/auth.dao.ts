import { IRegisterDTO } from "./auth.dto";
import { logger } from "../common/logger";

class AuthDao {
  users: Array<IRegisterDTO> = [];

  async register(user: IRegisterDTO) {
    try {
      this.users.push(user);
    } catch (error) {
      logger.error(`auth dao: ${error}`);
      throw new Error(
        error instanceof Error ? error.message : "fail to register"
      );
    }
  }
}

export default new AuthDao();
