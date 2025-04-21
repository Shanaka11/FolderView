import React, { Fragment } from 'react';
import { useTreeContext } from './TreeContext';

const Breadcrumbs = () => {
	const { nodeHistory, selectNode } = useTreeContext();

	return (
		<div className='flex gap-2'>
			<span
				className={`${
					nodeHistory.length === 0
						? 'text-black'
						: 'text-gray-500 hover:underline cursor-pointer'
				} text-sm`}
				onClick={() => selectNode(null)}
			>
				Home
			</span>
			{nodeHistory.length > 0 && (
				<span className='text-gray-500 text-sm'>{' > '}</span>
			)}
			{nodeHistory.map((item, index) => {
				return (
					<Fragment key={item.id}>
						<span
							className={`${
								nodeHistory.length - 1 === index
									? 'text-black'
									: 'text-gray-500 hover:underline cursor-pointer'
							} text-sm`}
							onClick={() => selectNode(item.id)}
						>
							{item.title}
						</span>
						{nodeHistory.length - 1 !== index && (
							<span className='text-gray-500 text-sm'>{' > '}</span>
						)}
					</Fragment>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
