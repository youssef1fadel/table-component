import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import UnitTable, { type Unit, type ColumnConfig } from './UnitTable'
import TabSlider from './TabSlider'

// Sample data
const unitData: Unit[] = [
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

// Define tab values and their corresponding filter conditions
const tabs = [
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
]

// Abstract column definitions
const columnConfig: ColumnConfig[] = [
	{
		key: 'unitId',
		primaryLabel: 'Unit ID',
		secondaryLabel: 'Unit Code',
		secondaryStyle: 'success',
	},
	{
		key: 'unitTypeCode',
		primaryLabel: 'Unit Type Code',
		secondaryLabel: 'Unit Type',
		secondaryStyle: 'success',
	},
	{
		key: 'category',
		primaryLabel: 'Category',
		secondaryLabel: 'Unmapped',
		secondaryStyle: 'error',
	},
	{
		key: 'project',
		primaryLabel: 'Project',
		secondaryLabel: 'Unmapped',
		secondaryStyle: 'error',
	},
]

export default function UnitManager() {
	const [activeTab, setActiveTab] = React.useState(3)

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	// Filter data based on the active tab
	const filteredData = React.useMemo(() => {
		const activeTabConfig = tabs.find((tab) => tab.value === activeTab)

		if (activeTabConfig && activeTabConfig.filter) {
			return unitData.filter(activeTabConfig.filter)
		}

		return unitData // Return all data if no filter is applied
	}, [activeTab])

	return (
		<Box p={2} sx={{ border: '1px solid #E9EAEB', borderRadius: '8px' }}>
			<Box display="flex" alignItems="center">
				<Typography variant="h6" component="label">
					Units
				</Typography>
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
					{filteredData.length} unit{filteredData.length !== 1 ? 's' : ''}
				</Box>
			</Box>
			{/* Use the TabSlider component */}
			<TabSlider
				tabs={tabs}
				activeIndex={activeTab}
				onChange={handleTabChange}
			/>

			<UnitTable data={filteredData} columnConfig={columnConfig} />
		</Box>
	)
}
