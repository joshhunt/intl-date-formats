import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { type FormatConfiguration } from "./MultipleFormatsManager";
import { stringifyOptions } from "@/lib/intl";

interface TableDateComparisonProps {
  date: Date;
  locales: string[];
  formats: FormatConfiguration[];
}

interface FormattedResult {
  locale: string;
  formatId: string;
  formatted: string;
  error?: string;
}

export function TableDateComparison({
  date,
  locales,
  formats,
}: TableDateComparisonProps) {
  const formatDate = (
    locale: string,
    formatConfig: FormatConfiguration
  ): FormattedResult => {
    try {
      const formatter = new Intl.DateTimeFormat(locale, formatConfig.options);
      const formatted = formatter.format(date);
      return { locale, formatId: formatConfig.id, formatted };
    } catch (error) {
      return {
        locale,
        formatId: formatConfig.id,
        formatted: "",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const allResults = locales.flatMap((locale) =>
    formats.map((format) => formatDate(locale, format))
  );

  const getResultForLocaleAndFormat = (
    locale: string,
    formatId: string
  ): FormattedResult => {
    return (
      allResults.find(
        (r) => r.locale === locale && r.formatId === formatId
      ) || {
        locale,
        formatId,
        formatted: "",
        error: "No result",
      }
    );
  };

  const errorCount = allResults.filter((r) => r.error).length;
  const totalCombinations = locales.length * formats.length;

  return (
    <div className="space-y-8">
      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Input Date:{" "}
            <span className="font-mono font-medium text-foreground">
              {date.toISOString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            {locales.length} locale{locales.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline">
            {formats.length} format{formats.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="secondary">
            {totalCombinations} combination{totalCombinations !== 1 ? "s" : ""}
          </Badge>
          {errorCount > 0 && (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errorCount} error{errorCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <Table className="rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold sticky left-0 bg-muted text-left px-4">
                  Locale
                </TableHead>
                {formats.map((format) => (
                  <TableHead
                    key={format.id}
                    className="font-semibold bg-muted text-base"
                  >
                    <div className="space-y-2 py-2">
                      <div className="text-base">{format.name}</div>
                      <div className="text-xs font-normal text-muted-foreground leading-relaxed">
                        {stringifyOptions(format.options)}
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {locales.map((locale) => (
                <TableRow key={locale}>
                  <TableCell
                    className={`font-medium sticky left-0 bg-background text-left px-4`}
                  >
                    <div className="font-semibold">{locale}</div>
                  </TableCell>

                  {formats.map((format) => {
                    const result = getResultForLocaleAndFormat(
                      locale,
                      format.id
                    );
                    return (
                      <TableCell
                        key={`${locale}-${format.id}`}
                        className="align-top"
                      >
                        {result.error ? (
                          <div className="space-y-2">
                            <Badge variant="destructive" className="text-xs">
                              Error
                            </Badge>
                            <div className="text-xs text-destructive break-words">
                              {result.error}
                            </div>
                          </div>
                        ) : (
                          <div className="text-base p-3 bg-muted/30 rounded border min-h-[3rem] flex items-center">
                            {result.formatted}
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
