import React from 'react'
import { Box, Tabs, Tab, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

type TabOption = {
	label: string
	value: number | string
	units?: number
	ignored?: boolean
}

type TabSliderProps = {
	tabs: TabOption[]
	activeIndex: number
	onChange: (event: React.SyntheticEvent, newValue: number) => void
	onToggleIgnore?: (tabValue: number | string) => void
	color?: string
	height?: number
	transitionDuration?: string
	containerBgColor?: string
	textColor?: string
	indicatorColor?: string
	// Add new color props with defaults
	badgeDefaultBgColor?: string
	badgeDefaultTextColor?: string
	badgeSelectedBgColor?: string
}

export default function TabSlider({
	tabs,
	activeIndex,
	onChange,
	onToggleIgnore,
	color = '#015C9A',
	height = 36,
	transitionDuration = '0.1s',
	containerBgColor = 'transparent',
	textColor = '#717680',
	indicatorColor = '#015C9A',
	// Add new color params with defaults
	badgeDefaultBgColor = 'rgba(234, 234, 234, 0.85)',
	badgeDefaultTextColor = '#444',
	badgeSelectedBgColor = 'rgba(1, 92, 154, 0.15)',
}: TabSliderProps) {
	// Handle tab change
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		onChange(_event, newValue)
	}

	// Handle toggle ignore
	const handleToggleIgnore = (
		event: React.MouseEvent<HTMLElement>,
		tabValue: number | string
	) => {
		event.stopPropagation() // Prevent tab selection when clicking the eye icon
		if (onToggleIgnore) {
			onToggleIgnore(tabValue)
		}
	}

	// Extract tab styles to improve readability
	const tabStyles = {
		color: textColor,
		fontWeight: 'medium',
		textTransform: 'none',
		borderRadius: '8px 8px 0px 0px',
		minHeight: height,
		height: height,
		transition: `color ${transitionDuration}`,
		opacity: 1,
		padding: '0 8px',
		'&.Mui-selected': {
			color,
			fontWeight: 'bold',
		},
		'&.ignored': {
			opacity: 0.6,
			textDecoration: 'line-through',
		},
	}

	// Extract badge styles
	const badgeStyles = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		ml: 1,
		backgroundColor: badgeDefaultBgColor,
		borderRadius: '20px',
		color: badgeDefaultTextColor,
		fontSize: '0.75rem',
		fontWeight: 'bold',
		padding: '2 8px',
		minWidth: '20px',
		height: '20px',
		transition: `background-color ${transitionDuration}`,
		'.Mui-selected &': {
			color: color,
			backgroundColor: badgeSelectedBgColor,
		},
	}

	// Extract icon button styles
	const iconButtonStyles = {
		color: 'inherit',
		opacity: 0.7,
    ml: '-4px',
		'&:hover': {
			opacity: 1,
			bgcolor: 'transparent',
		},
	}

	return (
		<Box sx={{ bgcolor: containerBgColor }}>
			<Tabs
				value={activeIndex}
				onChange={handleChange}
				aria-label="basic tabs"
				textColor="inherit"
				TabIndicatorProps={{
					style: { backgroundColor: indicatorColor },
				}}
				sx={{
					minHeight: height,
					'& .MuiTab-root': tabStyles,
				}}
			>
				{tabs.map((tab) => (
					<Tab
						key={tab.value}
						value={Number(tab.value)}
						className={tab.ignored ? 'ignored' : ''}
						label={
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{onToggleIgnore && (
									<IconButton
										size="small"
										onClick={(e) => handleToggleIgnore(e, tab.value)}
										sx={iconButtonStyles}
									>
										{tab.ignored ? (
											<VisibilityOffIcon fontSize="small" />
										) : (
											<VisibilityIcon fontSize="small" />
										)}
									</IconButton>
								)}
								{tab.label}
								{tab.units !== undefined && (
									<Box component="span" sx={badgeStyles}>
										{tab.units}
									</Box>
								)}
							</Box>
						}
					/>
				))}
			</Tabs>
		</Box>
	)
}
