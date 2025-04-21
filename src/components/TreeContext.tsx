'use client';
import { createContext, useContext, useState } from 'react';
import { NodeType, Page } from './TreeView';
import _ from 'lodash';

type TreeContextType = {
	structure: NodeType[] | Page;
	activeNodeId: number | null;
	selectNode: (id: number | null) => void;
	nodeHistory: NodeType[];
	createNode: (node: NodeType) => void;
};

const TreeContext = createContext<TreeContextType | null>(null);

type TreeContextProviderProps = {
	children: React.ReactNode;
	structure: NodeType[];
};

const TreeContextProvider = ({
	structure,
	children,
}: TreeContextProviderProps) => {
	const [activeStructure, setActiveStructure] = useState<NodeType[]>(structure);
	const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
	const [nodeHistory, setNodeHistory] = useState<NodeType[]>([]);
	const [currentStructure, setCurrentStructure] = useState<NodeType[] | Page>(
		structure
	);

	const selectNode = (id: number | null) => {
		// We get null if we select already selected node, then just pop that
		if (id === null) {
			setActiveNodeId(null);
			// setActiveNodeIdPath((prev) => prev.slice(0, -1));
			const activeNode = getActiveStructure(null);
			if (activeNode === undefined) {
				setCurrentStructure([]);
				setNodeHistory([]);
				return;
			}
			setCurrentStructure(activeNode.structure);
			setNodeHistory(activeNode.path);
			return;
		}

		// else we reset the path
		setActiveNodeId(id);
		const activeNode = getActiveStructure(id);
		if (activeNode === undefined) {
			setCurrentStructure([]);
			setNodeHistory([]);
			return;
		}
		setCurrentStructure(activeNode.structure);
		setNodeHistory(activeNode.path);
	};

	const getActiveStructure = (nodeId: number | null) => {
		if (nodeId === null) {
			return { structure: [...activeStructure], path: [] };
		}
		return findNodeById(nodeId, activeStructure);
	};

	const findNodeById = (
		id: number,
		nodes: NodeType[],
		path: NodeType[] = []
	): { structure: Page | NodeType[]; path: NodeType[] } | undefined => {
		for (const node of nodes) {
			const currentPath = [...path, node];
			if (node.id === id) {
				if (node.type === 'page') return { structure: node, path: currentPath };
				if (node.type === 'folder')
					return { structure: node.children ?? [], path: currentPath };
			}

			// Traverse deeper if this is a folder
			if (node.type === 'folder' && node.children) {
				const result = findNodeById(id, node.children, currentPath);
				if (result !== undefined) {
					return result; // Only return if something was actually found
				}
			}
		}

		return undefined; // Return only after checking all nodes
	};

	const createNode = (node: NodeType) => {
		// If the current structure is a page, we can't create a node
		if (!Array.isArray(currentStructure)) {
			return;
		}
		if (activeNodeId === null) {
			// Node should be created at the root level
			const tempActiveStructure = [...activeStructure, node];
			const tempCurrentStructure = [...currentStructure, node];
			setActiveStructure(tempActiveStructure);
			setCurrentStructure(tempCurrentStructure);
			// Save this in the local storage
			return;
		}

		const activeNode = findNodeById(activeNodeId, activeStructure);

		if (activeNode === undefined) {
			return;
		}

		if (Array.isArray(activeNode.structure)) {
			const tempCurrentStructure = [...currentStructure, node];
			const tempActiveStructure = _.cloneDeepWith(activeStructure, (value) => {
				return value.id === activeNodeId
					? {
							...value,
							children: value.children ? [...value.children, node] : [node],
					  }
					: _.noop();
			});

			setCurrentStructure(tempCurrentStructure);
			setActiveStructure(tempActiveStructure);
		}
	};
	// Have a useEffect here to fetch structure from the local storage if needed when mounting
	return (
		<TreeContext.Provider
			value={{
				structure: currentStructure,
				activeNodeId,
				selectNode,
				nodeHistory,
				createNode,
			}}
		>
			{children}
		</TreeContext.Provider>
	);
};

const useTreeContext = () => {
	const tree = useContext(TreeContext);
	if (!tree) {
		throw new Error('useTreeContext must be used within a TreeContextProvider');
	}
	return tree;
};

export { TreeContext, TreeContextProvider, useTreeContext };
