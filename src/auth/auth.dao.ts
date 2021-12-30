import { IRegisterDTO } from "./auth.dto";

class AuthDao {
  users: Array<IRegisterDTO> = [];

  async register(user: IRegisterDTO) {
    this.users.push(user);
  }
}

export default new AuthDao();
