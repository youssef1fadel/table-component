import React from 'react'
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material'

type TabOption = {
	label: string
	value: number | string
}

type TabSliderProps = {
	tabs: TabOption[]
	activeIndex: number
	onChange: (event: React.SyntheticEvent, newValue: number) => void
	color?: string
	height?: number
	transitionDuration?: string
	borderRadius?: number
	containerBgColor?: string
}

export default function TabSlider({
	tabs,
	activeIndex,
	onChange,
	color = '#1976d2',
	height = 36,
	transitionDuration = '0.3s',
	borderRadius = 4,
	containerBgColor = '#f7f7f7',
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
					borderRadius: 2,
					p: 0.5,
					mb: 2,
					boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
					'& .MuiToggleButtonGroup-grouped': {
						border: 0,
						borderRadius: `${borderRadius}px !important`,
						minHeight: height,
						height: height,
						textTransform: 'none',
						transition: `background-color ${transitionDuration}, color ${transitionDuration}`,
						color: 'text.primary',
						fontWeight: 'medium',
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
					},
				}}
			>
				{tabs.map((tab) => (
					<ToggleButton key={tab.value} value={tab.value}>
						{tab.label}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	)
}
