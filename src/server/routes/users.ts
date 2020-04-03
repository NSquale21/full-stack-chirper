import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const users = await db.users.all<{ id: number; username: string;}[]>(['id', 'username']);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: 'Uh oh.'});
	}
});

export default router;