const { useState, useEffect } = React

export function SearchNote({ search, onSearch }) {
    const [filterByToEdit, setFilterByToEdit] = useState(search)

    useEffect(() => {
        onSearch(filterByToEdit)
    }, [filterByToEdit, onSearch])

    function handleChangeNote({ target }) {
        const { name, value } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return (
        <section className="note-filter">
            <div className="keep-header">
                <div className="keep-logo-header">
                    <span className="material-icons">menu</span>
                    <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" />
                    Keep
                </div>
                <div className="search-input-container">
                    <input
                        onChange={handleChangeNote}
                        value={filterByToEdit.title || ''}
                        name="title"
                        type="text"
                        placeholder="Search..."
                        className="filter-input"
                    />
                </div>
            </div>
        </section>
    )
}