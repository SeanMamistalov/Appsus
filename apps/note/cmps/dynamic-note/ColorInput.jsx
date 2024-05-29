const { useState } = React

export function ColorPicker({ noteId, onSetColor, currentColor }) {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const colors = ['#fff', '#ffb4b4', '#b4ffe0', '#b4b7ff', '#f9b4ff', '#c0e794', '#91c6f0']

    function handleSetColor(color) {
        onSetColor(noteId, color)
        setShowColorPicker(false)
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
            <button onClick={() => setShowColorPicker(false)}>Close</button>
        </section>
    )
}
