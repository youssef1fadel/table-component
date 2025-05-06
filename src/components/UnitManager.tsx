import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import UnitTable, { type Unit } from './UnitTable'
import { type ColumnDef } from '@tanstack/react-table'
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

// Column definitions
const columns: ColumnDef<Unit>[] = [
	{
		accessorKey: 'unitId',
		header: () => (
			<Box>
				<Typography variant="caption" color="green">
					Unit Code
				</Typography>
				<br />
				Unit ID
			</Box>
		),
	},
	{
		accessorKey: 'unitTypeCode',
		header: () => (
			<Box>
				<Typography variant="caption" color="green">
					Unit Type
				</Typography>
				<br />
				Unit Type Code
			</Box>
		),
	},
	{
		accessorKey: 'category',
		header: () => (
			<Box>
				<Typography variant="caption" color="red">
					Unmapped
				</Typography>
				<br />
				Category
			</Box>
		),
	},
	{
		accessorKey: 'project',
		header: () => (
			<Box>
				<Typography variant="caption" color="red">
					Unmapped
				</Typography>
				<br />
				Project
			</Box>
		),
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
		<Box p={2}>
			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography variant="h6">
					Units{' '}
					<Button size="small" variant="outlined">
						{filteredData.length} Unit{filteredData.length !== 1 ? 's' : ''}
					</Button>
				</Typography>
			</Box>
			{/* Use the TabSlider component */}
			<TabSlider
				tabs={tabs}
				activeIndex={activeTab}
				onChange={handleTabChange}
			/>

			<UnitTable data={filteredData} columns={columns} />
		</Box>
	)
}
