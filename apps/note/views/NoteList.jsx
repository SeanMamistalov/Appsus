import { NotePreview } from "../cmps/NotePreview.jsx"
const { useOutletContext } = ReactRouterDOM

export function NoteList() {
    const { notes, onRemove, onTogglePin, onDuplicate } = useOutletContext()

    return (
        <section className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-item">
                    <div className="note-content">
                        <NotePreview note={note} />
                    </div>
                    <div className="buttons-container">
                        <button onClick={() => onTogglePin(note.id)} className="icon-button">
                            <img className="icon" src={note.isPinned ? "assets/img/unpin.svg" : "assets/img/pin.svg"} alt="Pin Icon" />
                        </button>
                        <button onClick={() => onRemove(note.id)} className="icon-button">
                            <img className="icon" src="assets/img/delete.svg" alt="Delete Icon" />
                        </button>
                        <button onClick={() => onDuplicate(note.id)} className="icon-button">
                            <img className="icon" src="assets/img/duplicate.svg" alt="Duplicate Icon" />
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
                </div>
            ))}
        </section>
    )
}
