export function ColorInput({ onSetFooterStyle, backgroundColor }) {
    const colors = [
        '#fff', '#ffb4b4', '#b4ffe0', '#b4b7ff', '#f9b4ff',
        '#c0e794', '#91c6f0'
    ];

    function onSetColor(color) {
        const newStyle = { backgroundColor: color }
        onSetFooterStyle(newStyle)
    }

    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}