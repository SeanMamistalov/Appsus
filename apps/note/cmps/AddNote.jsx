const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function AddNoteForm({ onClose, onSave, onUpdate, existingNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect(() => {
        if (existingNote) setNote(existingNote)
    }, [existingNote])

    function handleChange({ target }) {
        const { name: prop, value } = target
        setNote(prevNote => {
            if (prop === 'title' || prop === 'txt') {
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

    function handleFileChange({ target }) {
        const file = target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        url: reader.result
                    }
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    function handleSave(ev) {
        ev.preventDefault()
        if (note.id) {
            onUpdate(note)
                .then(() => {
                    showSuccessMsg('Note updated successfully!')
                    onClose()
                })
                .catch(() => {
                    showErrorMsg('Failed to update note')
                })
        } else {
            onSave(note)
                .then(() => {
                    showSuccessMsg('Note added successfully!')
                    onClose()
                })
                .catch(() => {
                    showErrorMsg('Failed to add note')
                })
        }
    }

    return (
        <section className="note-edit">
            <form onSubmit={handleSave}>
                <label htmlFor="title">Title</label>
                <input
                    onChange={handleChange}
                    value={note.info.title}
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
                            value={note.info.txt}
                            id="txt"
                            name="txt"
                            placeholder="Enter your note here"></textarea>
                    </React.Fragment>
                )}

                {note.type === 'img' && (
                    <React.Fragment>
                        <label htmlFor="file">Upload Image</label>
                        <input
                            onChange={handleFileChange}
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*" />
                        {note.info.url && (
                            <img src={note.info.url} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                        )}
                    </React.Fragment>
                )}

                <button>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </section>
    )
}
