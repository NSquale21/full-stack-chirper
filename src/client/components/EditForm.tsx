import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';

const EditForm: React.FC<IEditFormProps> = () => {

	const { chirpid } = useParams();
	const history = useHistory();

  const [username, setUsername] = useState<string>('')
  const [message, setMessage] = useState<string>('');
    
	const handleUsernameChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUsername(e.target.value);
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
    
	const handleEdit =  async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let res = await fetch(`/api/chirps/${chirpid}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, message })
		});
		if (res.ok) {
			history.push(`/chirps/details/${chirpid}`);
		} else {
			console.log('Uh Oh!');
		}
	}

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let res = await fetch(`/api/chirps/${chirpid}`, {
			method: 'DELETE',
		});
		if (res.ok) {
			history.push('/');
		} else {
			console.log('Uh Oh!');
		}
	}

	useEffect(() => {
		(async () => {
			let res = await fetch(`/api/chirps/${chirpid}`);
			let chirp = await res.json();
			setUsername(chirp.username);
			setMessage(chirp.message);
		})();
	}, [chirpid]);

	return(
		<Col md={8}>
			<Form className="p-3 my-3 shadow-sm">
				<Form.Group controlId="formSelectUser">
					<Form.Label>Chirp As:</Form.Label>
					<Form.Control 
						type="text"
						value={username} 
						onChange={handleUsernameChange} 
						className="shadow-sm">
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="formTextArea">
					<Form.Label>Edit Chirp:</Form.Label>
					<Form.Control 
						as="textarea"
						value={message}
						onChange={handleMessageChange} 
						rows="3" 
						className="shadow-sm"
						placeholder="Enter Chirp Here..."
					/>
  			</Form.Group>
				<div className="d-flex justify-content-around">
					<Button onClick={handleEdit} variant="outline-primary" className="w-25 shadow-sm">Save It!</Button>
					<Button onClick={handleDelete} variant="outline-danger" className="w-25 shadow-sm">Delete It!</Button>
				</div>
			</Form>
		</Col>
	);
};

interface IEditFormProps {}

export default EditForm;