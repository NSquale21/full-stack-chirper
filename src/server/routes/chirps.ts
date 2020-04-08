import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const chirps = await db.chirps.all();
		res.json(chirps);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh.'});
	}
});

router.get('/:chirpid', async (req, res) => {
	const chirpid = Number(req.params.chirpid);
	try {
		const [chirp] = await db.chirps.one(chirpid);
		res.json(chirp);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh.'});
	}
});

router.post('/', async (req, res) => {
	const chirp = req.body;
	try {
		const { insertId } = await db.chirps.insert(chirp.userid, chirp.message);
		res.status(201).json({ insertId, msg: 'Chirp Inserted!'});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh.'});
	}
});

router.put('/:chirpid', async (req, res) => {
	const chirp = req.body;
	const chirpid = Number(req.params.chirpid);
	try {
		const result = await db.chirps.update(chirp.message, chirpid);
		res.json({ msg: `Chirp $"{chirpid} Updated`, result});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh.'});
	}
});

router.delete('/:chirpid', async (req, res) => {
	const chirpid = Number(req.params.chirpid);
	try {
		const result = await db.chirps.destroy(chirpid);
		res.json({ msg: `Chirp ${chirpid} Deleted!`, result});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Uh oh.'});
	}
});

export default router;