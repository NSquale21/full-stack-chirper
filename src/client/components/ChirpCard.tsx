import * as React from 'react';
import { Link } from 'react-router-dom';
import { IChirp } from '../utils/interfaces';
import { Col, Card } from 'react-bootstrap';

const ChirpCard: React.FC<IChirpCardProps> = props => {
  return (
		<Col as="article" md={7}>
			<Card className="shadow-sm my-2">
				<Card.Body>
					<Card.Title>@{props.chirp.username}:</Card.Title>
					<Card.Text>{props.chirp.message}</Card.Text>
					<Link to={`/chirps/details/${props.chirp.id}`} className="btn btn-sm btn-outline-primary shadow-sm">Get Details</Link>
				</Card.Body>
			</Card>
		</Col>
	);
}

interface IChirpCardProps {
	chirp: IChirp;
}

export default ChirpCard;