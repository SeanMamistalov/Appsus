// export function NoteIndex() {
//     return (
//         <div>
//           <header>
//             <span className="material-icons">menu</span>
//             <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" />
//           </header>
//           <div className="sidebar-keep">
//             <div className="sidebar-keep notes">
//               <span className="material-icons">note</span> Notes
//             </div>
//             <div className="sidebar-keep reminder">
//               <span className="material-icons">notifications</span> Reminders
//             </div>
//             <div className="sidebar-keep edit-labels">
//               <span className="material-icons">edit</span> Edit Labels
//             </div>
//             <div className="sidebar-keep archive">
//               <span className="material-icons">archive</span> Archives
//             </div>
//             <div className="sidebar-keep trash">
//               <span className="material-icons">delete</span> Trash
//             </div>
//           </div>
//         </div>
//       )
// }

const { useState, useEffect } = React
// const { useSearchParams } = ReactRouterDOM

import { noteService } from '../../note/services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
// import { NoteList } from '.../apps/note/cmps/NoteList.jsx'
// import { NoteFilter } from '../apps/note/cmps/NoteFilter.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    // useEffect(() => {
    //     setSearchParams(filterBy)
    //     noteService.query(filterBy)
    //         .then(notes => setNotes(notes))
    //         .catch(err => showErrorMsg('Failed to fetch notes'))
    // }, [filterBy, setSearchParams])

    // function onSetFilterBy(newFilter) {
    //     setFilterBy(newFilter)
    // }

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
            {/* <NoteList notes={notes} onRemove={removeNote} /> */}
        </section>
    )
}
