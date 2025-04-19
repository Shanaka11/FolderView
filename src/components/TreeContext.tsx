'use client';
import { createContext, useContext, useState } from 'react';
import { NodeType } from './TreeView';

type TreeContextType = {
	structure: NodeType[];
};

const TreeContext = createContext<TreeContextType | null>(null);

type TreeContextProviderProps = {
	children: React.ReactNode;
};

const TreeContextProvider = ({
	structure,
	children,
}: TreeContextProviderProps & TreeContextType) => {
	const [activeStructure] = useState<NodeType[]>(structure);

	// Have a useEffect here to fetch structure from the local storage if needed when mounting
	return (
		<TreeContext.Provider value={{ structure: activeStructure }}>
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
