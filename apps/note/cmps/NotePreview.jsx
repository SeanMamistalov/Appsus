export function NotePreview({ note }) {
    return (
        <article className="note-preview">
            <h3>Title: {note.info.title}</h3>
            <p>
                Created At: {note.createdAt}<br />
                Type: {note.type}<br />
                Pinned: {note.isPinned ? 'Yes' : 'No'}<br />
                Background Color: {note.style.backgroundColor}
            </p>
            <p>{note.info.txt}</p>
        </article>
    )
}