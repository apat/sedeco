<p align="center">
    <img src="https://www.sedeco.cdmx.gob.mx/themes/base/assets/images/logos/Logo_CDMX.png" alt="CMDX"/> <img src="https://www.sedeco.cdmx.gob.mx/themes/base/assets/images/logos/Logo_Dependencia.png" alt="Sedeco logo">
</p>

# Get Input Prices (SEDECO)

<p align="center">🚀 Simple, powerful Node.js tool for data processing 🚀</p>

<p align="center">
  <a href="#objectives">Objectives</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#website">Website</a>
</p>

## Objectives

The main objective of this project is to obtain food prices from PDF files and convert them to CSV format. These data will be used in prediction projects using artificial intelligence techniques.

The process is carried out as follows:

1. **Data Extraction**: We use a PDF processing tool to extract food prices from the PDF files.

2. **Conversion to CSV**: The extracted data is converted to CSV format for easier further processing.

3. **Prediction**: The data in CSV format is used to make predictions using artificial intelligence techniques.

This project is a crucial part of a larger system that aims to predict food prices and help businesses and consumers make more informed decisions.

## Installation

To install and use the commands, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

2. Clone the repository and navigate to the project directory.

3. Install the dependencies by running the following command:

     ```shell
     npm install
     ```

## Usage
Once the dependencies are installed, you can use the following commands:

1.  To download something, run:

     ```shell
     npm run download
     ```

2.  To convert a PDF to CSV, run:

     ```shell
     npm run csv
     ```

3. To build the project (which will run both the download and CSV commands), run:

     ```shell
     npm run build
     ```

4. To run tests, execute:

     ```shell
     npm test
     ```

Note: Make sure to replace `ts-node src/download.ts` and `ts-node src/pdfToCsv.ts` with the actual file paths in your `package.json` file.

## Website: [Seguimiento de Precios de la Canasta Básica](https://www.sedeco.cdmx.gob.mx/servicios/servicio/seguimiento-de-precios-de-la-canasta-basica)

Explore the website to track essential commodity prices and gain valuable insights into economic trends.

---

**Disclaimer:**
The logos and data used in this project belong to and are the intellectual property of the respective government departments of Mexico City. This project is not officially affiliated with or endorsed by these government entities.