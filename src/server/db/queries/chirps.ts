import { Query } from '../';

interface IChirpsT {
	id: number;
	userid: number;
	message: string;
	location: string;
	create_at: Date;
	username: string;
}

const all = () => Query<IChirpsT[]>('SELECT chirps.*, users.username FROM chirps JOIN users ON users.id = chirps.userid ORDER BY chirps.id');

const one = (id: number) => Query<IChirpsT[]>('SELECT chirps.*, users.username FROM chirps JOIN users ON users.id = chirps.userid WHERE chirps.id = ?', [id]);

// const one = (id: number) => Query<IChirpsT[]>('SELECT * FROM chirps WHERE id = ?', [id]);

const insert = (userid: number, message: string) => Query<{ insertId: number }>('INSERT INTO chirps (userid, message) VALUE (?)', [[userid, message]]);

const update = (message: string, id: number) => Query('UPDATE chirps SET message = ? WHERE id = ?', [message, id]);

const destroy = (id: number) => Query<IChirpsT[]>('DELETE FROM chirps WHERE id = ?', [id]);

export default {
	all,
	one,
	insert,
	update,
	destroy
}