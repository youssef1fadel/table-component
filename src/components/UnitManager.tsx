import React from 'react'
import { Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import UnitTable, { type Unit, type ColumnConfig } from './UnitTable'
import TabSlider from './TabSlider'

// Sample data for input sheet
const inputUnitData: Unit[] = [
	{
		unitId: 'M-CRWN-133-00-01',
		unitTypeCode: 'I-VILLA R',
		category: 'Villa',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-220-A4-4',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Roof Garden',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-220-C4-1',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Roof Garden',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-220-C4-3',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Roof Garden',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-221-C4-1',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Sky Garden',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-243-A4-2',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Sky Garden',
		project: 'MV The Villas',
	},
	{
		unitId: 'M-IV-A-243-C4-2',
		unitTypeCode: 'I-VILLA R',
		category: 'I-Villa Roof Garden',
		project: 'MV The Villas',
	},
]

// Sample data for output sheet 
const outputUnitData: Unit[] = [
	{
		unitId: 'O-CRWN-133-00-01',
		unitTypeCode: 'O-VILLA R',
		category: 'Villa Output',
		project: 'MV The Villas Output',
	},
	{
		unitId: 'O-IV-A-220-A4-4',
		unitTypeCode: 'O-VILLA R',
		category: 'O-Villa Roof Garden',
		project: 'MV The Villas Output',
	},
	{
		unitId: 'O-IV-A-220-C4-1',
		unitTypeCode: 'O-VILLA R',
		category: 'O-Villa Roof Garden',
		project: 'MV The Villas Output',
	},
]

// Define input tab values without hardcoding unit counts
const getInputTabs = (data: Unit[]) => [
  {
    label: 'MV4',
    value: 0,
    filter: (unit: Unit) => unit.project.includes('MV4'),
  },
  {
    label: 'Tab name',
    value: 1,
    filter: (unit: Unit) => unit.category === 'Villa',
  },
  {
    label: 'Tab1.2',
    value: 2,
    filter: (unit: Unit) => unit.category === 'I-Villa Roof Garden',
  },
  {
    label: 'Project name',
    value: 3,
    filter: (unit: Unit) => unit.project === 'MV The Villas',
  },
];

// Define output tab values without hardcoding unit counts
const getOutputTabs = (data: Unit[]) => [
  {
    label: 'Output 1',
    value: 0,
    filter: (unit: Unit) => unit.project.includes('Output'),
  },
  {
    label: 'Output 2',
    value: 1,
    filter: (unit: Unit) => unit.category === 'Villa Output',
  },
  {
    label: 'Output 3',
    value: 2,
    filter: (unit: Unit) => unit.category === 'O-Villa Roof Garden',
  },
];

// Abstract column definitions
const columnConfig: ColumnConfig[] = [
	{
		key: 'unitId',
		primaryLabel: 'Unit ID',
	},
	{
		key: 'unitTypeCode',
		primaryLabel: 'Unit Type Code',
	},
	{
		key: 'category',
		primaryLabel: 'Category',
	},
	{
		key: 'project',
		primaryLabel: 'Project',
	},
]

export default function UnitManager() {
	const [activeTab, setActiveTab] = React.useState(3)
	const [sheetType, setSheetType] = React.useState<'input' | 'output'>('input')

	// Calculate tabs with correct unit counts
	const inputTabsWithCounts = React.useMemo(() => {
		return getInputTabs(inputUnitData).map(tab => ({
			...tab,
			units: inputUnitData.filter(tab.filter).length
		}));
	}, []);

	const outputTabsWithCounts = React.useMemo(() => {
		return getOutputTabs(outputUnitData).map(tab => ({
			...tab,
			units: outputUnitData.filter(tab.filter).length
		}));
	}, []);

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleSheetTypeChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
		if (newValue !== null) {
			const type = newValue as 'input' | 'output'
			setSheetType(type)
			// Reset to first tab when switching sheet types
			setActiveTab(type === 'input' ? 3 : 0)
		}
	}

	// Get the active data and tabs based on sheet type
	const activeUnitData = sheetType === 'input' ? inputUnitData : outputUnitData
	const activeTabs = sheetType === 'input' ? inputTabsWithCounts : outputTabsWithCounts

	// Filter data based on the active tab
	const filteredData = React.useMemo(() => {
		const activeTabConfig = activeTabs.find((tab) => tab.value === activeTab)

		if (activeTabConfig && activeTabConfig.filter) {
			return activeUnitData.filter(activeTabConfig.filter)
		}

		return activeUnitData // Return all data if no filter is applied
	}, [activeTab, activeUnitData, activeTabs])

	return (
		<Box sx={{ border: '1px solid #E9EAEB', borderRadius: '8px' }}>
			<Box
				p={2}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography component="label" fontWeight={'bold'}>
					Sheet preview
					<Box
						component="span"
						sx={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '1px solid #015A9A',
							borderRadius: '20px',
							padding: '2px 8px',
							ml: 1,
							fontSize: '0.75rem',
							color: '#015A9A',
							backgroundColor: '#E5F3FE',
							textTransform: 'lowercase',
							lineHeight: 1.5,
						}}
					>
						{activeUnitData.length} unit{activeUnitData.length !== 1 ? 's' : ''}
					</Box>
				</Typography>
			</Box>

			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				px={2}
				mb={2}
			>
				<TabSlider
					tabs={activeTabs}
					activeIndex={activeTab}
					onChange={handleTabChange}
				/>

				<ToggleButtonGroup
					value={sheetType}
					exclusive
					onChange={handleSheetTypeChange}
					aria-label="sheet type selector"
					size="small"
					sx={{
						display: 'inline-flex',
						bgcolor: 'transparent',
						borderRadius: '12px',
						border: '1px solid #E9EAEB',
						overflow: 'hidden',
						'& .MuiToggleButtonGroup-grouped': {
							minHeight: 36,
							height: 36,
              border: 0,
							textTransform: 'none',
							transition: 'background-color 0.1s, color 0.1s',
							color: '#717680',
							fontWeight: 'bold',
							px: 2,
							'&.Mui-selected': {
								bgcolor: '#015C9A',
								color: '#fff',
								'&:hover': {
									bgcolor: '#015C9A',
									opacity: 0.9,
								},
							},
							'&:hover': {
								bgcolor: 'rgba(0, 0, 0, 0.04)',
							},
						},
					}}
				>
					<ToggleButton value="input">Input</ToggleButton>
					<ToggleButton value="output">Output</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<UnitTable data={filteredData} columnConfig={columnConfig} />
		</Box>
	)
}
