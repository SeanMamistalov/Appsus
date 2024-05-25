const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { SidebarNote } from './SidebarNote.jsx'
import { SearchNote } from '../cmps/SearchNote.jsx'

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
                showSuccessMsg(`Note ${noteId} removed successfully!`)
            })
            .catch(err => {
                showErrorMsg('Failed to remove note')
            })
    }

    function togglePinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                setNotes(prevNotes => {
                    const updatedNotes = prevNotes.map(note => {
                        if (note.id === noteId) note.isPinned = !note.isPinned
                        return note
                    })
                    updatedNotes.sort((a, b) => a.isPinned - b.isPinned)
                    return updatedNotes
                })
                showSuccessMsg(`Note ${noteId} pin status updated successfully!`)
            })
            .catch(err => {
                showErrorMsg('Failed to update pin status')
            })
    }
    
    return (
        <section className="note-index-container">
            <div className="search-note-container">
                <SearchNote search={filterBy} onSearch={setFilterBy} />
            </div>
            <div className="content-container">
                <SidebarNote onFilter={setFilterBy} />
                <div className="note-list-container">
                    <NoteList notes={notes} onRemove={removeNote} onTogglePin={togglePinNote} />
                </div>
            </div>
        </section>
    )
}