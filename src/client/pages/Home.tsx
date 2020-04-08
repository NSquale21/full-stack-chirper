import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { IChirp } from '../utils/interfaces';
import ChirpForm from '../components/ChirpForm';
import ChirpCard from '../components/ChirpCard';

const Home: React.FC<IHomeProps> = () => {
	
	const [chirps, setChirps] = useState<IChirp[]>([])

	const getChirps = useCallback(async () => {
        let res = await fetch('/api/chirps');
        if (res.ok) {
            let chirps = await res.json();
			setChirps(chirps);
        }
    }, []);

    useEffect(() => {
        getChirps();
    }, [getChirps]);
	
	return (
		<section className="row justify-content-center">
			<ChirpForm getEm={getChirps} />
			{chirps.map(chirp => <ChirpCard key={`chirpcard-${chirp.id}`} chirp={chirp} />)}
		</section>
	);
}

interface IHomeProps {}

export default Home;