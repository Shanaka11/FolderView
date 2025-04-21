'use client';
import TreeNode from './TreeNode';
import { useTreeContext } from './TreeContext';
import Breadcrumbs from './Breadcrumbs';
import NewTreeNodeDialog from './NewTreeNodeDialog';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
	closestCorners,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';

export type Page = {
	id: number;
	title: string;
	type: 'page';
};

export type NodeType = Page | Folder;

export type Folder = {
	id: number;
	title: string;
	children?: NodeType[];
	type: 'folder';
};

const TreeView = () => {
	const { structure, reOrderNodes } = useTreeContext();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over === null) return;
		if (active.id === over.id) return;

		reOrderNodes(active.id as number, over.id as number);
	};

	if (!Array.isArray(structure)) {
		// This should be the page viewer
		return (
			<div>
				<Breadcrumbs />
				<h1>{structure.title}</h1>
			</div>
		);
	}
	return (
		<div>
			<Breadcrumbs />
			<NewTreeNodeDialog />
			<DndContext
				collisionDetection={closestCorners}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext
					items={structure}
					strategy={verticalListSortingStrategy}
				>
					{structure.map((node) => {
						return (
							<TreeNode
								key={node.id}
								node={node}
								//childNodes={node.type === 'folder' ? node.children : []}
							/>
						);
					})}
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default TreeView;
