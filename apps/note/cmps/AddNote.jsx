const { useState } = React
const { useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function AddNoteForm({ onClose, onSave }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name: prop, value } = target
        setNote(prevNote => {
            if (prop === 'title' || prop === 'txt' || prop === 'url') {
                return {
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        [prop]: value
                    }
                }
            } else {
                return { ...prevNote, [prop]: value }
            }
        })
    }
    
    function handleSave(ev) {
        ev.preventDefault()
        onSave(note)
            .then(() => {
                showSuccessMsg('Note added successfully!')
                onClose()
            })
            .catch(() => {
                showErrorMsg('Failed to add note')
            })
    }

    return (
        <section className="note-edit">
            <h1>Add Note</h1>

            <form onSubmit={handleSave}>
                <label htmlFor="title">Title</label>
                <input
                    onChange={handleChange}
                    value={note.title}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title" />

                <label htmlFor="type">Type</label>
                <select
                    onChange={handleChange}
                    value={note.type}
                    id="type"
                    name="type">
                    <option value="">Select type</option>
                    <option value="txt">Text</option>
                    <option value="img">Image</option>
                </select>

                {note.type === 'txt' && (
                    <React.Fragment>
                        <label htmlFor="txt">Text</label>
                        <textarea
                            onChange={handleChange}
                            value={note.txt}
                            id="txt"
                            name="txt"
                            placeholder="Enter your note here"></textarea>
                    </React.Fragment>
                )}

                {note.type === 'img' && (
                    <React.Fragment>
                        <label htmlFor="url">Image URL</label>
                        <input
                            onChange={handleChange}
                            value={note.url}
                            id="url"
                            name="url"
                            type="text"
                            placeholder="Image URL" />
                    </React.Fragment>
                )}

                <button>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </section>
    )
}
