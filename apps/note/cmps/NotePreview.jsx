import { NoteTxt } from "./dynamic-note/NoteTxt.jsx"
import { NoteImg } from "./dynamic-note/NoteImg.jsx"
import { NoteAudio } from "./dynamic-note/NoteAudio.jsx"

const NOTE_TYPE_COMPONENTS = {
    txt: NoteTxt,
    img: NoteImg,
    recording: NoteAudio,
}

export function NotePreview({ note }) {
    const NoteComponent = NOTE_TYPE_COMPONENTS[note.type] || null
    const { title = 'Untitled', createdAt = '', type = '' } = note.info || {}

    return (
        <article className="note-preview">
            <h3>Title: {title}</h3>
            {NoteComponent ? <NoteComponent info={note.info} /> : <p>Unsupported note type</p>}
        </article>
    )
}
