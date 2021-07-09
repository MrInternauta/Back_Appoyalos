import {Router} from 'express';
import { VerifyToken }  from '../middlewares/Autenticacion';
import { Home, Hello, Bye, loginNormal }  from '../controllers/Login'
const router: Router = Router();

router.get('/', Home);
router.get('/hello', VerifyToken, Hello);
router.get('/bye', VerifyToken, Bye);
router.post('/login', loginNormal);

export default router;





