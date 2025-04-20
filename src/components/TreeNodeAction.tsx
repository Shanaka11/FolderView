import { useTreeContext } from './TreeContext';
import { NodeType } from './TreeView';

export type TreeNodeActionProps = {
	node: NodeType;
};

const TreeNodeAction = ({ node }: TreeNodeActionProps) => {
	const { activeNodeId, selectNode } = useTreeContext();

	const handleOnClick = () => {
		selectNode(node.id);
	};

	return (
		<div
			className={activeNodeId === node.id ? 'text-blue-600' : ''}
			onClick={handleOnClick}
		>
			{node.title}
		</div>
	);
};

export default TreeNodeAction;
