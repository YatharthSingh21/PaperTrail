import './NavBar.css';
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { Link, useNavigate } from 'react-router';

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // ✅ check login state

    function handlePublishClick() {
        if (user) {
            navigate("/publish"); // logged in → go to publish
        } else {
            navigate("/login");   // not logged in → go to login
        }
    }

    return (
        <nav>
            <div className="Nav">
                <Link to="/"><img id="logo" src={logo} /></Link>
                
                <form id="search">
                    <input type="text" placeholder="Search this!" />
                    <button type="submit">Search</button>
                </form>

                <div className="buttons">
                    <button 
                        id="WriteButton" 
                        className="write-combo" 
                        onClick={handlePublishClick}
                    >
                        <i className="fas fa-feather-alt"></i>
                        <span>Publish</span>
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
