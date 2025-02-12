'use server'
import * as cheerio from 'cheerio'

export async function searchScholarAction() {
  const page = await fetch(
    'https://scholar.google.com.au/citations?user=1R2uLp4AAAAJ'
  )

  const $ = cheerio.load(await page.text())
  const data = $.extract({
    papers: [
      {
        selector: '.gsc_a_t',
        title: {
          selector: '.gsc_a_at',
        },
        link: {
          selector: '.gsc_a_at',
          attr: 'href',
        },
      },
    ],
  })

  const slicedData = data.papers.slice(2)

  console.table(slicedData[0])
}
