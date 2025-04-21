'use client';
import { TreeContextProvider } from './TreeContext';
import TreeView, { NodeType } from './TreeView';

type TreeProps = {
	structure: NodeType[];
};

const Tree = ({ structure }: TreeProps) => {
	return (
		<TreeContextProvider structure={structure}>
			<TreeView />
		</TreeContextProvider>
	);
};

export default Tree;
