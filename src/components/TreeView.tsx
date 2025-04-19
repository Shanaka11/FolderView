'use client';
import TreeNode from './TreeNode';
import { useTreeContext } from './TreeContext';

export type Page = {
	id: number;
	title: string;
	type: 'page';
};

export type NodeType = Page | Folder;

export type Folder = {
	id: number;
	title: string;
	children?: NodeType[];
	type: 'folder';
};

const TreeView = () => {
	const { structure } = useTreeContext();

	return (
		<div>
			{/* <div>
				<button>+</button>
			</div> */}
			{structure.map((node) => {
				return (
					<TreeNode
						key={node.id}
						node={node}
						childNodes={node.type === 'folder' ? node.children : []}
					/>
				);
			})}
		</div>
	);
};

export default TreeView;
