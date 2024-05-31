const { useState } = React

import { noteService } from '../services/note.service.js'

export function AddNoteForm({ onClose, onSave }) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    function handleChange({ target }) {
        const { name, value } = target;
        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value
            }
        }))
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        onSave(note);
    }

    return (
        <div className="add-note-form">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.info.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="txt"
                    placeholder="Text"
                    value={note.info.txt}
                    onChange={handleChange}
                    required
                ></textarea>
                <div className="form-buttons">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}