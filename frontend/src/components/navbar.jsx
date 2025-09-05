import { useState } from "react";
import { useNavigate, Link } from "react-router";
import './NavBar.css';
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.css';

function NavBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    }

    function handlePublishCheck() {
        if (user) navigate("/publish");
        else navigate("/login"); 
    }

    function handleProfileCheck() {
        if (user) navigate(`/profile/${user._id}`);
        else navigate("/login");
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
        } else {
            navigate("/"); // reset to homepage if empty
        }
    }

    return (
        <nav>
            <div className="Nav">
                <Link to="/"><img id="logo" src={logo} alt="Logo" /></Link>
                
                {/* Search */}
                <form id="search" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search this!" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                {/* Buttons */}
                <div className="buttons">
                    <button id="WriteButton" className="write-combo" onClick={handlePublishCheck}>
                        <i className="fas fa-feather-alt"></i>
                        <span>Publish</span>
                    </button>

                    {user ? (
                        <>
                            <button id="ProfileButton" onClick={handleProfileCheck}>
                                <i className="fas fa-user-circle"></i>
                            </button>
                            <button id="LogoutButton" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </>
                    ) : (
                        <button id="LoginButton" onClick={() => navigate("/login")}>
                            <i className="fas fa-sign-in-alt"></i> Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
