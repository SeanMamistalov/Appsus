export function NoteIndex() {
    return (
        <div>
          <header>
            <span className="material-icons">menu</span>
            <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" />
          </header>
          <div className="sidebar-keep">
            <div className="sidebar-keep notes">
              <span className="material-icons">note</span> Notes
            </div>
            <div className="sidebar-keep reminder">
              <span className="material-icons">notifications</span> Reminders
            </div>
            <div className="sidebar-keep edit-labels">
              <span className="material-icons">edit</span> Edit Labels
            </div>
            <div className="sidebar-keep archive">
              <span className="material-icons">archive</span> Archives
            </div>
            <div className="sidebar-keep trash">
              <span className="material-icons">delete</span> Trash
            </div>
          </div>
        </div>
      );
}
