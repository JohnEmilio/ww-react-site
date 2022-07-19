import { slide as Menu } from 'react-burger-menu'

export default function NavMenu() {
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/users">Profile</a>
        <a id="contact" className="menu-item" href="/login">Login</a>
      </Menu>
    );
}