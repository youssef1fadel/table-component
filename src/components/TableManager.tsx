import React from 'react'
import {
	Typography,
	Box,
	ToggleButtonGroup,
	ToggleButton,
	Modal,
	IconButton,
} from '@mui/material'
import UnitTable, { type Unit, type ColumnConfig } from './TableGrid'
import TabSlider from './TabSlider'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

// Define theme colors
const COLORS = {
	primary: '#015C9A',
	primaryLight: '#E5F3FE',
	border: '#E9EAEB',
	text: {
		primary: '#000000',
		secondary: '#717680',
	},
	badge: {
		text: '#015A9A',
		background: '#E5F3FE',
	},
	button: {
		selected: '#015C9A',
		text: '#717680',
		selectedText: '#ffffff',
	},
}

// Define common styles
const STYLES = {
	borderRadius: '8px',
	badge: {
		borderRadius: '20px',
		padding: '2px 8px',
		fontSize: '0.75rem',
		lineHeight: 1.5,
	},
	button: {
		height: 36,
		minHeight: 36,
	},
}

// Define the Tab type
export type Tab = {
	label: string
	value: number
	filter: (unit: Unit) => boolean
	ignored: boolean
}

// Define props for TableManager
export interface TableManagerProps {
	inputTabs: Tab[]
	outputTabs: Tab[]
	inputUnitData: Unit[]
	outputUnitData: Unit[]
	columnConfig: ColumnConfig[]
	initialActiveTab?: number
	initialSheetType?: 'input' | 'output'
}

