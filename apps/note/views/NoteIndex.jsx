const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { SidebarNote } from './SidebarNote.jsx'

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

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

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

    return (
        <section>
            {/* <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} /> */}
            <SidebarNote onFilter={onSetFilterBy}/>
            <NoteList notes={notes} onRemove={removeNote} />
        </section>
    )
}
