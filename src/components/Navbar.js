import {  NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <NavLink className={"homeBtn"} to="/">Home</NavLink>
                <NavLink to="/useless_page">Useless Page</NavLink> 
             
            </div>
        </header>
    )
}
export default Navbar 