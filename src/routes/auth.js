import express from 'express';
import { signup, signin, signout } from '../controllers/auth'


const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup);

module.exports = router;