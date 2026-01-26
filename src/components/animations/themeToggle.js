import ButtonBase from '@mui/material/ButtonBase';
import { colors } from '../../theme';
import { alpha, keyframes, styled } from '@mui/material/styles';

const toggleGlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const ThemeToggle = styled(ButtonBase)(({ theme }) => ({
	position: 'relative',
	width: 72,
	height: 34,
	borderRadius: 999,
	border: `1px solid ${theme.palette.text.primary}`,
	padding: 3,
	// Set backgroundColor hard to white or black depending on mode, no gray
	backgroundColor: theme.palette.mode === 'light' ? colors.offWhite : '#000',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	overflow: 'hidden',
	transition: 'border-color 0.3s ease',
	'& .toggle-track': {
		position: 'absolute',
		inset: 0,
		borderRadius: 999,
		// Just hard white or black, no gradient or gray
		backgroundColor: theme.palette.mode === 'light' ? colors.offWhite : '#000',
		backgroundImage: 'none',
		animation: 'none',
		opacity: 1,
	},
	'& .toggle-thumb': {
		position: 'relative',
		zIndex: 1,
		width: 26,
		height: 26,
		borderRadius: '50%',
		backgroundColor: theme.palette.text.primary,
		color: theme.palette.mode === 'light' ? colors.offWhite : '#000',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease',
		boxShadow: `0 4px 10px ${alpha(theme.palette.text.primary, 0.25)}`,
	},
	'& .toggle-thumb svg': {
		fontSize: '1rem',
		transition: 'transform 0.4s ease',
	},
	'&[data-mode="light"] .toggle-thumb': {
		transform: 'translateX(0)',
		backgroundColor: theme.palette.text.primary,
		color: colors.offWhite,
	},
	'&[data-mode="light"] .toggle-thumb svg': {
		color: colors.offWhite,
	},
	'&[data-mode="dark"] .toggle-thumb': {
		transform: 'translateX(38px)',
		backgroundColor: theme.palette.text.primary,
		color: '#000',
	},
	'&[data-mode="dark"] .toggle-thumb svg': {
		color: '#000',
	},
	'&[data-mode="light"]:hover .toggle-thumb': {
		transform: 'translateX(0) scale(1.05)',
	},
	'&[data-mode="dark"]:hover .toggle-thumb': {
		transform: 'translateX(38px) scale(1.05)',
	},
	'&:hover .toggle-thumb svg': {
		transform: 'rotate(18deg)',
	},
	'&:focus-visible': {
		outline: `2px solid ${theme.palette.text.primary}`,
		outlineOffset: 3,
	},
}));
