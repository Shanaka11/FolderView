import Tree from '@/components/Tree';
import { NodeType } from '@/components/TreeView';

export const structure: NodeType[] = [
	{
		title: 'Folder 1',
		type: 'folder',
		children: [
			{
				title: 'Folder 1.1',
				type: 'folder',
				children: [
					{
						title: 'Page 1.1.1',
						type: 'page',
					},
				],
			},
			{
				title: 'Page 1',
				type: 'page',
			},
			{
				title: 'Page 2',
				type: 'page',
			},
		],
	},
	{
		title: 'Folder 2',
		type: 'folder',
		children: [
			{
				title: 'Page 3',
				type: 'page',
			},
			{
				title: 'Page 4',
				type: 'page',
			},
		],
	},
	{
		title: 'Page 5',
		type: 'page',
	},
	{
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
