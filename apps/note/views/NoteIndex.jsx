import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { SearchNote } from '../cmps/SearchNote.jsx'
const { useState, useEffect } = React
const { NavLink, Outlet, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => showErrorMsg('Failed to fetch notes'))
    }, [filterBy, setSearchParams])

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} moved to trash successfully!`)
            })
            .catch(err => showErrorMsg('Failed to move note to trash'))
    }

    function togglePinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                setNotes(prevNotes => {
                    const updatedNotes = prevNotes.map(note => {
                        if (note.id === noteId) note.isPinned = !note.isPinned
                        return note
                    })
                    updatedNotes.sort((a, b) => b.isPinned - a.isPinned)
                    return updatedNotes
                })
                showSuccessMsg(`Note ${noteId} pin status updated successfully!`)
            })
            .catch(err => showErrorMsg('Failed to update pin status'))
    }

    function duplicateNote(noteId) {
        noteService.duplicate(noteId)
            .then(duplicatedNote => {
                console.log('Duplicated Note:', duplicatedNote)
                setNotes(prevNotes => {
                    console.log('Previous Notes:', prevNotes)
                    return [...prevNotes, duplicatedNote]
                })
                showSuccessMsg(`Note ${noteId} duplicated successfully!`)
            })
            .catch(err => showErrorMsg('Failed to duplicate note'))
    }

    return (
        <section className="note-index-container">
            <div className="search-note-container">
                <SearchNote search={filterBy} onSearch={setFilterBy} />
            </div>
            <div className="main-content">
                <nav className="sidebar-keep">
                    <NavLink 
                        className={({ isActive }) => "sidebar-keep-item" + (isActive ? " active" : "")} 
                        to="/note/noteList">
                        <span className="material-icons">note</span> Notes
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => "sidebar-keep-item" + (isActive ? " active" : "")} 
                        to="/note/reminders">
                        <span className="material-icons">notifications</span> Reminders
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => "sidebar-keep-item" + (isActive ? " active" : "")} 
                        to="/note/editLabels">
                        <span className="material-icons">edit</span> Edit Labels
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => "sidebar-keep-item" + (isActive ? " active" : "")} 
                        to="/note/archives">
                        <span className="material-icons">archive</span> Archives
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => "sidebar-keep-item" + (isActive ? " active" : "")} 
                        to="/note/trash">
                        <span className="material-icons">delete</span> Trash
                    </NavLink>
                </nav>
                <div className="note-list-container">
                    <Outlet context={{ notes, onRemove: removeNote, onTogglePin: togglePinNote, onDuplicate: duplicateNote }} />
                </div>
            </div>
        </section>
    )
}
