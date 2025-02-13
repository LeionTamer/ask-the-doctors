'use server'
import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'

export async function searchScholarAction() {
  const url = 'https://scholar.google.com.au/citations?user=1R2uLp4AAAAJ'

  const urlSearchParams = new URLSearchParams(url.split('?')[1]) // split at '?' to just get query params
  const userId = urlSearchParams.get('user')

  if (!userId) {
    throw new Error('User ID not found')
  }

  const browser = await puppeteer.launch()
  const scholarPage = await browser.newPage()
  await scholarPage.goto(url)

  const urls: string[] = []

  try {
    let hasMore =
      (await scholarPage.$eval('#gsc_bpf_more', (el) =>
        el.getAttribute('disabled')
      )) === null

    while (hasMore) {
      await scholarPage.click('#gsc_bpf_more')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      hasMore =
        (await scholarPage.$eval('#gsc_bpf_more', (el) =>
          el.getAttribute('disabled')
        )) === null
    }

    const content = await scholarPage.content()
    const $ = cheerio.load(content)

    $('.gsc_a_tr').each((_, element) => {
      const urlParams = $(element).find('.gsc_a_at').attr('href')
      const url = `https://scholar.google.com.au${urlParams}`
      urls.push(url)
    })
  } finally {
    browser.close()
  }

  console.log('results')
  console.table(urls)
}
