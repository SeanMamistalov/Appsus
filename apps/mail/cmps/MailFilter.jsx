export function EmailFilter({ searchQuery, onSearchQueryChange, toggleSidebar }) {
  const handleChange = (event) => {
    const { value } = event.target;
    onSearchQueryChange(value);
  };

  return (
    <header className="mail-header">
      <span className="material-icons menu-icon" onClick={toggleSidebar}>menu</span>
      <img className="gmail-logo" src="assets/img/gmail_logo.png" alt="gmail-logo" />
      <div className="input-container">
      <i className="fas fa-search search-icon"></i>
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search mails..."
        />
      </div>
      <img className="user-img" src="assets/img/sean-logo.jpg" alt="" />
    </header>

  );
}
