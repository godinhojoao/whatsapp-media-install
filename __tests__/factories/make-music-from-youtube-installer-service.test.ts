import { makeMusicFromYoutubeInstallerService } from './../../src/factories/make-music-from-youtube-installer-service'

const mockFactoryFunction = jest.fn(makeMusicFromYoutubeInstallerService);

describe('makeMusicFromYoutubeInstallerService', () => {
  beforeEach(() => {
    mockFactoryFunction()
  })

  it('testing ', () => {
    // expect(mockFactoryFunction.mock.calls).toHaveLength(1)
    // expect(mockFactoryFunction.mock.results[0].value).toBe(42);
  })
})
