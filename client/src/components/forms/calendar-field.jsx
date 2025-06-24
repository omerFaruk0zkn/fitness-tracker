import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

const CalendarField = ({ name, value, onChange }) => {
  const initialDate = format(
    value ? new Date(value) : new Date(),
    "yyyy-MM-dd"
  );
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [month, setMonth] = useState(initialDate);

  return (
    <div className="relative flex gap-2">
      <Input
        id={name}
        value={value}
        placeholder={initialDate.toString()}
        className="bg-background pr-10"
        onChange={(e) => {
          const inputDate = new Date(e.target.value);
          onChange(e.target.value);
          setDate(inputDate);
          setMonth(inputDate);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${name}-picker`}
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              const formatted = format(
                date ? new Date(date) : new Date(),
                "yyyy-MM-dd"
              );
              setDate(date);
              onChange(formatted);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarField;
