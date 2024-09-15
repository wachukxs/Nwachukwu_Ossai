import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export class PostService {
  private userRepository = AppDataSource.getRepository(Post);

  async all() {
    return this.userRepository.find();
  }

  async one(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
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
