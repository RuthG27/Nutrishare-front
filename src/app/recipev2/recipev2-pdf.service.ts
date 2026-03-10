import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Recipe } from './recipev2.mock';

@Injectable({ providedIn: 'root' })
export class RecipeV2PdfService {
  async generateRecipePdfBytes(recipe: Recipe): Promise<Uint8Array> {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Configurar fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaObliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Intentar cargar imágenes
    let coverImage: any = null;
    let dishImage: any = null;

    try {
      // Cargar imagen de portada
      const coverResponse = await fetch(recipe.images.coverUrl);
      if (coverResponse.ok) {
        const coverImageBytes = await coverResponse.arrayBuffer();
        coverImage = await pdfDoc.embedJpg(coverImageBytes);
      }
    } catch (error) {
      console.warn('No se pudo cargar la imagen de portada:', error);
    }

    try {
      // Cargar imagen del plato
      const dishResponse = await fetch(recipe.images.dishUrl);
      if (dishResponse.ok) {
        const dishImageBytes = await dishResponse.arrayBuffer();
        dishImage = await pdfDoc.embedJpg(dishImageBytes);
      }
    } catch (error) {
      console.warn('No se pudo cargar la imagen del plato:', error);
    }

    // Tamaño de página
    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points
    const margin = 40;
    let yPosition = pageHeight - margin;

    // Crear primera página
    let page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Función helper para agregar texto con control de posición y paginación
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

    // Función para añadir espacio vertical con paginación
    const addSpace = (points: number) => {
      yPosition -= points;
      if (yPosition < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
    };

    // Función helper para agregar lista
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

    // Función helper para agregar lista numerada
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

    // Título
    addText(recipe.title, 24, helveticaBoldFont);

    // Subtítulo
    addText(recipe.subtitle, 14, helveticaObliqueFont);
    addSpace(20);

    // Layout con imagen de portada y resumen
    if (coverImage) {
      const imageWidth = 200;
      const imageHeight = 150;

      // Verificar si la imagen cabe en la página actual
      if (yPosition - imageHeight < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const imageX = margin;
      const imageY = yPosition - imageHeight;

      // Dibujar imagen
      page.drawImage(coverImage, {
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
      });

      // Posición para el texto al lado de la imagen
      const textX = margin + imageWidth + 20;
      const textY = yPosition;

      // Título "Resumen" al lado de la imagen
      page.drawText('Resumen', {
        x: textX,
        y: textY,
        size: 16,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // Lista de resumen al lado de la imagen
      const summary = [
        `Raciones: ${recipe.servings}`,
        `Preparación: ${recipe.prepMinutes} min`,
        `Cocción: ${recipe.cookMinutes} min`,
        `Total: ${recipe.prepMinutes + recipe.cookMinutes} min`,
      ];

      let summaryY = textY - 25;
      summary.forEach((item) => {
        page.drawText(`• ${item}`, {
          x: textX,
          y: summaryY,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        summaryY -= 18;
      });

      // Actualizar yPosition para que esté debajo de la imagen
      yPosition = imageY - 20;
    } else {
      // Sin imagen, solo el resumen
      addText('Resumen', 16, helveticaBoldFont);
      const summary = [
        `Raciones: ${recipe.servings}`,
        `Preparación: ${recipe.prepMinutes} min`,
        `Cocción: ${recipe.cookMinutes} min`,
        `Total: ${recipe.prepMinutes + recipe.cookMinutes} min`,
      ];
      addList(summary, 12);
    }

    addSpace(20);

    // Ingredientes
    addText('Ingredientes', 16, helveticaBoldFont);
    addList(recipe.ingredients, 12);

    // Pasos
    addText('Pasos', 16, helveticaBoldFont);
    addNumberedList(recipe.steps, 12);

    // Tabla nutricional - FORZAR NUEVA PÁGINA
    // Crear nueva página para la tabla nutricional
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    yPosition = pageHeight - margin;

    addText('Valores nutricionales (por ración)', 16, helveticaBoldFont);
    addSpace(10); // Espacio entre título y tabla

    const nutritionData = [
      ['Nutriente', 'Valor', 'Nutriente', 'Valor'],
      [
        'Calorías',
        `${recipe.nutritionPerServing.calories} kcal`,
        'Proteína',
        `${recipe.nutritionPerServing.protein_g} g`,
      ],
      [
        'Carbohidratos',
        `${recipe.nutritionPerServing.carbs_g} g`,
        'Grasa',
        `${recipe.nutritionPerServing.fat_g} g`,
      ],
      [
        'Fibra',
        `${recipe.nutritionPerServing.fiber_g} g`,
        'Azúcares',
        `${recipe.nutritionPerServing.sugar_g} g`,
      ],
      ['Sodio', `${recipe.nutritionPerServing.sodium_mg} mg`, '', ''],
    ];

    // Calcular altura total de la tabla y verificar si cabe
    const cellHeight = 25;
    const tableHeight = nutritionData.length * cellHeight;

    if (yPosition - tableHeight < margin + 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    // Dibujar tabla nutricional
    const tableY = yPosition;
    const tableX = margin;
    const cellWidth = (pageWidth - 2 * margin) / 4;
    const fontSize = 10;

    nutritionData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellX = tableX + colIndex * cellWidth;
        const cellY = tableY - rowIndex * cellHeight;

        // Dibujar borde de celda
        page.drawRectangle({
          x: cellX,
          y: cellY,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0.5, 0.5, 0.5),
          borderWidth: 0.5,
        });

        // Añadir texto
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

    // Actualizar yPosition para que esté debajo de la tabla
    yPosition = tableY - tableHeight - 20;

    // Imagen del plato
    if (dishImage) {
      addText('Foto del plato', 16, helveticaBoldFont);
      addSpace(10); // Espacio antes de la imagen

      const dishImageWidth = 300;
      const dishImageHeight = 200;

      // Verificar si la imagen cabe en la página actual
      if (yPosition - dishImageHeight < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const dishImageX = (pageWidth - dishImageWidth) / 2; // Centrado
      const dishImageY = yPosition - dishImageHeight;

      page.drawImage(dishImage, {
        x: dishImageX,
        y: dishImageY,
        width: dishImageWidth,
        height: dishImageHeight,
      });

      // Actualizar yPosition para que esté debajo de la imagen
      yPosition = dishImageY - 30;
    }

    // Footer con numeración de página
    const pageCount = pdfDoc.getPageCount();

    // Añadir footer a todas las páginas
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

    // Serializar el PDF y devolver bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  async downloadRecipePdf(recipe: Recipe): Promise<void> {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Configurar fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaObliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Intentar cargar imágenes
    let coverImage: any = null;
    let dishImage: any = null;

    try {
      // Cargar imagen de portada
      const coverResponse = await fetch(recipe.images.coverUrl);
      if (coverResponse.ok) {
        const coverImageBytes = await coverResponse.arrayBuffer();
        coverImage = await pdfDoc.embedJpg(coverImageBytes);
      }
    } catch (error) {
      console.warn('No se pudo cargar la imagen de portada:', error);
    }

    try {
      // Cargar imagen del plato
      const dishResponse = await fetch(recipe.images.dishUrl);
      if (dishResponse.ok) {
        const dishImageBytes = await dishResponse.arrayBuffer();
        dishImage = await pdfDoc.embedJpg(dishImageBytes);
      }
    } catch (error) {
      console.warn('No se pudo cargar la imagen del plato:', error);
    }

    // Tamaño de página
    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points
    const margin = 40;
    let yPosition = pageHeight - margin;

    // Crear primera página
    let page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Función helper para agregar texto con control de posición y paginación
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

    // Función para añadir espacio vertical con paginación
    const addSpace = (points: number) => {
      yPosition -= points;
      if (yPosition < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
    };

    // Función helper para agregar lista
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

    // Función helper para agregar lista numerada
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

    // Título
    addText(recipe.title, 24, helveticaBoldFont);

    // Subtítulo
    addText(recipe.subtitle, 14, helveticaObliqueFont);
    addSpace(20);

    // Layout con imagen de portada y resumen
    if (coverImage) {
      const imageWidth = 200;
      const imageHeight = 150;

      // Verificar si la imagen cabe en la página actual
      if (yPosition - imageHeight < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const imageX = margin;
      const imageY = yPosition - imageHeight;

      // Dibujar imagen
      page.drawImage(coverImage, {
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
      });

      // Posición para el texto al lado de la imagen
      const textX = margin + imageWidth + 20;
      const textY = yPosition;

      // Título "Resumen" al lado de la imagen
      page.drawText('Resumen', {
        x: textX,
        y: textY,
        size: 16,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // Lista de resumen al lado de la imagen
      const summary = [
        `Raciones: ${recipe.servings}`,
        `Preparación: ${recipe.prepMinutes} min`,
        `Cocción: ${recipe.cookMinutes} min`,
        `Total: ${recipe.prepMinutes + recipe.cookMinutes} min`,
      ];

      let summaryY = textY - 25;
      summary.forEach((item) => {
        page.drawText(`• ${item}`, {
          x: textX,
          y: summaryY,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        summaryY -= 18;
      });

      // Actualizar yPosition para que esté debajo de la imagen
      yPosition = imageY - 20;
    } else {
      // Sin imagen, solo el resumen
      addText('Resumen', 16, helveticaBoldFont);
      const summary = [
        `Raciones: ${recipe.servings}`,
        `Preparación: ${recipe.prepMinutes} min`,
        `Cocción: ${recipe.cookMinutes} min`,
        `Total: ${recipe.prepMinutes + recipe.cookMinutes} min`,
      ];
      addList(summary, 12);
    }

    addSpace(20);

    // Ingredientes
    addText('Ingredientes', 16, helveticaBoldFont);
    addList(recipe.ingredients, 12);

    // Pasos
    addText('Pasos', 16, helveticaBoldFont);
    addNumberedList(recipe.steps, 12);

    // Tabla nutricional - FORZAR NUEVA PÁGINA
    // Crear nueva página para la tabla nutricional
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    yPosition = pageHeight - margin;

    addText('Valores nutricionales (por ración)', 16, helveticaBoldFont);
    addSpace(10); // Espacio entre título y tabla

    const nutritionData = [
      ['Nutriente', 'Valor', 'Nutriente', 'Valor'],
      [
        'Calorías',
        `${recipe.nutritionPerServing.calories} kcal`,
        'Proteína',
        `${recipe.nutritionPerServing.protein_g} g`,
      ],
      [
        'Carbohidratos',
        `${recipe.nutritionPerServing.carbs_g} g`,
        'Grasa',
        `${recipe.nutritionPerServing.fat_g} g`,
      ],
      [
        'Fibra',
        `${recipe.nutritionPerServing.fiber_g} g`,
        'Azúcares',
        `${recipe.nutritionPerServing.sugar_g} g`,
      ],
      ['Sodio', `${recipe.nutritionPerServing.sodium_mg} mg`, '', ''],
    ];

    // Calcular altura total de la tabla y verificar si cabe
    const cellHeight = 25;
    const tableHeight = nutritionData.length * cellHeight;

    if (yPosition - tableHeight < margin + 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    // Dibujar tabla nutricional
    const tableY = yPosition;
    const tableX = margin;
    const cellWidth = (pageWidth - 2 * margin) / 4;
    const fontSize = 10;

    nutritionData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellX = tableX + colIndex * cellWidth;
        const cellY = tableY - rowIndex * cellHeight;

        // Dibujar borde de celda
        page.drawRectangle({
          x: cellX,
          y: cellY,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0.5, 0.5, 0.5),
          borderWidth: 0.5,
        });

        // Añadir texto
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

    // Actualizar yPosition para que esté debajo de la tabla
    yPosition = tableY - tableHeight - 20;

    // Imagen del plato
    if (dishImage) {
      addText('Foto del plato', 16, helveticaBoldFont);
      addSpace(10); // Espacio antes de la imagen

      const dishImageWidth = 300;
      const dishImageHeight = 200;

      // Verificar si la imagen cabe en la página actual
      if (yPosition - dishImageHeight < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const dishImageX = (pageWidth - dishImageWidth) / 2; // Centrado
      const dishImageY = yPosition - dishImageHeight;

      page.drawImage(dishImage, {
        x: dishImageX,
        y: dishImageY,
        width: dishImageWidth,
        height: dishImageHeight,
      });

      // Actualizar yPosition para que esté debajo de la imagen
      yPosition = dishImageY - 30;
    }

    // Footer con numeración de página
    const pageCount = pdfDoc.getPageCount();

    // Añadir footer a todas las páginas
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

    // Serializar el PDF
    const pdfBytes = await pdfDoc.save();

    // Descargar el PDF
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const safeName = recipe.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '');
    link.download = `receta-${safeName}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpiar URL
    URL.revokeObjectURL(url);
  }
}
