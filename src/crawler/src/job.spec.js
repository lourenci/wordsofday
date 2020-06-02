const job = require('./job')

describe('#job', () => {
  const sources = [
    { url: 'https://source/', selector: '.selector' },
    { url: 'https://source2/', selector: '.selector2' },
  ]

  it('calls the crawler passing the sources', async () => {
    const getTextBySelector = jest
      .fn()
      .mockResolvedValueOnce('word1')
      .mockResolvedValueOnce('word2')
    const crawler = { getTextBySelector }
    const persister = jest.fn()

    await job({ sources, persister, crawler })
    expect(getTextBySelector).toHaveBeenCalledTimes(2)
    expect(getTextBySelector).toHaveBeenNthCalledWith(
      1,
      {
        url: 'https://source/',
        selector: '.selector',
      },
      expect.anything(),
      expect.anything()
    )
    expect(getTextBySelector).toHaveBeenNthCalledWith(
      2,
      {
        url: 'https://source2/',
        selector: '.selector2',
      },
      expect.anything(),
      expect.anything()
    )
  })

  it('calls the persister with the crawler results', async () => {
    const getTextBySelector = jest
      .fn()
      .mockResolvedValueOnce('word1')
      .mockResolvedValueOnce('word2')

    const crawler = { getTextBySelector }
    const persister = jest.fn()

    await job({ sources, persister, crawler })
    expect(persister).toHaveBeenCalledTimes(1)
    expect(persister).toHaveBeenCalledWith([
      { url: 'https://source/', word: 'word1' },
      { url: 'https://source2/', word: 'word2' },
    ])
  })

  it('calls the persister even when some crawler has failed', async () => {
    const getTextBySelector = jest
      .fn()
      .mockResolvedValueOnce('word1')
      .mockRejectedValueOnce(new Error('Some error'))

    const crawler = { getTextBySelector }
    const persister = jest.fn()

    await job({ sources, persister, crawler })
    expect(persister).toHaveBeenCalledTimes(1)
    expect(persister).toHaveBeenCalledWith([
      { url: 'https://source/', word: 'word1' },
    ])
  })
})
