import { Router } from 'express';
import { getAllProducts } from '../controllers/Products.controller.js';
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router.route("/:videoId").get(getVideoComments).post(addComment);
// router.route("/c/:commentId").delete(deleteComment).patch(updateComment);
router.get('/',getAllProducts)

export default router