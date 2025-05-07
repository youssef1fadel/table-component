import React from 'react'
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material'

type TabOption = {
	label: string
	value: number | string
  units?: number
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
	borderColor?: string
	textColor?: string
}

export default function TabSlider({
	tabs,
	activeIndex,
	onChange,
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

	return (
		<Box ml={2}>
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
					mb: 2,
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
					},
				}}
			>
				{tabs.map((tab) => (
					<ToggleButton key={tab.value} value={tab.value}>
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
									}
								}}
							>
								{tab.units}
							</Box>
						)}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	)
}
