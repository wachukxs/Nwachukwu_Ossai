import { Router } from "express";
import { PostController } from "../controller/PostController";
import {
  addPostBodyValidation,
  postIdParamValidation,
  searchQueryValidation,
} from "../middlewares";

const router = Router();
const postController = new PostController();

router.get("/all", postController.all);
router.get("/search", searchQueryValidation, postController.search);

router.get("/:id", postIdParamValidation, postController.one);

router.post("/", addPostBodyValidation, postController.save);

router.delete("/:id", postIdParamValidation, postController.remove);
// router.route('/:id').get(postIdParamValidation, postController.remove)

export default router;
