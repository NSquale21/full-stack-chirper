import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IChirp } from '../utils/interfaces';
import DetailsCard from '../components/DetailsCard';

const Details: React.FC<IDetailsProps> = () => {

	const { chirpid } = useParams();
	const [chirp, setChirp] = useState<IChirp>(null);
	
	useEffect(() => {
		(async () => {
			let res = await fetch(`/api/chirps/${chirpid}`);
			let chirp = await res.json();
			setChirp(chirp);
		})();
	}, [chirpid]);

	return (
		<section className="row justify-content-center">
			<DetailsCard key={`detailscard-${chirp?.id}`} chirp={chirp} />
		</section>
	);
}

interface IDetailsProps {}

export default Details;