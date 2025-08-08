class QRGenerator {
    constructor() {
        this.baseURL = 'https://davidchepe.github.io/QRs/';
        this.qrAPI = 'https://api.qrserver.com/v1/create-qr-code/';
    }

    generateQR(pageNumber, size = 300) {
        const url = `${this.baseURL}qr${pageNumber}.html`;
        const qrURL = `${this.qrAPI}?size=${size}x${size}&format=png&data=${encodeURIComponent(url)}`;
        return qrURL;
    }

    async downloadQR(pageNumber, filename = null) {
        const qrURL = this.generateQR(pageNumber, 500);
        
        try {
            const response = await fetch(qrURL);
            const blob = await response.blob();
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename || `QR${pageNumber}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            
            console.log(`QR${pageNumber}.png downloaded successfully`);
        } catch (error) {
            console.error('Error downloading QR code:', error);
            alert('Error downloading QR code. Please try again.');
        }
    }

    displayQR(pageNumber, containerId) {
        const container = document.getElementById(containerId);
        
        // Clear existing content if it's the same page QR
        if (container.children.length === 1 && container.querySelector('.qr-item')) {
            return;
        }
        
        const qrDiv = document.createElement('div');
        qrDiv.className = 'qr-item';
        
        const title = document.createElement('h3');
        title.textContent = `QR Code for Page ${pageNumber}`;
        
        const img = document.createElement('img');
        img.src = this.generateQR(pageNumber);
        img.alt = `QR Code for page ${pageNumber}`;
        
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = `Download QR${pageNumber}.png`;
        downloadBtn.onclick = () => this.downloadQR(pageNumber);
        
        qrDiv.appendChild(title);
        qrDiv.appendChild(img);
        qrDiv.appendChild(downloadBtn);
        container.appendChild(qrDiv);
    }

    clearDisplay(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
    }
}

const qrGen = new QRGenerator();

function generateAllQRs() {
    const container = document.getElementById('qr-display');
    container.innerHTML = '';
    
    for (let i = 1; i <= 4; i++) {
        qrGen.displayQR(i, 'qr-display');
    }
}

function showCurrentPageQR(pageNumber) {
    qrGen.clearDisplay('qr-display');
    qrGen.displayQR(pageNumber, 'qr-display');
}
