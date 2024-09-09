import { Input } from "@/components/input/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DataInputProps {
  className?: string;
  label?: string;
}
const DataInput = ({ label, className }: DataInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={cn("relative w-full", className)}>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        customInput={
          <Input
            label={label}
            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
            className="w-full"
          />
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
      />
    </div>
  );
};

export default DataInput;
