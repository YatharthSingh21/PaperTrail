import './NavBar.css';
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router';

function NavBar() {
    return (
        <nav>
            <div className="Nav">
                <Link to="/"><img id="logo" src={logo}/></Link>
                <form id="search">
                    <input type="text" placeholder="Search this!" />
                    <button type="submit">Search</button>
                </form>

                <div className="buttons">
                    <Link to="/publish">
                        <button id="WriteButton" className="write-combo">
                        <i className="fas fa-feather-alt"></i>
                        <span>Publish</span>  {/* For writing platforms */}
                        </button>
                    </Link>
                    <button id="ProfileButton">
                        <i className="fas fa-user-circle"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;