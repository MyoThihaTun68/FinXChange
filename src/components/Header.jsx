import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import logo from '../assets/icons/logo.svg';

const Header = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pillRef = useRef(null);
  const linkRefs = useRef([]);
  const location = useLocation();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    const link = linkRefs.current[index];
    if (link) {
      gsap.to(pillRef.current, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/news', text: 'News' },
    { to: '/currencies', text: 'Currencies' },
  ];
  const activeIndex = navLinks.findIndex(link => link.to === location.pathname);

  useEffect(() => {
    if (activeIndex !== -1) {
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink) {
        gsap.set(pillRef.current, {
          x: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        });
      }
    }
  }, [activeIndex, location.pathname]); // Added location.pathname to dependencies

  // When the mouse leaves the entire nav, reset the hover index to null
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    // Animate the pill back to the active link's position
    if (activeIndex !== -1) {
        handleMouseEnter(activeIndex);
    }
  };

  return (
    <header className="flex justify-center p-4">
      <nav className="bg-[#1A1B23] w-full max-w-4xl flex items-center justify-between p-3 px-6 rounded-full">
        <a href="/" className="flex items-center text-white gap-3" >
          <img src={logo} alt="FinXChange Logo" className="h-8 w-8" />
          <span className="text-white text-2xl font-bold">
            FinX<span className="text-cyan-400">Change</span>
          </span>
        </a>
        
        <ul 
          className="relative flex items-center gap-8 text-lg font-medium"
          onMouseLeave={handleMouseLeave} 
        >
          <div 
            ref={pillRef}
            className="absolute left-0 top-0 h-full bg-cyan-500/20 rounded-full"
            style={{ zIndex: 0 }}
          />
          
          {navLinks.map((link, index) => (
            <li 
              key={link.to}
              ref={el => linkRefs.current[index] = el}
              onMouseEnter={() => handleMouseEnter(index)}
              style={{ zIndex: 1 }}
            >
              <NavLink 
                to={link.to} 
                // --- THIS IS THE ONLY LINE THAT CHANGED ---
                className={({ isActive }) => 
                  `block text-white navtext py-1 px-3 transition-colors duration-300`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;