import { Router } from "express";
import UserController from "../controller/UserController.js"
import validateToken from "../../../config/auth/validateToken.js"

const router = new Router();

router.post('/api/user/auth', UserController.getAccessToken);

router.use(validateToken);

router.get('/api/user/email/:email', UserController.findByEmail); // entry parameter ( request parameter )

export default router;