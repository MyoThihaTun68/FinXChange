import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

const AnimatedNavLink = ({ to, children, getNavLinkClass }) => {
  // 1. Create a ref for the underline element
  const underlineRef = useRef(null);

  // 2. GSAP animation for when the mouse enters
  const handleMouseEnter = () => {
    // Animate the underline's scaleX from 0 to 1
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // 3. GSAP animation for when the mouse leaves
  const handleMouseLeave = () => {
    // Animate the underline's scaleX back to 0
    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    // 4. The list item will handle the hover events. 'relative' is crucial for positioning the underline.
    <li 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink to={to} className={getNavLinkClass}>
        {children}
      </NavLink>
      {/* 5. This is the underline. It's positioned absolutely at the bottom. */}
      {/* It starts with a scale-x of 0 (invisible) and its origin is set to the left. */}
      <span
        ref={underlineRef}
        className="absolute bottom-[-4px] left-0 h-[2px] w-full text-white bg-cyan-400 transform scale-x-0 origin-left"
      />
    </li>
  );
};

export default AnimatedNavLink;