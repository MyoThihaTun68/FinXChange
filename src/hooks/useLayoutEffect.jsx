import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap'; // Import the GSAP library

const MyAnimatedComponent = () => {
  // 1. Create a ref for the main container you want to animate
  const comp = useRef(null); 

  // 2. Use the useLayoutEffect hook
  useLayoutEffect(() => {
    // 3. Create a GSAP "context" for safe cleanup
    let ctx = gsap.context(() => {

      // --- YOUR ANIMATION CODE GOES HERE ---
      // For example, fade in all child elements with a specific class
      gsap.from(".box", { 
        opacity: 0, 
        y: 50, 
        stagger: 0.2 
      });

    }, comp); // <-- Pass the ref to scope the animations

    // 4. Cleanup function
    return () => ctx.revert(); 
    
  }, []); // <-- Empty dependency array means it runs once on mount

  // 5. Attach the ref to your component's JSX
  return (
    <div ref={comp}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  );
};