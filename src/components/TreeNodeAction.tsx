import { DraggableAttributes } from '@dnd-kit/core';
import { useTreeContext } from './TreeContext';
import { NodeType } from './TreeView';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export type TreeNodeActionProps = {
	node: NodeType;
	ref: React.Ref<HTMLDivElement>;
	attributes: DraggableAttributes;
	listners?: SyntheticListenerMap;
	style: {
		transition: string | undefined;
		transform: string | undefined;
	};
};

const TreeNodeAction = ({
	node,
	ref,
	attributes,
	listners,
	style,
}: TreeNodeActionProps) => {
	const { activeNodeId, selectNode } = useTreeContext();

	const handleOnClick = () => {
		selectNode(node.id);
	};

	return (
		<div
			className={activeNodeId === node.id ? 'text-blue-600' : ''}
			ref={ref}
			{...attributes}
			{...listners}
			style={style}
		>
			<div onClick={handleOnClick}>{node.title}</div>
		</div>
	);
};

export default TreeNodeAction;
