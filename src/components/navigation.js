import React, { useState, useRef } from 'react';
import './styles/navigation.css';
import './styles/home.css';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { Tooltip, Fade, Zoom } from '@mui/material';
import { Link } from '@mui/material';

const navLinkStyles = {
	link: {
		color: 'var(--primary-color-light)',
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

const NavbarSmall = () => {

	// tooltip states
	const [tooltipOpen, setTooltipOpen] = useState({
		font: false,
		resume: false,
		linkedin: false,
		github: false,
		email: false,
	});

	const timeouts = useRef({});

	// tooltip handlers
	const handleMouseEnter = (key) => {
		timeouts.current[key] = setTimeout(() => {
			setTooltipOpen((prev) => ({...prev, [key]: true}));
		}, 200);
	}

	const handleMouseLeave = (key) => {
		clearTimeout(timeouts.current[key]);
		setTooltipOpen((prev) => ({...prev, [key]: false}));
	}
	return (
		<ul className="navigation-list_small">

			<li className="navigation_link">
			<Tooltip title="Resume" placement="bottom" open={tooltipOpen.resume} TransitionComponent={Zoom}
				componentsProps={{
					tooltip: { sx: { backgroundColor: 'var(--primary-color-dark)', fontFamily: 'var(--current-font)', fontSize: '14px'}}}}>
				<IconButton component="a" href="/documents/RodriguezNelson.pdf" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('resume')}
					onMouseLeave={() => handleMouseLeave('resume')}>
					<DescriptionIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</Tooltip>
			</li>

			<li className="navigation_item">
			<Tooltip title="LinkedIn" placement="bottom" open={tooltipOpen.linkedin} TransitionComponent={Zoom}
				componentsProps={{
					tooltip: { sx: { backgroundColor: 'var(--primary-color-dark)', fontFamily: 'var(--current-font)', fontSize: '14px'}}}}>
				<IconButton component={Link} href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('linkedin')}
					onMouseLeave={() => handleMouseLeave('linkedin')}>
					<LinkedInIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</Tooltip>	
			</li>

			<li className="navigation_item">
			<Tooltip title="GitHub" TransitionComponent={Zoom} open={tooltipOpen.github} componentsProps={{
                        tooltip: { sx: { backgroundColor: 'var(--primary-color-dark)', fontFamily: 'var(--current-font)', fontSize: '14px'}}}} placement="bottom">
				<IconButton component={Link} href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('github')}
					onMouseLeave={() => handleMouseLeave('github')}>
					<GitHubIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</Tooltip>
			</li>

			<li className="navigation_item">
			<Tooltip title="Email" placement="bottom" TransitionComponent={Zoom} open={tooltipOpen.email}
				componentsProps={{
					tooltip: { sx: { backgroundColor: 'var(--primary-color-dark)', fontFamily: 'var(--current-font)', fontSize: '14px'}}}}>
			<IconButton component={Link} href="mailto: neroxv1313@gmail.com" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}
				onMouseEnter={() => handleMouseEnter('email')}
				onMouseLeave={() => handleMouseLeave('email')}>
				<EmailIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</Tooltip>
			</li>
		</ul>
	)
}

export { NavbarSmall };