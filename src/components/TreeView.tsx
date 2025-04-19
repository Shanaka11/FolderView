'use client';
import TreeNode from './TreeNode';
import { useTreeContext } from './TreeContext';

export type Page = {
	title: string;
	type: 'page';
};

export type NodeType = Page | Folder;

export type Folder = {
	title: string;
	children?: NodeType[];
	type: 'folder';
};

const TreeView = () => {
	const { structure } = useTreeContext();

	return structure.map((node, index) => {
		return (
			<TreeNode
				key={index}
				node={node}
				childNodes={node.type === 'folder' ? node.children : []}
			/>
		);
	});
};

export default TreeView;
