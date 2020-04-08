import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const ChirpForm: React.FC<IChirpFormProps> = props => {

	const [selectedId, setSelectedId] = useState<string>('0');
	const [users, setUsers] = useState<{ id: number; username: string; }[]>([])
	const [message, setMessage] = useState<string>('');

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value);
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

	const handleSubmit =  async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (selectedId === '0') {
			console.log('Gotta select something');
		} else {
			console.log(selectedId);
			let res = await fetch('/api/chirps', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userid: selectedId, message })
			})
			if (res.ok) {
				console.log(res.ok);
				props.getEm();
			} else {
				console.log('Uh Oh!');
			}
			setSelectedId('0');
			setMessage('');
		}
	}

	useEffect(() => {
		(async () => {
			const res = await fetch('/api/users');
			const users = await res.json();
			setUsers(users);
		})();
	}, []);
	
	return(
		<Col md={8}>
			<Form className="p-3 my-3 shadow-sm">
				<Form.Group controlId="formSelectUser">
					<Form.Label>Chirp As:</Form.Label>
					<Form.Control 
						as="select" 
						value={selectedId} 
						onChange={handleSelectChange} 
						className="shadow-sm">
						<option value="0" disabled>Select User</option>
						{users.map(user => <option key={`${user.id}-${user.username}`} value={user.id}>{user.username}</option> )}
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="formTextArea">
					<Form.Label>What's on your mind?</Form.Label>
					<Form.Control 
						as="textarea"
						value={message}
						onChange={handleMessageChange} 
						rows="3" 
						className="shadow-sm"
						placeholder="Enter Chirp Here..."
					/>
  			</Form.Group>
				<Button onClick={handleSubmit} variant="outline-primary" className="w-75 mx-auto shadow-sm" block>Chirp It!</Button>
			</Form>
		</Col>
	);
};

interface IChirpFormProps {
	getEm: () => void;
}

export default ChirpForm;