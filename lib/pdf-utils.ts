'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Recipe } from './types';

export async function generatePDF(recipe: Recipe) {
	const element = document.querySelector('main');
	if (!element) return;

	const clone = element.cloneNode(true) as HTMLElement;

	// Remove buttons and interactive elements
	clone.querySelectorAll('button').forEach((button) => button.remove());

	// Create a temporary container
	const container = document.createElement('div');
	container.style.position = 'absolute';
	container.style.left = '-9999px';
	container.style.top = '-9999px';
	container.style.width = '794px'; // A4 width in pixels at 96 DPI
	container.appendChild(clone);
	document.body.appendChild(container);

	try {
		// Apply print-specific styles
		const styleSheet = document.createElement('style');
		styleSheet.textContent = `
      * { -webkit-print-color-adjust: exact !important; }
      @media print {
        body { margin: 0; padding: 0; }
        img { max-width: 100%; height: auto; }
        .prose { max-width: none; }
      }
    `;
		clone.appendChild(styleSheet);

		const canvas = await html2canvas(clone, {
			scale: 2,
			useCORS: true,
			logging: false,
			allowTaint: true,
			backgroundColor: '#ffffff',
		});

		const imgWidth = 210; // A4 width in mm
		const pageHeight = 297; // A4 height in mm
		const imgHeight = (canvas.height * imgWidth) / canvas.width;

		const pdf = new jsPDF('p', 'mm', 'a4');

		// Split content into pages
		let heightLeft = imgHeight;
		let position = 0;
		let pageNumber = 1;

		// Add first page
		pdf.addImage(
			canvas.toDataURL('image/png'),
			'PNG',
			0,
			position,
			imgWidth,
			imgHeight
		);
		heightLeft -= pageHeight;

		// Add subsequent pages if needed
		while (heightLeft >= 0) {
			position = -pageHeight * pageNumber;
			pdf.addPage();
			pdf.addImage(
				canvas.toDataURL('image/png'),
				'PNG',
				0,
				position,
				imgWidth,
				imgHeight
			);
			heightLeft -= pageHeight;
			pageNumber++;
		}

		pdf.save(`${recipe.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
	} catch (error) {
		console.error('Error generating PDF:', error);
	} finally {
		// Clean up
		document.body.removeChild(container);
	}
}
