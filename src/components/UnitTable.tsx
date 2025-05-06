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
	secondaryLabel: string
	secondaryStyle: 'success' | 'error'
}

type UnitTableProps = {
	data: Unit[]
	columnConfig: ColumnConfig[]
}

export default function UnitTable({ data, columnConfig }: UnitTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([])

	// Column styling configuration
	const columnStyles = {
		header: {
			primary: { fontSize: 'small', fontWeight: 'bold', color: '#717680' },
			secondary: {
				success: { fontWeight: 'bold', color: '#17B26A' },
				error: { fontWeight: 'bold', color: 'red' },
			},
		},
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
								marginBottom: '-4.5px', // Negative margin to bring icons closer
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
								marginTop: '-4.5px', // Negative margin to bring icons closer
							}}
						/>
					</Stack>
				</Box>
				<Typography
					variant="caption"
					sx={columnStyles.header.secondary[config.secondaryStyle]}
				>
					{config.secondaryLabel}
				</Typography>
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
		<TableContainer
			component={Paper}
			sx={{ border: '1px solid #E9EAEB', minWidth: '100%', boxShadow: 'none' }}
		>
			<Table sx={{ minWidth: '100%' }}>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCell
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									sx={{ cursor: 'pointer' }}
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
								<TableCell key={cell.id} sx={{ color: '#717680' }}>
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
