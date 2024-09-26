import express from 'express'
const router = express.Router();
import MyUserController from '../controlller/MyUserContoller'
import { jwtCheck, jwtParse } from '../middleware/auth0';
import { validateMyUserRequest } from '../middleware/validation';

router.post('/' , jwtCheck,  MyUserController.createCurrentUser);

router.put('/' ,jwtCheck,jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser );
router.get('/' ,jwtCheck,jwtParse, MyUserController.getCurrentUser );

export default router;
