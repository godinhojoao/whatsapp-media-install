import ytdl from 'ytdl-core' // this must be a repository
import fs from 'fs'
import path from 'path'
import { MusicFromYoutubeInstaller } from 'interfaces/contracts/MusicFromYoutubeInstaller'
import { FilenameFormatter } from 'interfaces/contracts/FilenameFormatter'
import { Media } from 'interfaces/contracts/Media'

export class MusicFromYoutubeInstallerService implements MusicFromYoutubeInstaller<fs.WriteStream> {
  private readonly mediasFolder: string;

  constructor (
    public readonly filenameFormatter: FilenameFormatter
  ) {
    this.mediasFolder = path.resolve(__dirname, '..', 'medias')
  }

  public async install (videoURL: string): Promise<Media<fs.WriteStream>> {
    if (!fs.existsSync(this.mediasFolder)) { fs.mkdirSync(this.mediasFolder) } // stop creating file and start uploading on s3

    const infos = await ytdl.getInfo(videoURL)
    const videoTitle = infos.player_response.videoDetails.title
    const desiredFileName = this.filenameFormatter.format(videoTitle, 'mp3')
    const filePath = path.resolve(this.mediasFolder, desiredFileName)

    const videoReadableStream = ytdl(videoURL, { filter: 'audioonly' })

    // stop creating file and start uploading on s3
    const videoWritableStream = fs.createWriteStream(filePath) // stop creating file and start uploading on s3

    const stream = videoReadableStream.pipe(videoWritableStream) // stop creating file and start uploading on s3
    return { stream: stream, filename: desiredFileName, filePath: filePath }
  }
}
