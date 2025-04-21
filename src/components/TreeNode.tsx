import React from 'react';
import { NodeType } from './TreeView';
import TreeNodeAction from './TreeNodeAction';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
// import { useTreeContext } from './TreeContext';

type TreeNodeProps = {
	node: NodeType;
};
const TreeNode = ({ node }: TreeNodeProps) => {
	// const { activeNodeIdPath } = useTreeContext();
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: node.id });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<TreeNodeAction
			node={node}
			ref={setNodeRef}
			attributes={attributes}
			listners={listeners}
			style={style}
		/>
	);
};

export default TreeNode;
