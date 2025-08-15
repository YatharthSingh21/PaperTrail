import './NavBar.css';
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.css';

function NavBar() {
    return (
        <nav>
            <div className="Nav">
                <img id="logo" src={logo}/>
                <form id="search">
                    <input type="text" placeholder="Search this!" />
                    <button type="submit">Search</button>
                </form>

                <div className="buttons">
                    <button id="WriteButton" className="write-combo">
                    <i className="fas fa-feather-alt"></i>
                    <span>Publish</span>  {/* For writing platforms */}
                    </button>
                    <button id="ProfileButton">
                        <i className="fas fa-user-circle"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;