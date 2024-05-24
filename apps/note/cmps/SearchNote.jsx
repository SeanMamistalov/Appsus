const { useState, useEffect } = React


export function SearchNote({ search, onSearch }) {
    const [searchNote, setSearchNote] = useState(search)

    useEffect(() => {
        onSearch(searchNote)
    }, [searchNote, onSearch])

    function handleChange({ target }) {
        const { name, value, type } = target
        const newValue = type === 'number' ? +value : value

        setSearchNote((prevFilterBy) => ({ ...prevFilterBy, [name]: newValue }))
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
                        onChange={handleChange}
                        value={searchNote.title}
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


