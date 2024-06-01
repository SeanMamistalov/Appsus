export function EmailFilter({ searchQuery, onSearchQueryChange }) {
  const handleChange = (event) => {
    const { value } = event.target;
    onSearchQueryChange(value);
  };

  return (
    <form>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search mails..."
      />
    </form>
  );
}
