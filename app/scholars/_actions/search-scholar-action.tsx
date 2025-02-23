'use server'
import * as cheerio from 'cheerio'

export async function searchScholarAction() {
  const url =
    'https://scholar.google.com.au/citations?view_op=view_citation&hl=en&user=1R2uLp4AAAAJ&cstart=20&pagesize=200'

  const urlSearchParams = new URLSearchParams(url.split('?')[1]) // split at '?' to just get query params
  const userId = urlSearchParams.get('user')

  if (!userId) {
    throw new Error('User ID not found')
  }

  const urls: string[] = []

  try {
    const scholarPage = await fetch(url)
    const scholarPageText = await scholarPage.text()

    console.log('scholarPageText: ', scholarPageText)
    const $ = cheerio.load(scholarPageText)

    $('.gsc_a_tr').each((_, element) => {
      const urlParams = $(element).find('.gsc_a_at').attr('href')
      const url = `https://scholar.google.com.au${urlParams}`
      urls.push(url)
    })
  } catch (error) {
    throw new Error('Error fetching scholar page: ' + error)
  }

  console.log('results')
  console.table(urls)
}
