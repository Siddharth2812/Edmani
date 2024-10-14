import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpeg';
// import contactImg from '../../assets/contact.png';
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className="navbar">
            <a href='/'><img src={logo} alt="Logo" className='logo'/></a>
            <div className="desktopMenu">
                <a href='/' style={{textDecoration:'none', color:'#aaa', paddingLeft:'1rem', fontSize:'1.2rem'}} className='option'>Home</a>
                <a href='/services'style={{textDecoration:'none', color:'#aaa', paddingLeft:'1rem', fontSize:'1.2rem'}} className='option'>Services</a>
                <a href='/login' style={{textDecoration:'none', color:'#aaa', paddingLeft:'1rem', fontSize:'1.2rem'}} className='option'>Profile</a>
                <a href='/login' style={{textDecoration:'none', color:'#aaa', paddingLeft:'1rem', fontSize:'1.2rem'}} className='option'>Conduct Games/Sports</a>
                <a href='/login' style={{textDecoration:'none', color:'#aaa', paddingLeft:'1rem', paddingRight:'1rem', fontSize:'1.2rem'}} className='option'>Conduct Hackathons</a>
            </div>
            {/* <button className="desktopMenuBtn" onClick={() => {
                document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
            }}>
                <img src={contactImg} alt="" className="desktopMenuImg" />Contact Me</button> */}
            
            <img src={menu} alt="Menu" className='mobMenu' onClick={()=>setShowMenu(!showMenu)}/>
            <div className="navMenu" style={{display: showMenu? 'flex':'none'}}>
                <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Home</Link>
                <Link activeClass='active' to='skills' spy={true} smooth={true} offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Services</Link>
                <Link activeClass='active' to='works' spy={true} smooth={true} offset={-50} duration={500} className="listItem" onClick={()=>setShowMenu(false)}>Profile</Link>
            </div>
        </nav>
    )
}




export default Navbar;