import { Map, OcurrencesMap } from 'interfaces/TypeUtilities'

export interface FilenameFormatter {
  readonly bannedSignals?: string[];
  readonly signalsReplacePreferences?: Map;
  readonly signalsWithLimit?: string[];
  readonly signalsLimit?: OcurrencesMap;
  format(filename: string, format: string): string;
}
