import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
const { useState, useEffect } = React

export function Trash() {
    const [trashedNotes, setTrashedNotes] = useState([])

    useEffect(() => {
        noteService.query({ isTrashed: true })
            .then(notes => setTrashedNotes(notes))
            .catch(err => showErrorMsg('Failed to fetch trashed notes'))
    }, [])

    function restoreNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                note.isTrashed = false
                return noteService.save(note)
            })
            .then(() => {
                setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} restored successfully!`)
            })
            .catch(err => showErrorMsg('Failed to restore note'))
    }

    return (
        <section className="note-index-container">
            <div className="note-list-container">
                {trashedNotes.length === 0 ? (
                    <div className="empty-message">No notes in the trash...</div>
                ) : (
                    <ul className="note-list">
                        {trashedNotes.map(note => (
                            <li key={note.id} className="note-item">
                                <h3>{note.info.title}</h3>
                                <p>{note.info.txt}</p>
                                <div className="buttons-container">
                                    <button className="icon-button" onClick={() => restoreNote(note.id)}>
                                        <span className="material-icons icon">restore</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
