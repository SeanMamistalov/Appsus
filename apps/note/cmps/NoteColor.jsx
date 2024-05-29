const { useState } = React

import { ColorPicker } from "./dynamic-note/ColorInput.jsx"

export function NoteColor() {
    const [cmpType, setCmpType] = useState('color')

    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#101010',
    })

    function onSetFooterStyle(newStyle) {
        setFooterStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
    }

    return (
        <footer style={footerStyle} className="app-footer full content-grid" >
            <section>
                <DynamicCmp  {...footerStyle} cmpType={cmpType} name="Puki" onSetFooterStyle={onSetFooterStyle} />

                <select onChange={(ev) => setCmpType(ev.target.value)}>
                    <option value="color">Color</option>
                </select>
            </section>
        </footer>
    )
}

function DynamicCmp(props) {

    switch (props.cmpType) {
        case 'color':
            return <ColorPicker {...props} />
    }
}



