import type fs from 'fs'
import { FilenameFormatterService, MusicFromYoutubeInstallerService } from '../services'
import { MusicFromYoutubeInstaller } from 'interfaces/contracts'

export const makeMusicFromYoutubeInstallerService = (): MusicFromYoutubeInstaller<fs.WriteStream> => {
  const filenameFormatterConfigurations = {
    bannedSignals: [
      '/', '\\', '"', '<', '>', '[', ']', '|', '°', '?', "'", '=', ':', 'vevo',
      'VEVO', 'Vevo', '*', '.', ';'
    ],
    signalsReplacePreferences: {},
    signalsWithLimit: ['-', '&', '(', ')'],
    signalsLimit: {}
  }
  const loader = new FilenameFormatterService(
    filenameFormatterConfigurations.bannedSignals,
    filenameFormatterConfigurations.signalsReplacePreferences,
    filenameFormatterConfigurations.signalsWithLimit,
    filenameFormatterConfigurations.signalsLimit
  )
  return new MusicFromYoutubeInstallerService(loader)
}
