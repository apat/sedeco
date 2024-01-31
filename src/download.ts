import fs from 'fs';
import path from 'path';
import axios from 'axios';
import scrapedLinks from './utils/getLinks';

/**
 * Downloads PDF files from the provided URLs and saves them in a local directory.
 * @returns {Promise<void>} A promise that resolves when all PDF files are downloaded successfully.
 */
const download = async (): Promise<void> => {
  const pdfUrls: string[] = await scrapedLinks() || [];

  const pdfDirectory: string = path.join(__dirname, 'pdfs');

  if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory);
  }
  pdfUrls.forEach(async (url: string, index: number) => {
    const filePath: string = path.join(pdfDirectory, `${index + 1}.pdf`);
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(filePath)).on('close', () => {
      console.log(`PDF ${index + 1} downloaded successfully.`);
    });
  });
}

download();
