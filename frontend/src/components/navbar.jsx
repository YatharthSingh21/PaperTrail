import './NavBar.css';
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { Link, useNavigate } from 'react-router';

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    function handlePublishCheck() {
        if (user) {
            navigate("/publish");
        } else {
            navigate("/login"); 
        }
    }

    function handleProfileCheck() {
        if (user) {
            navigate(`/profile/${user._id}`);
        } else {
            navigate("/login");
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
                        onClick={handlePublishCheck}
                    >
                        <i className="fas fa-feather-alt"></i>
                        <span>Publish</span>
                    </button>

                    <button id="ProfileButton" onClick={handleProfileCheck}>
                        <i className="fas fa-user-circle"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
