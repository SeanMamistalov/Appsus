const { useState, useEffect } = React

export function SearchNote({ search, onSearch }) {
    const [searchNote, setSearchNote] = useState(search)

    useEffect(() => {
        onSearch(searchNote)
    }, [searchNote, onSearch])

    function handleChange({ target }) {
        const { name, value, type } = target
        const newValue = (type === 'number') ? +value : value

        setSearchNote(prevFilterBy => ({ ...prevFilterBy, [name]: newValue }))
    }

    return (
        <section className="note-filter">
            <input
                onChange={handleChange}
                value={searchNote.title}
                name="title"
                type="text"
                placeholder="Search..."

            />
        </section>
    )
}
