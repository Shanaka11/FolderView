'use client';
import { createContext, useContext, useState } from 'react';
import { NodeType } from './TreeView';

type TreeContextType = {
	structure: NodeType[];
	activeNodeId: number | null;
	selectNode: (id: number | null, parentNodeId: number | null) => void;
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

	const selectNode = (id: number | null, parentNodeId: number | null) => {
		// We get null if we select already selected node, then just pop that
		if (id === null) {
			setActiveNodeId(null);
			setActiveNodeIdPath((prev) => prev.slice(0, -1));
			return;
		}
		// if activeNodeId is empty then we directly push the new nodeid
		if (activeNodeIdPath.length === 0) {
			setActiveNodeId(id);
			setActiveNodeIdPath((prev) => [...prev, id]);
			return;
		}
		// check to see if the parentNodeId is anyware in the path
		while (activeNodeIdPath.length > 0) {
			const lastNodeId = activeNodeIdPath.pop();
			if (lastNodeId === parentNodeId) {
				setActiveNodeId(id);
				setActiveNodeIdPath((prev) => [...prev, lastNodeId, id]);
				return;
			}
		}
		// else we reset the path
		setActiveNodeId(id);
		setActiveNodeIdPath([id]);
	};

	// Have a useEffect here to fetch structure from the local storage if needed when mounting
	return (
		<TreeContext.Provider
			value={{
				structure: activeStructure,
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
