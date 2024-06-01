
export function EmailFilter({ searchQuery, onSearchQueryChange, toggleSidebar }) {
  const handleChange = (event) => {
    const { value } = event.target;
    onSearchQueryChange(value);
  };

  return (
    <form className="email-filter">
      <span className="material-icons menu-icon" onClick={toggleSidebar}>menu</span>
      <img className="gmail-logo" src="assets/img/gmail_logo.png" alt="gmail-logo" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search mails..."
        className="search-input"
      />
    </form>
  );
}