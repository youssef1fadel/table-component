import React from 'react'
import { Box, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material'
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
	borderRadius?: number
	containerBgColor?: string
	borderColor?: string
	textColor?: string
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
	borderColor = '#E9EAEB',
	textColor = '#717680',
}: TabSliderProps) {
	// Convert the tab onChange signature to match ToggleButtonGroup's
	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newValue: number | string | null
	) => {
		if (newValue !== null) {
			onChange(event as React.SyntheticEvent, Number(newValue))
		}
	}

	const handleToggleIgnore = (
		event: React.MouseEvent<HTMLElement>,
		tabValue: number | string
	) => {
		event.stopPropagation(); // Prevent tab selection when clicking the eye icon
		if (onToggleIgnore) {
			onToggleIgnore(tabValue);
		}
	}

	return (
		<Box>
			<ToggleButtonGroup
				value={activeIndex}
				exclusive
				onChange={handleChange}
				aria-label="selector"
				size="small"
				sx={{
					display: 'inline-flex',
					bgcolor: containerBgColor,
					borderRadius: '8px',
					p: '2px',
					border: `1px solid ${borderColor}`,
					overflow: 'hidden',
					'& .MuiToggleButtonGroup-grouped': {
						border: `1px solid ${borderColor}`,
						m: '2px',
						borderRadius: 2,
						minHeight: height,
						height: height,
						textTransform: 'none',
						transition: `background-color ${transitionDuration}, color ${transitionDuration}`,
						color: textColor,
						fontWeight: 'bold',
						px: 2,
						'&.Mui-selected': {
							bgcolor: color,
							color: '#fff',
							'&:hover': {
								bgcolor: color,
								opacity: 0.9,
							},
						},
						'&:hover': {
							bgcolor: 'rgba(0, 0, 0, 0.04)',
						},
						'&.ignored': {
							opacity: 0.6,
							textDecoration: 'line-through',
						},
					},
				}}
			>
				{tabs.map((tab) => (
					<ToggleButton
						key={tab.value}
						value={tab.value}
						className={tab.ignored ? 'ignored' : ''}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							{onToggleIgnore && (
								<IconButton
									size="small"
									onClick={(e) => handleToggleIgnore(e, tab.value)}
									sx={{
										ml: 1,
										p: 0.5,
										color: 'inherit',
										opacity: 0.7,
										'&:hover': {
											opacity: 1,
											bgcolor: 'transparent',
										},
									}}
								>
									{tab.ignored ? (
										<VisibilityOffIcon fontSize="small" />
									) : (
										<VisibilityIcon fontSize="small" />
									)}
								</IconButton>
							)}
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{tab.label}
								{tab.units !== undefined && (
									<Box
										component="span"
										sx={{
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											ml: 1,
											backgroundColor: 'rgba(255, 255, 255, 0.85)',
											color: '#333',
											borderRadius: '20px',
											fontSize: '0.75rem',
											fontWeight: 'bold',
											padding: '2 8px',
											minWidth: '20px',
											height: '20px',
											transition: `background-color ${transitionDuration}`,
											'.Mui-selected &': {
												backgroundColor: 'rgba(255, 255, 255, 0.85)',
												color: color,
											},
										}}
									>
										{tab.units}
									</Box>
								)}
							</Box>
						</Box>
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	)
}
