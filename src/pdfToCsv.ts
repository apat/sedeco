/**
 * This script extracts data from PDF files and saves it into a CSV file.
 * It uses the pdf-text-extract and pdf-table-extractor libraries to extract text and tables from the PDFs.
 * The extracted data includes product names, units, minimum prices, maximum prices, and dates.
 * The script reads PDF files from a specified directory, processes each file sequentially, and saves the extracted data into a CSV file.
 * The CSV file is created and any existing data is deleted before processing the PDF files.
 * The script assumes that the PDF files are named in chronological order.
 * 
 * Dependencies:
 * - pdf-extract: npm install pdf-extract
 * - poppler, gs, tesseract (for MAC): brew install poppler gs tesseract
 * 
 * Source: https://github.com/nisaacson/pdf-extract
 */
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import CSVGenerator from './CSVGenerator';
var extract = require('pdf-text-extract')
var pdf_table_extractor = require("pdf-table-extractor")
moment.locale('es')

// Directory where the PDFs are located
const directoryPath = path.join(__dirname, 'pdfs')
// CSV file where the data of the basic basket prices will be saved
const csv = new CSVGenerator('input_prices.csv');

// The purpose of deleting the CSV file is to avoid duplicating the data
csv.deleteFile();
// Create a new CSV file
csv.createNewFile();

/* The PageTable interface defines a structure for an object that contains information about a page in a PDF file and its tables.
It has two properties:
1. page, which is a number representing the page number
2. tables, which is an array of tables found on that page.
The tables property is of type any, which means it can contain any type of data. */
interface PageTable {
  page: number;
  tables: any;
}

/* The Result interface defines a structure for an object that contains information about a page
in a PDF file and its tables. The pageTables property in the Result interface is an array of PageTable objects,
which means it contains information about the tables found on each page of the PDF file. */
interface Result {
  pageTables: PageTable[];
}

/**
 * Processes the files in the specified directory.
 * 
 * @param directoryPath - The path to the directory containing the files.
 * @param files - An array of file names to process.
 * @returns A Promise that resolves when all files have been processed.
 */
async function processFiles(directoryPath: string, files: string[]) {
  for (const file of files) {
    try {
      const pages = await new Promise<string[]>((resolve, reject) => {
        extract(path.join(directoryPath, file), (err: any, pages: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(pages);
          }
        });
      });
      
      const pattern = /(\d{1,2}) de ([a-zA-Z0-9]+) de (\d{4})/;
      const dates: { page: number; date: string; }[] = [];
      
      pages.forEach((page: string, index: number) => {
        const match = page.match(pattern);
        dates.push({
          page: index + 1,
          date: match ? match[0].replace(/juni0/g, 'junio') : dates[dates.length - 1].date
        });
      });
      
      console.table(dates);
      
      const result = await new Promise<Result>((resolve, reject) => {
        pdf_table_extractor(path.join(directoryPath, file), (result: Result) => {
          resolve(result);
        }, (err: string) => {
          reject(err);
        });
      });
      
      result.pageTables.forEach((element) => {
        if (element.tables.slice(2).length > 0) {
          element.tables.slice(2).forEach((row: any) => {
            csv.appendToFile({
              product: row[0].trim().replace(/\r?\n|\r/g, ' '),
              unit: row[9].replace(/[^\w]/g, ''), // Only keeps it as kilograms, liters, etc.
              minPrice: row[7].replace("$", ''),
              maxPrice: row[8].replace("$", ''),
              date: moment(dates.find(i => i.page === element.page)?.date, 'DD [de] MMMM [de] YYYY').format('YYYY-MM-DD')
            });
          });
        }
      });
      
    } catch (err) {
      console.error('Error:', err);
    }
  }
}

// Extract the content of each PDF
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  // The order of the files is important, to be chronological
  files.sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (numA < numB) {
      return -1;
    } else if (numA > numB) {
      return 1;
    } else {
      return 0;
    }
  });
  // Process the files
  processFiles(directoryPath, files);
});