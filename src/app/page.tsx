import Tree from '@/components/Tree';
import { NodeType } from '@/components/TreeView';

export const structure: NodeType[] = [
	{
		id: 1,
		title: 'Folder 1',
		type: 'folder',
		children: [
			{
				id: 2,
				title: 'Folder 1.1',
				type: 'folder',
				children: [
					{
						id: 3,
						title: 'Page 1.1.1',
						type: 'page',
					},
				],
			},
			{
				id: 4,
				title: 'Page 1',
				type: 'page',
			},
			{
				id: 5,
				title: 'Page 2',
				type: 'page',
			},
		],
	},
	{
		id: 6,
		title: 'Folder 2',
		type: 'folder',
		children: [
			{
				id: 7,
				title: 'Page 3',
				type: 'page',
			},
			{
				id: 8,
				title: 'Page 4',
				type: 'page',
			},
		],
	},
	{
		id: 9,
		title: 'Page 5',
		type: 'page',
	},
	{
		id: 10,
		title: 'Page 6',
		type: 'page',
	},
];

export default function Home() {
	return (
		<div>
			<Tree structure={structure} />
		</div>
	);
}
