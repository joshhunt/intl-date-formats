import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

export interface DateTimeFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  fractionalSecondDigits?: 1 | 2 | 3;
  timeZoneName?:
    | "long"
    | "short"
    | "shortOffset"
    | "longOffset"
    | "shortGeneric"
    | "longGeneric";
  timeZone?: string;
  hour12?: boolean;
  hourCycle?: "h11" | "h12" | "h23" | "h24";
  calendar?: string;
  numberingSystem?: string;
}

interface DateTimeOptionsSelectorProps {
  options: DateTimeFormatOptions;
  onChange: (options: DateTimeFormatOptions) => void;
}

const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "America/Buenos_Aires",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Madrid",
  "Europe/Amsterdam",
  "Europe/Stockholm",
  "Europe/Moscow",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Seoul",
  "Asia/Hong_Kong",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Auckland",
];

export function DateTimeOptionsSelector({
  options,
  onChange,
}: DateTimeOptionsSelectorProps) {
  const updateOption = <K extends keyof DateTimeFormatOptions>(
    key: K,
    value: DateTimeFormatOptions[K] | undefined
  ) => {
    const newOptions = { ...options };
    if (value === undefined || value === "") {
      delete newOptions[key];
    } else {
      newOptions[key] = value;
    }
    onChange(newOptions);
  };

  return (
    <div className="space-y-6 mt-2">
      <Section title="Shortcuts">
        <div className="space-y-2">
          <Label htmlFor="dateStyle">Date Style</Label>
          <Select
            value={options.dateStyle || "none"}
            onValueChange={(value) =>
              updateOption(
                "dateStyle",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["dateStyle"])
              )
            }
          >
            <SelectTrigger id="dateStyle">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeStyle">Time Style</Label>
          <Select
            value={options.timeStyle || "none"}
            onValueChange={(value) =>
              updateOption(
                "timeStyle",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["timeStyle"])
              )
            }
          >
            <SelectTrigger id="timeStyle">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* Date Components */}
      <Section title="Date Components">
        <div className="space-y-2">
          <Label htmlFor="weekday">Weekday</Label>
          <Select
            value={options.weekday || "none"}
            onValueChange={(value) =>
              updateOption(
                "weekday",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["weekday"])
              )
            }
          >
            <SelectTrigger id="weekday">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="narrow">Narrow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="era">Era</Label>
          <Select
            value={options.era || "none"}
            onValueChange={(value) =>
              updateOption(
                "era",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["era"])
              )
            }
          >
            <SelectTrigger id="era">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="narrow">Narrow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={options.year || "none"}
            onValueChange={(value) =>
              updateOption(
                "year",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["year"])
              )
            }
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="month">Month</Label>
          <Select
            value={options.month || "none"}
            onValueChange={(value) =>
              updateOption(
                "month",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["month"])
              )
            }
          >
            <SelectTrigger id="month">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="narrow">Narrow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select
            value={options.day || "none"}
            onValueChange={(value) =>
              updateOption(
                "day",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["day"])
              )
            }
          >
            <SelectTrigger id="day">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Time Components">
        <div className="space-y-2">
          <Label htmlFor="hour">Hour</Label>

          <Select
            value={options.hour || "none"}
            onValueChange={(value) =>
              updateOption(
                "hour",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["hour"])
              )
            }
          >
            <SelectTrigger id="hour">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minute">Minute</Label>
          <Select
            value={options.minute || "none"}
            onValueChange={(value) =>
              updateOption(
                "minute",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["minute"])
              )
            }
          >
            <SelectTrigger id="minute">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="second">Second</Label>
          <Select
            value={options.second || "none"}
            onValueChange={(value) =>
              updateOption(
                "second",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["second"])
              )
            }
          >
            <SelectTrigger id="second">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="2-digit">2-digit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 ">
          <Label htmlFor="fractionalSecondDigits">
            Fractional Second Digits
          </Label>
          <Select
            value={options.fractionalSecondDigits?.toString() || "none"}
            onValueChange={(value) =>
              updateOption(
                "fractionalSecondDigits",
                value === "none"
                  ? undefined
                  : (parseInt(
                      value
                    ) as DateTimeFormatOptions["fractionalSecondDigits"])
              )
            }
          >
            <SelectTrigger id="fractionalSecondDigits">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeZoneName">Time Zone Name</Label>
          <Select
            value={options.timeZoneName || "none"}
            onValueChange={(value) =>
              updateOption(
                "timeZoneName",
                value === "none"
                  ? undefined
                  : (value as DateTimeFormatOptions["timeZoneName"])
              )
            }
          >
            <SelectTrigger id="timeZoneName">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="shortOffset">Short Offset</SelectItem>
              <SelectItem value="longOffset">Long Offset</SelectItem>
              <SelectItem value="shortGeneric">Short Generic</SelectItem>
              <SelectItem value="longGeneric">Long Generic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeZone">Time Zone</Label>
          <Select
            value={options.timeZone || "local"}
            onValueChange={(value) =>
              updateOption("timeZone", value === "local" ? undefined : value)
            }
          >
            <SelectTrigger id="timeZone">
              <SelectValue placeholder="Local time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local time zone</SelectItem>
              {COMMON_TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Additional Options">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hour12"
            checked={options.hour12 ?? false}
            onCheckedChange={(checked) =>
              updateOption("hour12", checked ? true : undefined)
            }
          />
          <Label htmlFor="hour12">12-hour format</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourCycle">Hour Cycle</Label>
          <Select
            value={options.hourCycle || "auto"}
            onValueChange={(value) =>
              updateOption(
                "hourCycle",
                value === "auto"
                  ? undefined
                  : (value as DateTimeFormatOptions["hourCycle"])
              )
            }
          >
            <SelectTrigger id="hourCycle">
              <SelectValue placeholder="Auto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="h11">h11 (0-11)</SelectItem>
              <SelectItem value="h12">h12 (1-12)</SelectItem>
              <SelectItem value="h23">h23 (0-23)</SelectItem>
              <SelectItem value="h24">h24 (1-24)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar">Calendar</Label>
          <Input
            id="calendar"
            value={options.calendar || ""}
            onChange={(e) =>
              updateOption("calendar", e.target.value || undefined)
            }
            placeholder="e.g., gregory, islamic, buddhist"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberingSystem">Numbering System</Label>
          <Input
            id="numberingSystem"
            value={options.numberingSystem || ""}
            onChange={(e) =>
              updateOption("numberingSystem", e.target.value || undefined)
            }
            placeholder="e.g., latn, arab, deva"
          />
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="font-medium text-center mb-2">{title}</h4>

      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
