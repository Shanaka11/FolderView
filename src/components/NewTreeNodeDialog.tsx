'use client';
import React, { useRef, useState } from 'react';
import { useTreeContext } from './TreeContext';
import { ListPlus, X } from 'lucide-react';

const NewTreeNodeDialog = () => {
	const ref = useRef<HTMLDialogElement>(null);
	const [title, setTitle] = useState('');
	const [type, setType] = useState<'folder' | 'page'>('folder');
	const { createNode } = useTreeContext();

	const handleOpen = () => {
		ref.current?.showModal();
	};
	const handleClose = () => {
		ref.current?.close();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// get the form data
		createNode({
			id: Math.floor(Math.random() * 1000),
			title,
			type,
		});
		ref.current?.close();
	};

	return (
		<>
			<div>
				<button
					className='bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center cursor-pointer'
					onClick={handleOpen}
				>
					<ListPlus className='h-5 w-5' /> Add Item
				</button>
			</div>
			<dialog ref={ref} className='backdrop:bg-black/30 m-auto max-w-80 w-dvw'>
				<div className='p-4 space-y-4'>
					<div className='flex justify-between align-center'>
						<h1 className='font-bold text-xl'>New Item</h1>
						<button onClick={handleClose} className='cursor-pointer'>
							<X className='h-5 w-5' />
						</button>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<div className='flex flex-col gap-1'>
							<label className='text-xs text-slate-500' htmlFor='title'>
								Title
							</label>
							<input
								autoFocus
								required
								id='title'
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='border border-slate-300 rounded-md p-2'
							></input>
						</div>
						<div className='flex flex-col gap-1'>
							<label htmlFor='type' className='text-xs text-slate-500'>
								Type
							</label>
							<select
								required
								id='type'
								value={type}
								onChange={(e) => setType(e.target.value as 'folder' | 'page')}
								className='border border-slate-300 rounded-md p-2'
							>
								<option value='folder'>Folder</option>
								<option value='page'>Page</option>
							</select>
						</div>
						<div className='flex justify-end gap-2'>
							<button
								type='submit'
								className='bg-blue-600 text-white py-1 px-3 rounded flex gap-2 items-center cursor-pointer'
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</dialog>
		</>
	);
};

export default NewTreeNodeDialog;
