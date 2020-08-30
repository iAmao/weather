import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/atoms/Button';

const EditModeNotesAction = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	align-self: flex-end;
	padding-bottom: 50px;

	&>button {
		min-width: 80px;
	}
`;

const NoteContainer = styled.div`
	width: 100%;
	max-width: 250px;
	height: calc(100% - 80px);
	display: grid;
	grid-template-rows: 5fr 1fr;
	justify-self: center;

	&>textarea {
		width: calc(100% - 20px);
		border: 1px solid #efefef;
		padding: 10px;
	}
`;

const ContentArea = styled.div`
	padding-top: 50px;
`;


const Notes: React.FC<NotesProps> = (props) => {
	const [editMode, toggleEditMode] = React.useState(!props.content);
	const [content, setContent] = React.useState(props.content);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// const target: HTMLTextAreaElement = e.target;
		setContent(e.currentTarget.value);
	}
	const handleToggleEditMode = () => toggleEditMode(!editMode);
	const handleSave = () => {
		props.onSave(content);
		toggleEditMode(false);
	};
	const handleCancel = () => {
		setContent(props.content);
		toggleEditMode(false);
	};
	const handleDelete = () => props.onDelete();

	return (
		<NoteContainer>
			{editMode
					? <textarea value={content} onChange={handleChange} placeholder="Add a note"/>
					: <ContentArea>
							<strong>Notes</strong><br/><br/>
							{content}
						</ContentArea>
			}
			{
				editMode
					? (<EditModeNotesAction>
							<Button variant="primary" onClick={handleSave}>Save</Button>
							<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
						</EditModeNotesAction>)
					: (<EditModeNotesAction>
							<Button variant="primary" onClick={handleToggleEditMode}>Edit</Button>
							<Button variant="secondary" onClick={handleDelete}>Delete</Button>
						</EditModeNotesAction>)
			}
		</NoteContainer>
	);
}

export interface NotesProps {
	content: string;
	onDelete: () => void;
	onSave: (content: string) => void;
}

export default Notes;

