import { Router } from "express";
import PostRoutes from "./PostsRoutes";

const router = Router()

router.use('/post', PostRoutes)

export default router
