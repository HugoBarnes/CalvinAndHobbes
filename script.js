const pdfPaths = [
    'pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf',
    'pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
    'pdfs/(3) Yukon Ho! - Bill Watterson.pdf',
    'pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',
    'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
    'pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
    'pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
    'pdfs/(8) The Days are Just Packed - Bill Watterson.pdf',
    'pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
    'pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf',
    'pdfs/(11) Its a Magical World - Bill Watterson.pdf',
    'pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
    'pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'
];

function loadRandomComic() {
    const randomPdfPath = pdfPaths[Math.floor(Math.random() * pdfPaths.length)];

    pdfjsLib.getDocument(randomPdfPath).promise.then(function(pdfDoc) {
        const numPages = pdfDoc.numPages;
        const randomPageNumber = Math.floor(Math.random() * numPages) + 1;

        pdfDoc.getPage(randomPageNumber).then(function(page) {
            const scale = 2; // Adjust the scale for higher resolution
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.getElementById('pdfCanvas');
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);

            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });
    }).catch(function (error) {
        // Handle errors (e.g., PDF loading failed)
        console.error('Error loading PDF: ', error);
    });
}

document.getElementById('random-cartoon').addEventListener('click', loadRandomComic);
loadRandomComic();