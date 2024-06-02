const { Link } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <header className="app-header">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h3>Appsus</h3>
            </Link>
            <nav>
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropdown-button">
                        <img src="assets/img/menu.svg" alt="More options" className="dropdown-icon" />
                    </button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/mail">Mail</Link>
                            <Link to="/note">Notes</Link>
                            <Link to="/book">Books</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
