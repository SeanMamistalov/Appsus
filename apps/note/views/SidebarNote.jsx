export function SidebarNote({ onFilter }){
    return (
<div>
            <header>
                <span className="material-icons">menu</span>
                <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" />
            </header>
            <div className="sidebar-keep">
                <div className="sidebar-keep notes" onClick={() => onFilter('notes')}>
                    <span className="material-icons">note</span> Notes
                </div>
                <div className="sidebar-keep reminder" onClick={() => onFilter('reminder')}>
                    <span className="material-icons">notifications</span> Reminders
                </div>
                <div className="sidebar-keep edit-labels" onClick={() => onFilter('edit-labels')}>
                    <span className="material-icons">edit</span> Edit Labels
                </div>
                <div className="sidebar-keep archive" onClick={() => onFilter('archive')}>
                    <span className="material-icons">archive</span> Archives
                </div>
                <div className="sidebar-keep trash" onClick={() => onFilter('trash')}>
                    <span className="material-icons">delete</span> Trash
                </div>
            </div>
        </div>
      )
}