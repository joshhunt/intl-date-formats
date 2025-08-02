import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Table, Settings } from "lucide-react";
import { LocaleSelector } from "@/components/LocaleSelector";
import { MultipleFormatsManager, type FormatConfiguration } from "@/components/MultipleFormatsManager";
import { TableDateComparison } from "@/components/TableDateComparison";
import { DatePickerInput } from "@/components/DatePickerInput";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [locales, setLocales] = useState<string[]>(["en-US", "es-ES", "fr-FR", "ja-JP"]);
  const [formats, setFormats] = useState<FormatConfiguration[]>([
    {
      id: "format-1",
      name: "Standard Date & Time",
      options: { dateStyle: "medium", timeStyle: "short" }
    },
    {
      id: "format-2", 
      name: "Full Date Only",
      options: { dateStyle: "full" }
    },
    {
      id: "format-3",
      name: "Custom Format",
      options: { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    }
  ]);

  const addLocale = () => {
    setLocales([...locales, "en-GB"]);
  };

  const removeLocale = (index: number) => {
    if (locales.length > 1) {
      setLocales(locales.filter((_, i) => i !== index));
    }
  };

  const updateLocale = (index: number, newLocale: string) => {
    const newLocales = [...locales];
    newLocales[index] = newLocale;
    setLocales(newLocales);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Intl.DateTimeFormat Explorer
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <Table className="w-5 h-5" />
            Compare multiple format configurations across different locales in a table view
          </p>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Date Input */}
          <Card>
            <CardHeader>
              <CardTitle>Test Date</CardTitle>
            </CardHeader>
            <CardContent>
              <DatePickerInput date={date} onChange={setDate} />
            </CardContent>
          </Card>

          {/* Locale Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Locales</span>
                <Button onClick={addLocale} size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-80 overflow-y-auto">
              {locales.map((locale, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <LocaleSelector
                      value={locale}
                      onChange={(newLocale) => updateLocale(index, newLocale)}
                      label={`Locale ${index + 1}`}
                    />
                  </div>
                  {locales.length > 1 && (
                    <Button
                      onClick={() => removeLocale(index)}
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Format Configurations Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Format Configurations</h2>
          </div>
          <MultipleFormatsManager formats={formats} onChange={setFormats} />
        </div>

        {/* Main Results Table */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Table className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Comparison Results</h2>
          </div>
          <TableDateComparison 
            date={date} 
            locales={locales} 
            formats={formats} 
          />
        </div>

        {/* Footer */}
        <Separator className="my-12" />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Built with React, TypeScript, and{" "}
            <a 
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Intl.DateTimeFormat
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
