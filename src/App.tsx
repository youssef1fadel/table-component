import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import TableManager, { type Tab } from './components/TableManager'
import type { Unit, ColumnConfig } from './components/TableGrid'

// Create a theme instance with Inter font
const theme = createTheme({
	typography: {
		fontFamily: '"Inter", sans-serif',
	},
})

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

// Define input tab values
const inputTabs: Tab[] = [
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

// Define output tab values
const outputTabs: Tab[] = [
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

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TableManager
				inputTabs={inputTabs}
				outputTabs={outputTabs}
				inputUnitData={inputUnitData}
				outputUnitData={outputUnitData}
				columnConfig={columnConfig}
				initialActiveTab={3}
				initialSheetType="input"
			/>
		</ThemeProvider>
	)
}

export default App
