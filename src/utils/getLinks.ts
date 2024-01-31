import axios from 'axios';
import cheerio from 'cheerio';
import { ROOT_URL, SOURCE } from './constants';

export default async function scrapeLinks() {
    try {
        const response = await axios.get(SOURCE);
        const html = response.data;
        const $ = cheerio.load(html);

        const links = new Set<string>();

        $('.Panel-elements a').each((_index: any, element: any) => {
            const href = $(element).attr('href');
            if (href && href.endsWith('.pdf')) {
                if (!href.startsWith(ROOT_URL)) {
                    links.add(ROOT_URL + href);
                } else {
                    links.add(href);
                }
            }
        });

        // I removed the first item because it belongs to 2021 PDF that it is not possible to download
        const linksArray = Array.from(links);
        linksArray.shift(); // Remove the first item

        return linksArray;
    } catch (error) {
        console.error('Error scraping links:', error);
    }
}
