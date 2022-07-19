import { Link } from "react-router-dom"
import NavMenu from "./Menu"


export default function Header () {

    
    return (
        <header>
            <nav className="nav" id="navbar">
                <div className="navHeadingContainer">
                    <h1 className="navHeading">Workout Wingman</h1>
                    <span className="navHeadingPhrase">Build a better workout!</span>
                </div>
                <NavMenu />
                {/* <ul className="navList">
                    <li className="navListItem"><Link to={"/"}>Home</Link></li>
                    <li className="navListItem"><Link to={"/users"}>Profile</Link></li>
                    <li className="navListItem"><Link to={"/LOGIN"}>Login</Link></li>
                </ul> */}
            </nav>
        </header>
    )
}
