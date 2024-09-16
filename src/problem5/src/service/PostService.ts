import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export class PostService {
  private userRepository = AppDataSource.getRepository(Post);

  async all() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async one(id: number) {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async save(body: any) {
    const { title, content } = body;

    const user = Object.assign(new Post(), {
      title,
      content,
    });

    return this.userRepository.save(user);
  }

  // why not use .delete?
  async remove(id: number) {
    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return null;
    }

    return this.userRepository.remove(userToRemove);
  }

  async search(title: string, content?: string) {
    const userToRemove = await this.userRepository.query('');

    return userToRemove
  }
}
