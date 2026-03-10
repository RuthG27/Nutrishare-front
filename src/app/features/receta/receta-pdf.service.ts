import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Receta, Nutrientes } from './receta.service';
import { Productos, Producto } from '../../services/productos';

@Injectable({
  providedIn: 'root',
})
export class RecetaPdfService {
  constructor(private productosService: Productos) {}

  async generateRecipePdfBytes(receta: Receta): Promise<Uint8Array> {
    if (!receta.nombre || !receta.pasos || !receta.ingredientes) {
      throw new Error('Datos insuficientes para generar el PDF');
    }

    const pdfDoc = await PDFDocument.create();

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaObliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points
    const margin = 40;
    let yPosition = pageHeight - margin;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);

    const addText = (
      text: string,
      fontSize: number,
      font: any,
      color: any = rgb(0, 0, 0),
      x: number = margin,
      forceY?: number,
    ) => {
      if (forceY !== undefined) {
        yPosition = forceY;
      }

      // Verificar si necesitamos nueva página
      const textHeight = fontSize + 8;
      if (yPosition - textHeight < margin + 50) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      page.drawText(text, {
        x,
        y: yPosition,
        size: fontSize,
        font,
        color,
        maxWidth: pageWidth - 2 * margin,
      });

      yPosition -= textHeight;
      return yPosition;
    };

    const addSpace = (points: number) => {
      yPosition -= points;
      if (yPosition < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
    };

    const addList = (items: string[], fontSize: number, startX: number = margin) => {
      items.forEach((item) => {
        const textHeight = fontSize + 6;
        if (yPosition - textHeight < margin + 60) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }

        page.drawText(`• ${item}`, {
          x: startX,
          y: yPosition,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
          maxWidth: pageWidth - startX - margin,
        });

        yPosition -= textHeight;
      });
      addSpace(10);
    };

    const addNumberedList = (items: string[], fontSize: number, startX: number = margin) => {
      items.forEach((item, index) => {
        const textHeight = fontSize + 6;
        if (yPosition - textHeight < margin + 60) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }

        page.drawText(`${index + 1}. ${item}`, {
          x: startX,
          y: yPosition,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
          maxWidth: pageWidth - startX - margin,
        });

        yPosition -= textHeight;
      });
      addSpace(10);
    };

    addText(receta.nombre, 24, helveticaBoldFont);

    const subtitle = `${receta.cocina || 'Sin cocina especificada'} • ${receta.dificultad || 'Dificultad no especificada'}`;
    addText(subtitle, 14, helveticaObliqueFont);
    addSpace(20);

    addText('Resumen', 16, helveticaBoldFont);
    const summary = [
      `Tiempo de preparación: ${receta.tiempoPreparacion || 'No especificado'}`,
      `Puntuación: ${receta.puntuacion || 0}/5`,
    ];
    addList(summary, 12);
    addSpace(20);

    addText('Ingredientes', 16, helveticaBoldFont);
    const ingredientesNombres = this.getIngredientesNombres(receta.ingredientes);
    addList(ingredientesNombres, 12);
    addSpace(20);

    addText('Pasos', 16, helveticaBoldFont);
    addNumberedList(receta.pasos, 12);

    // Tabla nutricional - FORZAR NUEVA PÁGINA
    if (receta.nutrientes) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;

      addText('Valores nutricionales', 16, helveticaBoldFont);
      addSpace(10);

      const nutritionData = [
        ['Nutriente', 'Valor', 'Nutriente', 'Valor'],
        [
          'Calorías',
          `${receta.nutrientes.calorias || 0} kcal`,
          'Proteína',
          `${receta.nutrientes.proteinas || 0} g`,
        ],
        [
          'Carbohidratos',
          `${receta.nutrientes.carbohidratos || 0} g`,
          'Grasa',
          `${receta.nutrientes.grasasTotales || 0} g`,
        ],
        ['Fibra', `${receta.nutrientes.fibra || 0} g`, '', ''],
      ];

      const cellHeight = 25;
      const tableHeight = nutritionData.length * cellHeight;

      if (yPosition - tableHeight < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const tableY = yPosition;
      const tableX = margin;
      const cellWidth = (pageWidth - 2 * margin) / 4;
      const fontSize = 10;

      nutritionData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellX = tableX + colIndex * cellWidth;
          const cellY = tableY - rowIndex * cellHeight;

          page.drawRectangle({
            x: cellX,
            y: cellY,
            width: cellWidth,
            height: cellHeight,
            borderColor: rgb(0.5, 0.5, 0.5),
            borderWidth: 0.5,
          });

          if (cell) {
            const isHeader = rowIndex === 0;
            page.drawText(cell, {
              x: cellX + 5,
              y: cellY + cellHeight / 2 - fontSize / 2,
              size: fontSize,
              font: isHeader ? helveticaBoldFont : helveticaFont,
              color: rgb(0, 0, 0),
              maxWidth: cellWidth - 10,
            });
          }
        });
      });
    }

    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const currentPage = pdfDoc.getPages()[i];
      const footerText = `Nutrishare • ${new Date().toLocaleDateString()}`;

      currentPage.drawText(footerText, {
        x: margin,
        y: margin / 2,
        size: 9,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      currentPage.drawText(`${i + 1}`, {
        x: pageWidth - margin - 10,
        y: margin / 2,
        size: 9,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  async downloadRecipePdf(receta: Receta): Promise<void> {
    try {
      const pdfBytes = await this.generateRecipePdfBytes(receta);

      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const safeName = receta.nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '');
      link.download = `receta-${safeName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw error;
    }
  }

  private getIngredientesNombres(ingredientes: { timestamp: number; date: string }[]): string[] {
    // Por ahora mostramos IDs de ingredientes hasta tener el servicio de productos
    // TODO: Implementar resolución de nombres de productos cuando esté disponible
    return ingredientes.map((ingrediente) => `Ingrediente ${ingrediente.timestamp}`);
  }

  canGeneratePdf(receta: Receta): boolean {
    return !!(
      receta &&
      receta.nombre &&
      receta.pasos &&
      receta.pasos.length > 0 &&
      receta.ingredientes &&
      receta.ingredientes.length > 0
    );
  }
}
