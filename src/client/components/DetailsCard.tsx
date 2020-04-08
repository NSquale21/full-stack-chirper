import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IChirp } from '../utils/interfaces';
import { Col, Card, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';

const DetailsCard: React.FC<IDetailsCardProps> = props => {
	
	const history = useHistory();

	return (
		<Col md={7}>
			<Card className="shadow-sm my-3">
				<Card.Body>
					<Card.Title>@{props.chirp?.username}:</Card.Title>
					<Card.Text>{props.chirp?.message}</Card.Text>
					<div className="row justify-content-around">
						<Button variant="outline-primary" className="shadow-sm" size="sm" onClick={() => history.goBack()}>Go Back</Button>
						<Link to={`/chirps/edit/${props.chirp?.id}`} className="d-flex justify-content-center align-items-center btn btn-sm btn-outline-success shadow-sm">Edit <FaRegEdit className="ml-2" /></Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

interface IDetailsCardProps {
	chirp: IChirp
}

export default DetailsCard;