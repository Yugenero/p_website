import { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { Tooltip, Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import '../styles/navigation.css';
import '../styles/home.css';

const NavbarText = () => {
	return (
		<ul className="navigation-list">
			<li className="nav-link-li"> 
				<a className="nav-link" href="/documents/NelsonRodriguez2025.pdf" target="_blank" rel="noopener noreferrer"> 00. Resume </a>
			</li>
			<li className="nav-link-li">
				<a className="nav-link" href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer" > 01. LinkedIn </a>
			</li>
			<li className="nav-link-li">
				<a className='nav-link' href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer">  10. GitHub </a>
			</li>
			<li className="nav-link-li">
				<a className="nav-link" href="mailto: neroxv1313@gmail.com" target="_blank" rel="noopener noreferrer"> 11. Email </a>
			</li>
		</ul>
	)
}

const NavbarIcon = () => {
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
		<ul className="navigation-list">
			<li className="navigation_link">
			<NavTooltip title="Resume" placement="bottom" open={tooltipOpen.resume} TransitionComponent={Zoom}>
				<IconButton component="a" href="/documents/NelsonRodriguez2025.pdf" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('resume')}
					onMouseLeave={() => handleMouseLeave('resume')}>
					<DescriptionIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</NavTooltip>
			</li>

			<li className="navigation_item">
			<NavTooltip title="LinkedIn" placement="bottom" open={tooltipOpen.linkedin} TransitionComponent={Zoom}>
				<IconButton component={Link} href="https://www.linkedin.com/in/nelson-rodriguez13/" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('linkedin')}
					onMouseLeave={() => handleMouseLeave('linkedin')}>
					<LinkedInIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</NavTooltip>	
			</li>

			<li className="navigation_item">
			<NavTooltip title="GitHub" TransitionComponent={Zoom} open={tooltipOpen.github} placement="bottom">
				<IconButton component={Link} href="https://github.com/Yugenero" target="_blank" rel="noopener noreferrer"
					sx={navLinkStyles.link}
					onMouseEnter={() => handleMouseEnter('github')}
					onMouseLeave={() => handleMouseLeave('github')}>
					<GitHubIcon sx={navLinkStyles.iconFooter} />
				</IconButton>
			</NavTooltip>
			</li>

			<li className="navigation_item">
			<NavTooltip title="Email" placement="bottom" TransitionComponent={Zoom} open={tooltipOpen.email}>
			<IconButton component={Link} href="mailto: neroxv1313@gmail.com" target="_blank" rel="noopener noreferrer"
				sx={navLinkStyles.link}
				onMouseEnter={() => handleMouseEnter('email')}
				onMouseLeave={() => handleMouseLeave('email')}>
				<EmailIcon sx={navLinkStyles.iconFooter} />
			</IconButton>
			</NavTooltip>
			</li>
		</ul>
	)
}

const NavTooltip = styled(Tooltip)(({ theme }) => ({
	'& .MuiTooltip-tooltip': {
		backgroundColor:
			theme.palette.mode === 'dark'
				? theme.palette.background.default
				: theme.palette.background.paper,
		color: theme.palette.text.primary,
		fontFamily: theme.typography.fontFamily,
		fontSize: '0.85rem',
		padding: theme.spacing(1, 1.5),
		borderRadius: '0.6rem',
		boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
	},
	'& .MuiTooltip-arrow': {
		color:
			theme.palette.mode === 'dark'
				? theme.palette.background.default
				: theme.palette.background.paper,
	},
}));

const navLinkStyles = {
	link: {
		fontSize: '0.8em',
		color: 'var(--primary-color-light)',
		transition: '0.2s',
		'&:hover': {
		color: 'var(--white)',
		transform: 'scale(0.9)',
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

export { NavbarText, NavbarIcon };
