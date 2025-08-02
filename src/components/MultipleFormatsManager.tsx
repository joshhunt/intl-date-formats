import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit2, ChevronDown, ChevronRight } from "lucide-react";
import {
  DateTimeOptionsSelector,
  type DateTimeFormatOptions,
} from "./DateTimeOptionsSelector";
import { useState } from "react";

export interface FormatConfiguration {
  id: string;
  name: string;
  options: DateTimeFormatOptions;
}

interface MultipleFormatsManagerProps {
  formats: FormatConfiguration[];
  onChange: (formats: FormatConfiguration[]) => void;
}

export function MultipleFormatsManager({
  formats,
  onChange,
}: MultipleFormatsManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [expandedFormats, setExpandedFormats] = useState<Set<string>>(
    new Set()
  );

  const addFormat = () => {
    const newFormat: FormatConfiguration = {
      id: `format-${Date.now()}`,
      name: `Format ${formats.length + 1}`,
      options: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    };
    onChange([...formats, newFormat]);
    // Auto-expand new formats for immediate editing
    setExpandedFormats((prev) => new Set([...prev, newFormat.id]));
  };

  const removeFormat = (id: string) => {
    if (formats.length > 1) {
      onChange(formats.filter((f) => f.id !== id));
      setExpandedFormats((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const updateFormat = (id: string, options: DateTimeFormatOptions) => {
    onChange(formats.map((f) => (f.id === id ? { ...f, options } : f)));
  };

  const toggleExpanded = (id: string) => {
    setExpandedFormats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const startEditingName = (format: FormatConfiguration) => {
    setEditingId(format.id);
    setEditingName(format.name);
  };

  const saveName = () => {
    if (editingId) {
      onChange(
        formats.map((f) =>
          f.id === editingId ? { ...f, name: editingName } : f
        )
      );
      setEditingId(null);
      setEditingName("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const getOptionsPreview = (options: DateTimeFormatOptions): string => {
    const parts = [];
    if (options.dateStyle) parts.push(`dateStyle: ${options.dateStyle}`);
    if (options.timeStyle) parts.push(`timeStyle: ${options.timeStyle}`);
    if (options.weekday) parts.push(`weekday: ${options.weekday}`);
    if (options.year) parts.push(`year: ${options.year}`);
    if (options.month) parts.push(`month: ${options.month}`);
    if (options.day) parts.push(`day: ${options.day}`);
    if (options.hour) parts.push(`hour: ${options.hour}`);
    if (options.minute) parts.push(`minute: ${options.minute}`);
    if (options.second) parts.push(`second: ${options.second}`);
    if (options.timeZone) parts.push(`timeZone: ${options.timeZone}`);

    return parts.length > 0
      ? parts.slice(0, 3).join(", ") + (parts.length > 3 ? "..." : "")
      : "No options set";
  };

  return (
    <div className="space-y-4">
      {/* Compact format cards in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {formats.map((format) => {
          const isExpanded = expandedFormats.has(format.id);
          return (
            <Card
              key={format.id}
              className={`transition-all ${isExpanded ? "col-span-full" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    {editingId === format.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="h-8 flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveName();
                            if (e.key === "Escape") cancelEdit();
                          }}
                          autoFocus
                        />
                        <Button onClick={saveName} size="sm" variant="ghost">
                          Save
                        </Button>
                        <Button onClick={cancelEdit} size="sm" variant="ghost">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <CardTitle className="text-sm font-medium">
                          {format.name}
                        </CardTitle>
                        <Button
                          onClick={() => startEditingName(format)}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => toggleExpanded(format.id)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      title={isExpanded ? "Collapse" : "Expand to edit"}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                    {formats.length > 1 && (
                      <Button
                        onClick={() => removeFormat(format.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {getOptionsPreview(format.options)}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <DateTimeOptionsSelector
                    options={format.options}
                    onChange={(options) => updateFormat(format.id, options)}
                  />
                </CardContent>
              )}
            </Card>
          );
        })}

        {/* Add Format Card */}
        <Card className="border-dashed border-2 hover:bg-muted/50 cursor-pointer transition-colors">
          <CardContent
            className="flex items-center justify-center"
            onClick={addFormat}
          >
            <div className="text-center">
              <Plus className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add Format</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
