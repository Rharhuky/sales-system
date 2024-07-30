import { Router } from "express";
import UserController from "../controller/UserController.js"

const router = new Router();

router.get('/api/user/email/:email', UserController.findByEmail); // entry parameter ( request parameter )

export default router