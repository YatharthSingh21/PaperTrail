import './NavBar.css';

const logo = "https://tse1.mm.bing.net/th/id/OIP.8-irLa_PHWf6F8pQ3l13ewHaFj?pid=Api";

function NavBar() {
    return (
        <nav>
            <div className="Nav">
                <img id="logo" src={logo}/>
                <form id="search">
                    <input type="text" placeholder="Search this!" />
                    <button type="submit">Search</button>
                </form>

                <button id="WriteButton">Write</button>
                <button id="ProfileButton">Profile</button>
            </div>
        </nav>
    );
}

export default NavBar;