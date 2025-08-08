# QR Code Generator

This GitHub Pages site generates QR codes for 4 different HTML pages hosted at `https://davidchepe.github.io/QRs/`.

## Structure

```
QRs/
├── css/
│   └── style.css
├── js/
│   └── qr-generator.js
├── qr-codes/
│   ├── QR1.png
│   ├── QR2.png
│   ├── QR3.png
│   └── QR4.png
├── index.html
├── qr1.html
├── qr2.html
├── qr3.html
├── qr4.html
└── README.md
```

## Features

- **4 Individual Pages**: Each with unique content and its own QR code
- **QR Code Generation**: Automatic generation using QR Server API
- **PNG Downloads**: Download QR codes as PNG files (QR1.png, QR2.png, etc.)
- **Responsive Design**: Works on desktop and mobile devices
- **Navigation**: Easy navigation between all pages

## Usage

1. Visit the main page at `https://davidchepe.github.io/QRs/`
2. Navigate to any of the 4 QR pages
3. Click "Show QR Code" to display the QR code for that page
4. Click "Download QRX.png" to save the QR code as a PNG file
5. Save downloaded PNG files in the `qr-codes/` folder

## QR Code URLs

- QR1: `https://davidchepe.github.io/QRs/qr1.html`
- QR2: `https://davidchepe.github.io/QRs/qr2.html`
- QR3: `https://davidchepe.github.io/QRs/qr3.html`
- QR4: `https://davidchepe.github.io/QRs/qr4.html`

## Customization

Content for each page can be updated by editing the respective HTML files. The QR codes will automatically point to the correct URLs once deployed to GitHub Pages.
