import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DatePickerInputProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function DatePickerInput({ date, onChange }: DatePickerInputProps) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    if (!isNaN(newDate.getTime())) {
      onChange(newDate);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    onChange(newDate);
  };

  const setToNow = () => {
    onChange(new Date());
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTimeForInput = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Test Date & Time</Label>
        <Button onClick={setToNow} variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          Now
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date-input">Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="date-input"
              type="date"
              value={formatDateForInput(date)}
              onChange={handleDateChange}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time-input">Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="time-input"
              type="time"
              value={formatTimeForInput(date)}
              onChange={handleTimeChange}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Current: {date.toLocaleString()}
      </div>
    </div>
  );
}