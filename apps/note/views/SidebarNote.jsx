const { useState } = React

export function SidebarNote({ onFilter }) {
    const [activeFilter, setActiveFilter] = useState('notes')

    function handleFilterClick(filter) {
        setActiveFilter(filter)
        onFilter(filter)
    }

    return (
        <div className="sidebar-keep">
            <header>
                <span className="material-icons">menu</span>
                <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" /> Keep
            </header>
            <div
                className={`sidebar-keep-item ${activeFilter === 'notes' ? 'active' : ''}`}
                onClick={() => handleFilterClick('notes')}
            >
                <span className="material-icons">note</span> Notes
            </div>
            <div
                className={`sidebar-keep-item ${activeFilter === 'reminder' ? 'active' : ''}`}
                onClick={() => handleFilterClick('reminder')}
            >
                <span className="material-icons">notifications</span> Reminders
            </div>
            <div
                className={`sidebar-keep-item ${activeFilter === 'edit-labels' ? 'active' : ''}`}
                onClick={() => handleFilterClick('edit-labels')}
            >
                <span className="material-icons">edit</span> Edit Labels
            </div>
            <div
                className={`sidebar-keep-item ${activeFilter === 'archive' ? 'active' : ''}`}
                onClick={() => handleFilterClick('archive')}
            >
                <span className="material-icons">archive</span> Archives
            </div>
            <div
                className={`sidebar-keep-item ${activeFilter === 'trash' ? 'active' : ''}`}
                onClick={() => handleFilterClick('trash')}
            >
                <span className="material-icons">delete</span> Trash
            </div>
        </div>
    )
}
