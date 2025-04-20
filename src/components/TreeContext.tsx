'use client';
import { createContext, useContext, useState } from 'react';
import { NodeType, Page } from './TreeView';

type TreeContextType = {
	structure: NodeType[] | Page;
	activeNodeId: number | null;
	selectNode: (id: number) => void;
	activeNodeIdPath: number[];
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
	const [activeStructure] = useState<NodeType[]>(structure);
	const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
	const [activeNodeIdPath, setActiveNodeIdPath] = useState<number[]>([]);
	const [currentStructure, setCurrentStructure] = useState<NodeType[] | Page>(
		structure
	);

	const selectNode = (id: number) => {
		// We get null if we select already selected node, then just pop that
		if (id === null) {
			setActiveNodeId(null);
			// setActiveNodeIdPath((prev) => prev.slice(0, -1));
			setCurrentStructure(getActiveStructure(null) || []);
			return;
		}

		// else we reset the path
		setActiveNodeId(id);
		// setActiveNodeIdPath([id]);
		setCurrentStructure(getActiveStructure(id) || []);
	};

	const getActiveStructure = (nodeId: number | null) => {
		if (nodeId === null) {
			return [...activeStructure];
		}
		return findNodeById(nodeId, activeStructure);
	};

	const findNodeById = (
		id: number,
		nodes: NodeType[]
	): Page | NodeType[] | undefined => {
		for (const node of nodes) {
			if (node.id === id) {
				if (node.type === 'page') return node;
				if (node.type === 'folder') return node.children ?? [];
			}

			// Traverse deeper if this is a folder
			if (node.type === 'folder' && node.children) {
				const result = findNodeById(id, node.children);
				if (result !== undefined) {
					return result; // Only return if something was actually found
				}
			}
		}

		return undefined; // Return only after checking all nodes
	};
	// Have a useEffect here to fetch structure from the local storage if needed when mounting
	return (
		<TreeContext.Provider
			value={{
				structure: currentStructure,
				activeNodeId,
				selectNode,
				activeNodeIdPath,
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
