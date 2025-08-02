import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Edit2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DateTimeOptionsSelector,
  type DateTimeFormatOptions,
} from "./DateTimeOptionsSelector";
import { useState } from "react";
import { stringifyOptions } from "@/lib/intl";

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
  };

  const removeFormat = (id: string) => {
    if (formats.length > 1) {
      onChange(formats.filter((f) => f.id !== id));
    }
  };

  const updateFormat = (id: string, options: DateTimeFormatOptions) => {
    onChange(formats.map((f) => (f.id === id ? { ...f, options } : f)));
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

  return (
    <div className="space-y-4">
      {/* Format cards in a grid */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))]">
        {formats.map((format) => (
          <Card key={format.id} className="transition-all">
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
            </CardHeader>

            <CardContent className="pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="options" className="border-none">
                  <AccordionTrigger className="text-sm font-regular py-2 hover:no-underline">
                    {stringifyOptions(format.options)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <DateTimeOptionsSelector
                      options={format.options}
                      onChange={(options) => updateFormat(format.id, options)}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}

        {/* Add Format Card */}
        <Card className="self-start border-dashed border-2 hover:bg-muted/50 cursor-pointer transition-colors flex justify-center">
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
