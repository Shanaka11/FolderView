import React from 'react';
import { NodeType } from './TreeView';

type TreeNodeProps = {
	node: NodeType;
	childNodes?: NodeType[];
};
const TreeNode = ({ node, childNodes }: TreeNodeProps) => {
	return (
		<div>
			<div>{node.title}</div>
			{childNodes?.map((childNode, index) => {
				if (childNode.type === 'folder') {
					return (
						<TreeNode
							key={index}
							node={childNode}
							childNodes={childNode.children}
						/>
					);
				}
				return <div key={index}>{childNode.title}</div>;
			})}
		</div>
	);
};

export default TreeNode;
