import { FilenameFormatter } from 'interfaces/contracts'
import { Map, OcurrencesMap } from 'interfaces/TypeUtilities'

export class FilenameFormatterService implements FilenameFormatter {
  constructor (
    public readonly bannedSignals?: string[],
    public readonly signalsReplacePreferences?: Map,
    public readonly signalsWithLimit?: string[],
    public readonly signalsLimit?: OcurrencesMap
  ) { }

  public format (filename: string, format: string): string {
    const signalsWithLimitOcurrences = this.getSignalsOcurrences(filename, this.signalsWithLimit)
    Object.keys(signalsWithLimitOcurrences).forEach((signal: string): void => {
      const currentSignalLimit = (this.signalsLimit && this.signalsLimit[signal])
      filename = this.removeExtraSignals(filename, signal, signalsWithLimitOcurrences[signal], currentSignalLimit)
    })
    filename = this.removeAllSignals(filename)
    if (filename.length > 46) {
      filename = filename.substr(0, 46)
    }
    return `${filename.trim()}.${format}`
  }

  private getSignalsOcurrences (filename: string, signals?: string[]): OcurrencesMap {
    const signalsOcurrences: OcurrencesMap = {}
    let letter: string
    signals?.forEach((signal: string): void => {
      for (letter of filename) {
        if (letter === signal) {
          if (!signalsOcurrences[signal]) {
            signalsOcurrences[signal] = 1
          } else {
            signalsOcurrences[signal]++
          }
        }
      }
    })
    return signalsOcurrences
  }

  private removeExtraSignals (filename: string, signal: string, signalOcurrencesQuantity: number, limit?: number): string {
    const splitedFilename = filename.split('')
    if (!limit) {
      limit = 1
    }
    for (let i = splitedFilename.length - 1; i >= 0; i--) {
      if (signalOcurrencesQuantity > limit && splitedFilename[i] === signal) {
        splitedFilename.splice(i, 1)
        signalOcurrencesQuantity--
      }
    }
    return splitedFilename.join('')
  }

  private removeAllSignals (filename: string): string {
    const signalsPreferencesMapper = (preferedSignal: string): string => (this.signalsReplacePreferences && this.signalsReplacePreferences[preferedSignal]) || ''
    this.bannedSignals?.forEach((signal: string): void => {
      const preferedSignal = signalsPreferencesMapper(signal)
      if (filename.indexOf(signal) > -1) {
        filename = filename.split(signal).join(preferedSignal)
      }
    })
    return filename
  }
}
