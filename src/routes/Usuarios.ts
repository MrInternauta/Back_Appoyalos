import { Router } from 'express';
import { VerifyToken } from '../middlewares/Autenticacion';
import { getAll, getOne, create, remove, update } from '../controllers/Usuario';
const router: Router = Router();

router.get('/usuarios', getAll);
router.post('/usuarios', create);
router.get('/usuario', VerifyToken, getOne);
router.get('/usuario/:id', VerifyToken, getOne);
router.get('/usuario/:id', VerifyToken, getOne);
router.delete('/usuario/:id', VerifyToken, remove);
router.put('/usuario/:id', VerifyToken, update);
router.put('/usuario/', VerifyToken, update);

export default router;
