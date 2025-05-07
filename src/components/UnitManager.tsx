import React from 'react'
import { Typography, Box, ToggleButtonGroup, ToggleButton, Modal, IconButton } from '@mui/material'
import UnitTable, { type Unit, type ColumnConfig } from './UnitTable'
import TabSlider from './TabSlider'
// Add this import for the expand icon
import FullscreenIcon from '@mui/icons-material/Fullscreen'

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
		ignored: false,
	},
	{
		label: 'Tab name',
		value: 1,
		filter: (unit: Unit) => unit.category === 'Villa',
		ignored: false,
	},
	{
		label: 'Tab1.2',
		value: 2,
		filter: (unit: Unit) => unit.category === 'I-Villa Roof Garden',
		ignored: false,
	},
	{
		label: 'Project name',
		value: 3,
		filter: (unit: Unit) => unit.project === 'MV The Villas',
		ignored: false,
	},
]

// Define output tab values without hardcoding unit counts
const getOutputTabs = (data: Unit[]) => [
	{
		label: 'Output 1',
		value: 0,
		filter: (unit: Unit) => unit.project.includes('Output'),
		ignored: false,
	},
	{
		label: 'Output 2',
		value: 1,
		filter: (unit: Unit) => unit.category === 'Villa Output',
		ignored: false,
	},
	{
		label: 'Output 3',
		value: 2,
		filter: (unit: Unit) => unit.category === 'O-Villa Roof Garden',
		ignored: false,
	},
]

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

	// Store tabs state with ignored property
	const [inputTabs, setInputTabs] = React.useState(getInputTabs(inputUnitData))
	const [outputTabs, setOutputTabs] = React.useState(
		getOutputTabs(outputUnitData)
	)

	// Calculate tabs with correct unit counts
	const inputTabsWithCounts = React.useMemo(() => {
		return inputTabs.map((tab) => ({
			...tab,
			units: inputUnitData.filter(tab.filter).length,
		}))
	}, [inputTabs])

	const outputTabsWithCounts = React.useMemo(() => {
		return outputTabs.map((tab) => ({
			...tab,
			units: outputUnitData.filter(tab.filter).length,
		}))
	}, [outputTabs])

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleSheetTypeChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string | null
	) => {
		if (newValue !== null) {
			const type = newValue as 'input' | 'output'
			setSheetType(type)
			// Reset to first tab when switching sheet types
			setActiveTab(type === 'input' ? 3 : 0)
		}
	}

	// Add handler to toggle ignore state
	const handleToggleIgnore = (tabValue: number | string) => {
		if (sheetType === 'input') {
			setInputTabs((prevTabs) =>
				prevTabs.map((tab) =>
					tab.value === tabValue ? { ...tab, ignored: !tab.ignored } : tab
				)
			)
		} else {
			setOutputTabs((prevTabs) =>
				prevTabs.map((tab) =>
					tab.value === tabValue ? { ...tab, ignored: !tab.ignored } : tab
				)
			)
		}

		// If the ignored tab is currently active, switch to another tab
		if (tabValue === activeTab) {
			const activeTabs =
				sheetType === 'input' ? inputTabsWithCounts : outputTabsWithCounts
			const nonIgnoredTab = activeTabs.find(
				(tab) => tab.value !== tabValue && !tab.ignored
			)
			if (nonIgnoredTab) {
				setActiveTab(Number(nonIgnoredTab.value))
			}
		}
	}

	// Get the active data and tabs based on sheet type
	const activeUnitData = sheetType === 'input' ? inputUnitData : outputUnitData
	const activeTabs =
		sheetType === 'input' ? inputTabsWithCounts : outputTabsWithCounts

	// Filter data based on the active tab
	const filteredData = React.useMemo(() => {
		const activeTabConfig = activeTabs.find((tab) => tab.value === activeTab)

		if (activeTabConfig && activeTabConfig.filter) {
			return activeUnitData.filter(activeTabConfig.filter)
		}

		return activeUnitData // Return all data if no filter is applied
	}, [activeTab, activeUnitData, activeTabs])

	// Add state for modal
	const [modalOpen, setModalOpen] = React.useState(false);
  
	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

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

				<Box display="flex" alignItems="center" gap={1}>
						{/* Updated expand button with consistent sizing */}
						<IconButton 
							onClick={handleOpenModal}
							size="small"
							sx={{ 
								color: '#717680',
								border: '2px solid #E9EAEB',
								borderRadius: '8px',
								minHeight: 36,
								height: 36,
								width: 36,
								padding: '4px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							aria-label="expand table"
						>
							<FullscreenIcon fontSize="small" />
						</IconButton>

						{/* Existing ToggleButtonGroup */}
						<ToggleButtonGroup
							value={sheetType}
							exclusive
							onChange={handleSheetTypeChange}
							aria-label="sheet type selector"
							size="small"
							sx={{
								display: 'inline-flex',
								bgcolor: 'transparent',
								borderRadius: '8px',
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
			</Box>

			<Box display="flex" alignItems="center" px={2} mb={2}>
				{/* TabSlider now takes full width */}
				<TabSlider
					tabs={activeTabs}
					activeIndex={activeTab}
					onChange={handleTabChange}
					onToggleIgnore={handleToggleIgnore}
				/>
			</Box>

			<UnitTable data={filteredData} columnConfig={columnConfig} />

			{/* Add Modal */}
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
				aria-labelledby="expanded-table-modal"
				aria-describedby="expanded-view-of-unit-table"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '90%',
						maxWidth: 1200,
						maxHeight: '90vh',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: '8px',
						display: 'flex',
						flexDirection: 'column',
						overflow: 'hidden'
					}}
				>
					<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
						<Typography variant="h6" component="h2">
							{sheetType === 'input' ? 'Input' : 'Output'} Units - {activeTabs.find(tab => tab.value === activeTab)?.label}
							<Box
								component="span"
								sx={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
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
						</Typography>
						<IconButton 
							onClick={handleCloseModal}
							size="small"
							sx={{ 
								color: '#717680',
								border: '2px solid #E9EAEB',
								borderRadius: '8px',
								minHeight: 36,
								height: 36,
								padding: '4px 12px',  // Wider padding to accommodate text
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							aria-label="close modal"
						>
							<Box 
								component="span" 
								sx={{ 
									fontSize: '0.875rem',
									fontWeight: 'bold'
								}}
							>
								Close
							</Box>
						</IconButton>
					</Box>
					
					<Box sx={{ overflow: 'auto', flexGrow: 1 }}>
						<UnitTable data={filteredData} columnConfig={columnConfig} />
					</Box>
				</Box>
			</Modal>
		</Box>
	)
}
