'use client';
import React, { useRef, useState } from 'react';
import { useTreeContext } from './TreeContext';

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
			<button
				className='bg-blue-600 text-white py-2 px-3 rounded'
				onClick={handleOpen}
			>
				+
			</button>
			<dialog ref={ref} className='backdrop:bg-black/30 m-auto max-w-80 w-dvw'>
				<div className='p-4 space-y-4'>
					<div className='flex justify-between '>
						<h1>New</h1>
						<button onClick={handleClose}>X</button>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<div className='flex flex-col gap-1'>
							<label htmlFor='title'>Title</label>
							<input
								autoFocus
								required
								id='title'
								type='text'
								placeholder='title'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></input>
						</div>
						<div className='flex flex-col gap-1'>
							<label htmlFor='type'>Title</label>
							<select
								required
								id='type'
								value={type}
								onChange={(e) => setType(e.target.value as 'folder' | 'page')}
							>
								<option value='folder'>Folder</option>
								<option value='page'>Page</option>
							</select>
						</div>
						<div className='flex justify-end gap-2'>
							<button type='submit'>Create</button>
						</div>
					</form>
				</div>
			</dialog>
		</>
	);
};

export default NewTreeNodeDialog;
