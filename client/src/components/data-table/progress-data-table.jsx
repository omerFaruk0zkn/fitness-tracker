import { useState } from "react";
import { CircleArrowDown, CircleArrowUp, Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { formatNumber } from "@/utils/formatNumber";
import CalendarField from "../forms/calendar-field";

const progressColumns = (onEdit, onDelete) => [
  {
    accessorKey: "date",
    header: "Tarih",
    filterFn: "dateBetween",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Kilo (kg)",
    cell: ({ row }) => formatNumber(row.getValue("weight")),
  },
  {
    accessorKey: "shoulder",
    header: "Omuz",
    cell: ({ row }) => formatNumber(row.getValue("shoulder")),
  },
  {
    accessorKey: "chest",
    header: "Göğüs",
    cell: ({ row }) => formatNumber(row.getValue("chest")),
  },
  {
    accessorKey: "waist",
    header: "Bel",
    cell: ({ row }) => formatNumber(row.getValue("waist")),
  },
  {
    accessorKey: "hip",
    header: "Kalça",
    cell: ({ row }) => formatNumber(row.getValue("hip")),
  },
  {
    accessorKey: "arm_right",
    header: "Sağ Kol",
    cell: ({ row }) => formatNumber(row.getValue("arm_right")),
  },
  {
    accessorKey: "arm_left",
    header: "Sol Kol",
    cell: ({ row }) => formatNumber(row.getValue("arm_left")),
  },
  {
    id: "actions",
    header: "İşlemler",
    cell: ({ row }) => {
      const progress = row.original;
      return (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => onEdit(progress)}>
            <Edit className="size-5 text-secondary-foreground" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(progress._id)}
          >
            <Trash className="size-5" />
          </Button>
        </div>
      );
    },
  },
];

const ProgressDataTable = ({ progresses, onEdit, onDelete }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const table = useReactTable({
    data: progresses,
    columns: progressColumns(onEdit, onDelete),
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      dateBetween: (row, columnId, filterValue) => {
        const date = new Date(row.getValue(columnId));
        const [start, end] = filterValue || [];

        if (!start || !end) return true;

        return date >= start && date <= end;
      },
    },
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <CalendarField
            name="startDate"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(val) => {
              const newStart = new Date(val);
              setDateRange([newStart, endDate]);
              setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "date"),
                { id: "date", value: [newStart, endDate] },
              ]);
            }}
          />
          <CalendarField
            name="endDate"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(val) => {
              const newEnd = new Date(val);
              setDateRange([startDate, newEnd]);
              setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "date"),
                { id: "date", value: [startDate, newEnd] },
              ]);
            }}
          />
        </div>

        <Button
          onClick={() => {
            setDateRange([null, null]);
            setColumnFilters((old) => old.filter((f) => f.id !== "date"));
          }}
        >
          Tarih Filtrelemesini Temizle
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md border max-h-[450px]">
        <Table className="bg-primary text-primary-foreground font-medium">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none font-bold text-black"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex gap-1 items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <CircleArrowUp size={20} />,
                        desc: <CircleArrowDown size={20} />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={progressColumns.length}
                  className="text-center"
                >
                  Veri Yok
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProgressDataTable;
