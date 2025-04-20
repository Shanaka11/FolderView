import React from 'react';
import { NodeType } from './TreeView';
import TreeNodeAction from './TreeNodeAction';
// import { useTreeContext } from './TreeContext';

type TreeNodeProps = {
	node: NodeType;
};
const TreeNode = ({ node }: TreeNodeProps) => {
	// const { activeNodeIdPath } = useTreeContext();

	return (
		<div>
			<TreeNodeAction node={node} />
			{/* {activeNodeIdPath.findIndex((item) => item === node.id) >= 0 &&
				childNodes?.map((childNode) => {
					if (childNode.type === 'folder') {
						return (
							<TreeNode
								key={childNode.id}
								node={childNode}
								childNodes={childNode.children}
								parentNode={node}
							/>
						);
					}
					return (
						<TreeNodeAction
							key={childNode.id}
							node={childNode}
							parentNode={node}
						/>
					);
				})} */}
		</div>
	);
};

export default TreeNode;