export default function TableManager({
	inputTabs,
	outputTabs,
	inputUnitData,
	outputUnitData,
	columnConfig,
	initialActiveTab = 0,
	initialSheetType = 'input',
}: TableManagerProps) {
	const [activeTab, setActiveTab] = React.useState(initialActiveTab)
	const [sheetType, setSheetType] = React.useState<'input' | 'output'>(
		initialSheetType
	)

	// Store tabs state with ignored property
	const [inputTabsState, setInputTabsState] = React.useState(inputTabs)
	const [outputTabsState, setOutputTabsState] = React.useState(outputTabs)

	// Calculate tabs with correct unit counts
	const inputTabsWithCounts = React.useMemo(() => {
		return inputTabsState.map((tab) => ({
			...tab,
			units: inputUnitData.filter(tab.filter).length,
		}))
	}, [inputTabsState, inputUnitData])

	const outputTabsWithCounts = React.useMemo(() => {
		return outputTabsState.map((tab) => ({
			...tab,
			units: outputUnitData.filter(tab.filter).length,
		}))
	}, [outputTabsState, outputUnitData])

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
			// Find the first non-ignored tab to set as active
			const tabs = type === 'input' ? inputTabsWithCounts : outputTabsWithCounts
			const firstAvailableTab = tabs.find((tab) => !tab.ignored)
			if (firstAvailableTab) {
				setActiveTab(firstAvailableTab.value)
			}
		}
	}

	// Add handler to toggle ignore state
	const handleToggleIgnore = (tabValue: number | string) => {
		// Store current tab state before making changes
		const currentTabs = sheetType === 'input' ? inputTabsState : outputTabsState
		const tabBeingToggled = currentTabs.find((tab) => tab.value === tabValue)

		// If tab doesn't exist or is undefined, do nothing
		if (!tabBeingToggled) return

		// Get the new ignored state (toggle the current state)
		const willBeIgnored = !tabBeingToggled.ignored

		// Update the tabs state
		if (sheetType === 'input') {
			setInputTabsState((prevTabs) =>
				prevTabs.map((tab) =>
					tab.value === tabValue ? { ...tab, ignored: willBeIgnored } : tab
				)
			)
		} else {
			setOutputTabsState((prevTabs) =>
				prevTabs.map((tab) =>
					tab.value === tabValue ? { ...tab, ignored: willBeIgnored } : tab
				)
			)
		}

		// Only switch tabs if ALL of these conditions are true:
		// 1. The tab being toggled is the active tab
		// 2. The tab is being set to ignored (not being un-ignored)
		// 3. There's at least one non-ignored tab available to switch to
		if (tabValue === activeTab && willBeIgnored) {
			const activeTabs =
				sheetType === 'input' ? inputTabsWithCounts : outputTabsWithCounts

			// Find a non-ignored tab to switch to
			const nonIgnoredTab = activeTabs.find(
				(tab) => tab.value !== tabValue && !tab.ignored
			)

			// Only switch if we found a non-ignored tab
			if (nonIgnoredTab) {
				setActiveTab(Number(nonIgnoredTab.value))
			}
		}
		// If we're un-ignoring a tab or toggling a non-active tab, do nothing with tab selection
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

		return activeUnitData
	}, [activeTab, activeUnitData, activeTabs])

	const [modalOpen, setModalOpen] = React.useState(false)

	const handleOpenModal = () => setModalOpen(true)
	const handleCloseModal = () => setModalOpen(false)

	const containerStyle = {
		border: `1px solid ${COLORS.border}`,
		borderRadius: STYLES.borderRadius,
	}

	const badgeStyle = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: STYLES.badge.borderRadius,
		padding: STYLES.badge.padding,
		ml: 1,
		fontSize: STYLES.badge.fontSize,
		color: COLORS.badge.text,
		backgroundColor: COLORS.badge.background,
		textTransform: 'lowercase',
		lineHeight: STYLES.badge.lineHeight,
	}

	const iconButtonStyle = {
		color: COLORS.text.secondary,
		border: `2px solid ${COLORS.border}`,
		borderRadius: STYLES.borderRadius,
		minHeight: STYLES.button.height,
		height: STYLES.button.height,
		width: STYLES.button.height,
		padding: '4px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

	const toggleButtonGroupStyle = {
		display: 'inline-flex',
		bgcolor: 'transparent',
		borderRadius: STYLES.borderRadius,
		border: `1px solid ${COLORS.border}`,
		overflow: 'hidden',
		'& .MuiToggleButtonGroup-grouped': {
			minHeight: STYLES.button.height,
			height: STYLES.button.height,
			border: 0,
			textTransform: 'none',
			transition: 'background-color 0.1s, color 0.1s',
			color: COLORS.button.text,
			fontWeight: 'bold',
			px: 2,
			'&.Mui-selected': {
				bgcolor: COLORS.button.selected,
				color: COLORS.button.selectedText,
				'&:hover': {
					bgcolor: COLORS.button.selected,
					opacity: 0.9,
				},
			},
			'&:hover': {
				bgcolor: 'rgba(0, 0, 0, 0.04)',
			},
		},
	}

	const modalContainerStyle = {
		position: 'fixed',
		top: '5vh',
		left: '50%',
		transform: 'translateX(-50%)',
		width: '100%',
		maxWidth: 1200,
		height: '90vh',
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 2,
		borderRadius: STYLES.borderRadius,
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
	}

	const closeButtonStyle = {
		color: COLORS.text.secondary,
		border: `2px solid ${COLORS.border}`,
		borderRadius: STYLES.borderRadius,
		minHeight: STYLES.button.height,
		height: STYLES.button.height,
		padding: '4px 12px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

	return (
		<Box sx={containerStyle}>
			<Box
				p={2}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography component="label" fontWeight={'bold'}>
					Sheet preview
					<Box component="span" sx={badgeStyle}>
						{activeUnitData.length} unit{activeUnitData.length !== 1 ? 's' : ''}
					</Box>
				</Typography>

				<Box display="flex" alignItems="center" gap={1}>
					<IconButton
						onClick={handleOpenModal}
						size="small"
						sx={iconButtonStyle}
						aria-label="expand table"
					>
						<FullscreenIcon fontSize="small" />
					</IconButton>

					<ToggleButtonGroup
						value={sheetType}
						exclusive
						onChange={handleSheetTypeChange}
						aria-label="sheet type selector"
						size="small"
						sx={toggleButtonGroupStyle}
					>
						<ToggleButton value="input">Input</ToggleButton>
						<ToggleButton value="output">Output</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>

			<Box display="flex" alignItems="center" px={2} mb={2}>
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
				<Box sx={modalContainerStyle}>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb={2}
					>
						<Typography variant="h6" component="h2">
							{sheetType === 'input' ? 'Input' : 'Output'} Units
							<Box component="span" sx={badgeStyle}>
								{filteredData.length} unit{filteredData.length !== 1 ? 's' : ''}
							</Box>
						</Typography>
						<IconButton
							onClick={handleCloseModal}
							size="small"
							sx={closeButtonStyle}
							aria-label="close modal"
						>
							<Box
								component="span"
								sx={{
									fontSize: '0.875rem',
									fontWeight: 'bold',
								}}
							>
								Close
							</Box>
						</IconButton>
					</Box>

					{/* Add TabSlider to the modal */}
					<Box display="flex" alignItems="center" mb={2}>
						<TabSlider
							tabs={activeTabs}
							activeIndex={activeTab}
							onChange={handleTabChange}
							onToggleIgnore={handleToggleIgnore}
						/>
					</Box>

					<Box sx={{ overflow: 'auto', flexGrow: 1 }}>
						<UnitTable data={filteredData} columnConfig={columnConfig} />
					</Box>
				</Box>
			</Modal>
		</Box>
	)
}
