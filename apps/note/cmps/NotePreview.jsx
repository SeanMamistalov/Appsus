import { NoteTxt } from "./dynamic-note/NoteTxt.jsx"
import { NoteImg } from "./dynamic-note/NoteImg.jsx"

const NOTE_TYPE_COMPONENTS = {
    txt: NoteTxt,
    img: NoteImg,
}

export function NotePreview({ note }) {
    const NoteComponent = NOTE_TYPE_COMPONENTS[note.type] || null
    const { title = 'Untitled', createdAt = '', type = '' } = note.info || {}

    return (
        <article className="note-preview">
            <h3>Title: {title}</h3>
            <p>
                Created At: {createdAt}<br />
                Type: {type}<br />
            </p>
            {NoteComponent ? <NoteComponent info={note.info} /> : <p>Unsupported note type</p>}
        </article>
    )
}
