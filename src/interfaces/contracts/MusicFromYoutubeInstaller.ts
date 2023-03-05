import { FilenameFormatter } from './FilenameFormatter'
import { Media } from './Media'

export interface MusicFromYoutubeInstaller<T> {
  install: (videoUrl: string) => Promise<Media<T>>
  filenameFormatter: FilenameFormatter;
}
