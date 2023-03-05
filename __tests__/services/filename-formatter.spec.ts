import { FilenameFormatterService } from '../../src/services'

describe('FilenameFormatterService', () => {
  const filenameFormatterConfigurations = {
    bannedSignals: [
      '/', '\\', '"', '<', '>', '[', ']', '|', '°', '?', "'", '=', ':', 'vevo',
      'VEVO', 'Vevo', '*', '.', ';'
    ],
    signalsReplacePreferences: {},
    signalsWithLimit: ['-', '&', '(', ')'],
    signalsLimit: {}
  }

  const filenameFormatterService = new FilenameFormatterService(
    filenameFormatterConfigurations.bannedSignals,
    filenameFormatterConfigurations.signalsReplacePreferences,
    filenameFormatterConfigurations.signalsWithLimit,
    filenameFormatterConfigurations.signalsLimit
  )

  it('should call format passing: -j-oao- and receive the expected filename', () => {
    const filename = filenameFormatterService.format('-j-oao-', 'mp3')
    expect(filename).toBe('-joao.mp3')
  })

  it('should call format passing: -dale--dale- and receive the expected filename', () => {
    const filename = filenameFormatterService.format('-dale--dale-', 'mp3')
    expect(filename).toBe('-daledale.mp3')
  })

  it('should call format passing: Iron & Wine - Flightless Bird, American Mouth and receive the expected filename', () => {
    const filename = filenameFormatterService.format('Iron & Wine - Flightless Bird, American Mouth', 'mp3')
    expect(filename).toBe('Iron & Wine - Flightless Bird, American Mouth.mp3')
  })

  it('should call format passing: Iron && Wine -- Flightless -Bird, American Mouth and receive the expected filename', () => {
    const filename = filenameFormatterService.format('Iron && Wine -- Flightless -Bird, American Mouth', 'mp3')
    expect(filename).toBe('Iron & Wine - Flightless Bird, American Mouth.mp3')
  })

  it('should call format passing: Turma do Pagode - Lancinho (Ao vivo) and receive the expected filename', () => {
    const filename = filenameFormatterService.format('     Turma do Pagode - Lancinho (Ao vivo)', 'mp3')
    expect(filename).toBe('Turma do Pagode - Lancinho (Ao vivo).mp3')
  })

  it('should call format passing: teste - :testado:: (-)- (Lyric Video) and receive the expected filename', () => {
    const filename = filenameFormatterService.format('teste - :testado:: (-)- (Lyric Video)', 'mp3')
    expect(filename).toBe('teste - testado () Lyric Video.mp3')
  })

  it('should call format passing: teste testee testee testee testee testee testee testee and receive the expected filename', () => {
    const filename = filenameFormatterService.format('teste testee testee testee testee testee testee testee', 'mp3')
    expect(filename.length).toBe(50)
    expect(filename).toBe('teste testee testee testee testee testee teste.mp3')
  })
})
