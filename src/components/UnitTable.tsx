import React from 'react'
import {
	useReactTable,
	type ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	type SortingState,
} from '@tanstack/react-table'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
	Stack,
	Typography,
	TableContainer,
	Paper,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export type Unit = {
	unitId: string
	unitTypeCode: string
	category: string
	project: string
}

export type ColumnConfig = {
	key: string
	primaryLabel: string
}

type UnitTableProps = {
	data: Unit[]
	columnConfig: ColumnConfig[]
	textColor?: string
	borderColor?: string
	headerTextColor?: string
	cellPadding?: string
}

export default function UnitTable({
	data,
	columnConfig,
	textColor = '#717680',
	borderColor = '#E9EAEB',
	headerTextColor = '#717680',
	cellPadding = '4px 16px',
}: UnitTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([])

	// Column styling configuration
	const columnStyles = {
		header: {
			primary: {
				fontSize: 'small',
				fontWeight: 'bold',
				color: headerTextColor,
			},
		},
		cell: {
			padding: cellPadding,
		},
	}

	// Table container styles
	const tableContainerStyles = {
		border: `1px solid ${borderColor}`,
		minWidth: '100%',
		boxShadow: 'none',
	}

	// Cell styles
	const tableCellStyles = {
		color: textColor,
		padding: columnStyles.cell.padding,
	}

	// Header cell styles
	const headerCellStyles = {
		cursor: 'pointer',
	}

	// Generate columns from config
	const columns: ColumnDef<Unit>[] = columnConfig.map((config) => ({
		accessorKey: config.key,
		header: () => (
			<Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography sx={columnStyles.header.primary}>
						{config.primaryLabel}
					</Typography>
					<Stack sx={{ ml: 0.5, height: '18px', marginTop: '-2px' }}>
						<KeyboardArrowUpIcon
							sx={{
								fontSize: '14px',
								fontWeight: 'bold',
								color: sorting.some(
									(s) => s.id === config.key && s.desc === false
								)
									? 'primary.main'
									: 'text.disabled',
								marginBottom: '-4px',
							}}
						/>
						<KeyboardArrowDownIcon
							sx={{
								fontSize: '14px',
								fontWeight: 'bold',
								color: sorting.some(
									(s) => s.id === config.key && s.desc === true
								)
									? 'primary.main'
									: 'text.disabled',
								marginTop: '-4px',
							}}
						/>
					</Stack>
				</Box>
			</Box>
		),
	}))

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	})

	return (
		<TableContainer component={Paper} sx={tableContainerStyles}>
			<Table sx={{ minWidth: '100%' }}>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									sx={headerCellStyles}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id} sx={tableCellStyles}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
