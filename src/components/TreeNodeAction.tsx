import { useTreeContext } from './TreeContext';
import { NodeType } from './TreeView';

export type TreeNodeActionProps = {
	node: NodeType;
};

const TreeNodeAction = ({ node }: TreeNodeActionProps) => {
	const { activeNodeId, selectNode, activeNodeIdPath } = useTreeContext();

	const handleOnClick = () => {
		selectNode(node.id);
	};

	return (
		<div
			className={activeNodeId === node.id ? 'text-blue-600' : ''}
			onClick={handleOnClick}
		>
			{node.title}
			{node.type === 'folder' && node.children && node.children?.length > 0 && (
				<span>{activeNodeIdPath.indexOf(node.id) >= 0 ? ' - ' : ' + '}</span>
			)}
		</div>
	);
};

export default TreeNodeAction;
