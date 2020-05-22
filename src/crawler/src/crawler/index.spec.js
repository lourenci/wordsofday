const path = require('path')
const url = require('url')
const { getTextBySelector } = require('./')

const fixture = path.resolve(__dirname, './fixture.html')
const fixtureUrl = url.pathToFileURL(fixture)

jest.setTimeout(30000)

describe('#getTextBySelector', () => {
  it('returns the text of the selector', async () => {
    const text = await getTextBySelector({
      url: fixtureUrl,
      selector: '[id="instant-content"]',
    })
    expect(text).toBe('Instant content')
  })

  it('returns the text of the selector even when the selector is not on the page right off the bat', async () => {
    const text = await getTextBySelector({
      url: fixtureUrl,
      selector: '[id="delayed-content"]',
    })
    expect(text).toBe('Delayed content')
  })
})
