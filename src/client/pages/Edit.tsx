import * as React from 'react';
import EditForm from '../components/EditForm';

const Edit: React.FC<IEditProps> = () => {

	return (
		<section className="row justify-content-center">
			<EditForm />
		</section>
	);
}

interface IEditProps {}

export default Edit;