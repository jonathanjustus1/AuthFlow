"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getYear, getMonth, getDate, getDaysInMonth } from "date-fns";
import { useState, useEffect } from "react";

interface DateOfBirthPickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateOfBirthPicker({ value, onChange }: DateOfBirthPickerProps) {
  const [year, setYear] = useState<number | undefined>(value ? getYear(value) : undefined);
  const [month, setMonth] = useState<number | undefined>(value ? getMonth(value) : undefined);
  const [day, setDay] = useState<number | undefined>(value ? getDate(value) : undefined);

  useEffect(() => {
    if (year !== undefined && month !== undefined && day !== undefined) {
      const newDate = new Date(year, month, day);
      onChange(newDate);
    }
  }, [year, month, day, onChange]);
  
  const handleYearChange = (value: string) => {
    const newYear = parseInt(value, 10);
    setYear(newYear);
    // Reset day if it's no longer valid for the new month/year
    if(month !== undefined && day !== undefined) {
        const daysInNewMonth = getDaysInMonth(new Date(newYear, month));
        if (day > daysInNewMonth) {
            setDay(undefined);
        }
    }
  };

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value, 10);
    setMonth(newMonth);
    // Reset day if it's no longer valid for the new month/year
    if(year !== undefined && day !== undefined) {
        const daysInNewMonth = getDaysInMonth(new Date(year, newMonth));
        if (day > daysInNewMonth) {
            setDay(undefined);
        }
    }
  };

  const handleDayChange = (value: string) => {
    setDay(parseInt(value, 10));
  };


  const currentYear = getYear(new Date());
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = year !== undefined && month !== undefined ? Array.from({ length: getDaysInMonth(new Date(year, month)) }, (_, i) => i + 1) : [];

  return (
    <div className="flex gap-2">
      <Select value={month?.toString()} onValueChange={handleMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m, i) => (
            <SelectItem key={i} value={i.toString()}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={day?.toString()} onValueChange={handleDayChange} disabled={month === undefined || year === undefined}>
        <SelectTrigger>
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {days.map(d => (
            <SelectItem key={d} value={d.toString()}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={year?.toString()} onValueChange={handleYearChange}>
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map(y => (
            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
