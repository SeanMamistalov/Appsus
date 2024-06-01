export function ColorPicker({ noteId, onSetColor, currentColor, closeColorPicker }) {
    const colors = ['#fff',
        '#ffb4b4',
        '#b4ffe0',
        '#b4b7ff',
        '#f9b4ff',
        '#c0e794',
        '#91c6f0']

    function handleSetColor(color) {
        onSetColor(noteId, color)
        closeColorPicker()
    }

    return (
        <section className="color-option">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${currentColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleSetColor(color)}
                    />
                ))}
            </div>
            <button onClick={closeColorPicker}>Close</button>
        </section>
    )
}
