import usersDao from "./users.dao";

class UserService {
  async getUserProfile(id: string) {
    try {
      return await usersDao.getUserProfile(id);
    } catch (error) {
      throw new Error(
        `users service: ${
          error instanceof Error
            ? error.message
            : "fail to retrieve user information"
        }`
      );
    }
  }
}

export default new UserService();
