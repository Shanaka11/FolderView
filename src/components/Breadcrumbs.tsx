import React, { Fragment } from 'react';
import { useTreeContext } from './TreeContext';

const Breadcrumbs = () => {
	const { nodeHistory, selectNode } = useTreeContext();

	return (
		<div className='flex gap-2'>
			<span onClick={() => selectNode(null)}>Home</span>
			{nodeHistory.length > 0 && <span>{' > '}</span>}
			{nodeHistory.map((item, index) => {
				return (
					<Fragment key={item.id}>
						<span onClick={() => selectNode(item.id)}>{item.title}</span>
						{nodeHistory.length - 1 !== index && <span>{' > '}</span>}
					</Fragment>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
