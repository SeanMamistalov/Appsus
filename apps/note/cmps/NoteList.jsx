import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemove }) {
    return (
        <section className="note-list">
            <ul>
                {notes.map(note => (
                    <li key={note.id} className="note-item">
                        <NotePreview note={note} />
                        <div className="buttons-container">
                            <button onClick={() => onRemove(note.id)} className="icon-button">
                                <img className="icon" src="assets/img/delete.svg" alt="Delete Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/reminder.svg" alt="Reminder Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/edit.svg" alt="Edit Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/palette.svg" alt="Palette Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/add_img.svg" alt="Add Image Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/archive.svg" alt="Archive Icon" />
                            </button>
                            <button className="icon-button">
                                <img className="icon" src="assets/img/more.svg" alt="More Icon" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
