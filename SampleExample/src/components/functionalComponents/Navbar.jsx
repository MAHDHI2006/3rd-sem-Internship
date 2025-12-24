function Navbar() {
    return (
        <nav>
            <h2>My Website</h2>
            <div className="dropdown"
            onMouseEnter={() => showDropdown(!dropdown)}
            onMouseLeave={() => showDropdown(!dropdown)} 
            >
                <span className="link">Learing React</span>
                {dropdown && (
                    <ol className="dropdown-menu">
                        <li>
                            <link to="/use-state" className="dropdown-link">
                            useState
                            </link>
                        </li>
                        <li>
                            <link to="/use-effect" className="dropdown-link">
                            useEffect
                            </link>
                        </li>
                        <li>
                            <link to="/props" className="dropdown-link">
                            Props
                            </link>
                        </li>
                    </ol>
                )}
            </div>
            
        </nav>
    );
}

export default Navbar;