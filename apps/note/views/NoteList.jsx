const { useState } = React
const { useOutletContext } = ReactRouterDOM

import { ColorPicker } from "../cmps/ColorInput.jsx"
import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList() {
    const { notes, onRemove, onTogglePin, onDuplicate, onUpdateColor, onArchive } = useOutletContext();
    const [showColorPicker, setShowColorPicker] = useState(null)

    return (
        <section className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-item" style={{ backgroundColor: note.backgroundColor || 'white' }}>
                    <div className="pin-container">
                        <button onClick={() => onTogglePin(note.id)} className="icon-button pin-button" title={note.isPinned ? "Unpin Note" : "Pin Note"}>
                            <img className="icon" src={note.isPinned ? "assets/img/unpin.svg" : "assets/img/pin.svg"} alt="Pin Icon" />
                        </button>
                    </div>
                    <NotePreview note={note} onUpdateColor={onUpdateColor} />
                    <div className="buttons-container">
                        <button onClick={() => onRemove(note.id)} className="icon-button" title="Delete Note">
                            <img className="icon" src="assets/img/delete.svg" alt="Delete Icon" />
                        </button>
                        <button onClick={() => onDuplicate(note.id)} className="icon-button" title="Duplicate Note">
                            <img className="icon" src="assets/img/duplicate.svg" alt="Duplicate Icon" />
                        </button>
                        <button className="icon-button" title="Edit Note">
                            <img className="icon" src="assets/img/edit.svg" alt="Edit Icon" />
                        </button>
                        <button className="icon-button" onClick={() => setShowColorPicker(note.id)} title="Change Note Color">
                            <img className="icon" src="assets/img/palette.svg" alt="Palette Icon" />
                        </button>
                        <button className="icon-button" title="Add Image">
                            <img className="icon" src="assets/img/add_img.svg" alt="Add Image Icon" />
                        </button>
                        <button onClick={() => onArchive(note.id)} className="icon-button" title="Archive Note">
                            <img className="icon" src="assets/img/archive.svg" alt="Archive Icon" />
                        </button>
                    </div>
                    {showColorPicker === note.id && (
                        <ColorPicker
                            noteId={note.id}
                            onSetColor={onUpdateColor}
                            currentColor={note.backgroundColor}
                            closeColorPicker={() => setShowColorPicker(null)}
                        />
                    )}
                </div>
            ))}
        </section>
    )
}
