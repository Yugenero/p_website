import React, { createContext, useState, useEffect } from 'react';


const FontContext = createContext();
const fontFamilies = [
	/* Technical font famlies */
	'var(--font-family-ibm-plex-mono)',
	'var(--font-family-geist)', 
	'var(--font-family-inter)',
];

const FontProvider = ({ children }) => {
  const [fontIndex, setFontIndex] = useState(0);

  const changeFont = () => {
    setFontIndex((prevIndex) => (prevIndex + 1) % fontFamilies.length);
  };

  const fontFamily = fontFamilies[fontIndex];
  useEffect(() => {
    document.documentElement.style.setProperty('--current-font', fontFamily);
  }, [fontFamily]);

  return (
    <FontContext.Provider value={{ fontFamily, changeFont }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider };