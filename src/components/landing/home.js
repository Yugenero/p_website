import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Intro } from './intro';

const serifFonts = [
  {
    label: 'Junicode',
    fontFamily: '"Junicode", "Times New Roman", Times, serif',
  },
  {
    label: 'Crimson Pro',
    fontFamily: '"Crimson Pro", "Times New Roman", Times, serif',
  },
  {
    label: 'Baskerville',
    fontFamily: 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
  },
  {
    label: 'Georgia',
    fontFamily: 'Georgia, "Times New Roman", serif',
  },
  {
    label: 'Palatino',
    fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", serif',
  },
  {
    label: 'Garamond',
    fontFamily: 'Garamond, "Times New Roman", serif',
  },
  {
    label: 'Didot',
    fontFamily: 'Didot, "Bodoni MT", "Times New Roman", serif',
  },
  {
    label: 'Cambria',
    fontFamily: 'Cambria, "Times New Roman", serif',
  },
  {
    label: 'Iowan Old Style',
    fontFamily: '"Iowan Old Style", "Palatino Linotype", "Times New Roman", serif',
  },
  {
    label: 'Bookman',
    fontFamily: '"Bookman Old Style", Bookman, "Times New Roman", serif',
  },
  {
    label: 'Constantia',
    fontFamily: 'Constantia, "Times New Roman", serif',
  },
  {
    label: 'Bodoni MT',
    fontFamily: '"Bodoni MT", Didot, "Times New Roman", serif',
  },
];

const Home = () => {
	const [fontIndex, setFontIndex] = useState(0);

	const handleCycleFont = () => {
		setFontIndex((currentIndex) => (currentIndex + 1) % serifFonts.length);
	};

	return (
		<div>
			<Box sx={{ px: 3, pt: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
				<Button variant="outlined" size="small" onClick={handleCycleFont}>
					Cycle Serif
				</Button>
				<Typography variant="body2">Current: {serifFonts[fontIndex].label}</Typography>
			</Box>
			<Intro nameFontFamily={serifFonts[fontIndex].fontFamily} />
		</div>
	)
}

export default Home;
