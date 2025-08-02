import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type DateTimeFormatOptions } from "./DateTimeOptionsSelector";

interface DateComparisonDisplayProps {
  date: Date;
  locales: string[];
  options: DateTimeFormatOptions;
}

interface FormattedResult {
  locale: string;
  formatted: string;
  error?: string;
}

export function DateComparisonDisplay({ date, locales, options }: DateComparisonDisplayProps) {
  const formatDate = (locale: string): FormattedResult => {
    try {
      const formatter = new Intl.DateTimeFormat(locale, options);
      const formatted = formatter.format(date);
      return { locale, formatted };
    } catch (error) {
      return { 
        locale, 
        formatted: "", 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  };

  const results = locales.map(formatDate);
  const uniqueFormats = Array.from(new Set(results.filter(r => !r.error).map(r => r.formatted)));

  const getResolvedOptions = (locale: string) => {
    try {
      const formatter = new Intl.DateTimeFormat(locale, options);
      return formatter.resolvedOptions();
    } catch {
      return null;
    }
  };

  const firstValidLocale = locales.find(locale => {
    try {
      new Intl.DateTimeFormat(locale, options);
      return true;
    } catch {
      return false;
    }
  });

  const resolvedOptions = firstValidLocale ? getResolvedOptions(firstValidLocale) : null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Comparison Results</span>
            <div className="flex gap-2">
              <Badge variant="outline">
                {locales.length} locale{locales.length !== 1 ? 's' : ''}
              </Badge>
              <Badge variant="outline">
                {uniqueFormats.length} unique format{uniqueFormats.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Input Date: <span className="font-mono font-medium">{date.toISOString()}</span>
            </p>
            {uniqueFormats.length > 1 && (
              <p className="text-sm text-muted-foreground">
                Different locales produce different formatting results with these options.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results by Locale */}
      <Card>
        <CardHeader>
          <CardTitle>Formatted Results by Locale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div 
                key={`${result.locale}-${index}`} 
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{result.locale}</span>
                  {result.error ? (
                    <span className="text-sm text-destructive">{result.error}</span>
                  ) : (
                    <span className="font-mono text-lg">{result.formatted}</span>
                  )}
                </div>
                {!result.error && (
                  <Badge variant={uniqueFormats.length === 1 ? "default" : "secondary"}>
                    {result.formatted === uniqueFormats[0] ? "Primary" : "Variant"}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resolved Options */}
      {resolvedOptions && (
        <Card>
          <CardHeader>
            <CardTitle>Resolved Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(resolvedOptions)
                .filter(([key]) => key !== 'locale') // Locale is obvious from context
                .map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <div className="font-mono text-sm bg-muted p-2 rounded">
                      {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grouped by Format */}
      {uniqueFormats.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Grouped by Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uniqueFormats.map((format, formatIndex) => {
                const localesWithFormat = results
                  .filter(r => !r.error && r.formatted === format)
                  .map(r => r.locale);
                
                return (
                  <div key={`format-${formatIndex}`} className="space-y-2">
                    <div className="font-mono text-lg font-medium">{format}</div>
                    <div className="flex flex-wrap gap-2">
                      {localesWithFormat.map(locale => (
                        <Badge key={locale} variant="outline">
                          {locale}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}