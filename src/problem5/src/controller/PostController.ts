import { Request, Response } from "express";
import { PostService } from "../service/PostService";

export class PostController {
  private postService = new PostService();

  GENERIC_ERROR_MESSAGE = "Oops, an error occurred";

  all = async (request: Request, response: Response) => {
    try {
      const posts = await this.postService.all();
      response.json({ posts });
    } catch (error) {
      response.status(500).json({ message: this.GENERIC_ERROR_MESSAGE });
    }
  };

  one = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);

      const post = await this.postService.one(id);

      response.json({ post });
    } catch (error) {
      response.status(500).json({ message: this.GENERIC_ERROR_MESSAGE });
    }
  };

  save = async (request: Request, response: Response) => {
    try {
      const post = await this.postService.save(request.body);
      response.status(201).json({ post });
    } catch (error) {
      response.status(500).json({ message: this.GENERIC_ERROR_MESSAGE });
    }
  };

  remove = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);

      const postToRemove = await this.postService.remove(id);

      if (!postToRemove) {
        return response.status(410).json({ message: "Post does not exist" });
      }

      return response.json({ message: "Post deleted" });
    } catch (error) {
      response.status(500).json({ message: this.GENERIC_ERROR_MESSAGE });
    }
  };

  search = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);

      const postToRemove = await this.postService.remove(id);

      if (!postToRemove) {
        return response.status(410).json({ message: "Post does not exist" });
      }

      return response.json({ message: "Post deleted" });
    } catch (error) {
      response.status(500).json({ message: this.GENERIC_ERROR_MESSAGE });
    }
  };
}
