import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js';
import { loginUser } from '../controllers/user.controller.js';
import { logoutUser } from '../controllers/user.controller.js';
const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);


export default router;

