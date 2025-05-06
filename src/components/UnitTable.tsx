import React from 'react'
import {
    useReactTable,
    type ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type SortingState,
} from '@tanstack/react-table'
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Stack } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export type Unit = {
    unitId: string
    unitTypeCode: string
    category: string
    project: string
}

type UnitTableProps = {
    data: Unit[]
    columns: ColumnDef<Unit>[]
}

export default function UnitTable({ data, columns }: UnitTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
    })

    return (
        <Table>
            <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableCell
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    <Stack sx={{ ml: 0.5, height: '24px' }}>
                                        <ArrowUpwardIcon 
                                            fontSize="small" 
                                            sx={{ 
                                                fontSize: '12px',
                                                color: header.column.getIsSorted() === 'asc' 
                                                    ? 'primary.main' 
                                                    : 'text.disabled'
                                            }} 
                                        />
                                        <ArrowDownwardIcon 
                                            fontSize="small" 
                                            sx={{ 
                                                fontSize: '12px',
                                                color: header.column.getIsSorted() === 'desc' 
                                                    ? 'primary.main' 
                                                    : 'text.disabled'
                                            }} 
                                        />
                                    </Stack>
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
