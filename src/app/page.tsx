import Tree from '@/components/Tree';
import { structure } from '@/data/structure';

export default function Home() {
	return (
		<div className='px-4 py-4'>
			<Tree structure={structure} />
		</div>
	);
}
