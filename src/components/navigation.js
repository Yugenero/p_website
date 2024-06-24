import React from 'react';
import './styles/navigation.css';
import './styles/home.css';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Button, Typography} from '@mui/material';
import { Link } from '@mui/material';

const navLinkStyles = {
	link: {
		color: 'var(--primary-color)',
		transition: '0.2s',
		'&:hover': {
		color: 'var(--white)',
		transform: 'scale(1.2)',
		},
	}, 
	icon: {
		width: '40px',
		height: '40px',
	},
	iconFooter: {
		width: '30px',
		height: '30px',
	},
	
};

const Navbar = () => {

	return (
		<nav className="navigation">
		<ul className="navigation-list">
			<li className="navigation_link">
			<IconButton component="a" href="/documents/Rodriguez2024Q3.pdf" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<DescriptionIcon sx={navLinkStyles.icon} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<LinkedInIcon sx={navLinkStyles.icon} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<GitHubIcon sx={navLinkStyles.icon} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="mailto: neroxv1313@gmail.com" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<EmailIcon sx={navLinkStyles.icon} />
			</IconButton>
			</li>
		</ul>
		</nav>
	);
};

const NavbarSmall = () => {
	return (
		<ul className="navigation-list_small">
			<li className="navigation_link">
			<IconButton component="a" href="/documents/Rodriguez2024Q3.pdf" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<DescriptionIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<LinkedInIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<GitHubIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</li>
			<li className="navigation_item">
			<IconButton component={Link} href="mailto: neroxv1313@gmail.com" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}>
				<EmailIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</li>
		</ul>
	)
}

export default Navbar;
export { NavbarSmall };