import { Query } from '../';

interface IUsersT {
    id?: number;
    username?: string;
    email?: string;
    created_at?: Date;
}

const all = <T = any>(columns: string[] = ['*']) => Query<T>('SELECT ?? FROM users', [columns]);

const insert = (values: any) => Query<{ insertID: number }>('INSERT INTO users (username, email, created_at) VALUES ?', [values]);

export default {
  all,
  insert
};