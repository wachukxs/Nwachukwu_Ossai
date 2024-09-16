import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export class PostService {
  private postRepository = AppDataSource.getRepository(Post);

  async all() {
    try {
      return this.postRepository.find();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async one(id: number) {
    try {
      return this.postRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async save(body: any) {
    const { title, content } = body;

    const user = Object.assign(new Post(), {
      title,
      content,
    });

    return this.postRepository.save(user);
  }

  async remove(id: number) {
    const userToRemove = await this.postRepository.findOneBy({ id });

    if (!userToRemove) {
      return null;
    }

    return this.postRepository.remove(userToRemove);
  }

  async search(title?: string, content?: string) {
    try {
      let filters: any = {}
      if (title) {
        filters.title = ILike(`%${title}%`)
      }
      if (content) {
        filters.content = ILike(`%${content}%`)
      }

      return this.postRepository.find({
        where: filters,
      });
    } catch (error) {
      return null;
    }
  }
}
