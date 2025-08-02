import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocaleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const POPULAR_LOCALES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "fr-CA", name: "French (Canada)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "pt-PT", name: "Portuguese (Portugal)" },
  { code: "ru-RU", name: "Russian (Russia)" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja-JP", name: "Japanese (Japan)" },
  { code: "ko-KR", name: "Korean (South Korea)" },
  { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "th-TH", name: "Thai (Thailand)" },
  { code: "vi-VN", name: "Vietnamese (Vietnam)" },
  { code: "sv-SE", name: "Swedish (Sweden)" },
  { code: "da-DK", name: "Danish (Denmark)" },
  { code: "no-NO", name: "Norwegian (Norway)" },
  { code: "fi-FI", name: "Finnish (Finland)" },
  { code: "pl-PL", name: "Polish (Poland)" },
  { code: "nl-NL", name: "Dutch (Netherlands)" },
  { code: "tr-TR", name: "Turkish (Turkey)" },
  { code: "he-IL", name: "Hebrew (Israel)" },
  { code: "cs-CZ", name: "Czech (Czech Republic)" },
  { code: "hu-HU", name: "Hungarian (Hungary)" },
  { code: "ro-RO", name: "Romanian (Romania)" },
];

export function LocaleSelector({ value, onChange, label }: LocaleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={`locale-${label}`}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={`locale-${label}`}>
          <SelectValue placeholder="Select a locale" />
        </SelectTrigger>
        <SelectContent>
          {POPULAR_LOCALES.map((locale) => (
            <SelectItem key={locale.code} value={locale.code}>
              {locale.name} ({locale.code})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}