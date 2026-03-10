import { Component } from '@angular/core';
import { RecipeV2PdfService } from './recipev2-pdf.service';
import { MOCK_RECIPE } from './recipev2.mock';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipev2-pdf-demo',
  standalone: true,
  template: `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="color: #333; margin-bottom: 20px;">Demo PDF receta (pdf-lib)</h1>

      <div
        style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;"
      >
        <h2 style="color: #007bff; margin-bottom: 10px;">{{ mockRecipe.title }}</h2>
        <p style="color: #666; font-style: italic;">{{ mockRecipe.subtitle }}</p>

        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Información rápida</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Raciones:</strong> {{ mockRecipe.servings }}</li>
            <li><strong>Preparación:</strong> {{ mockRecipe.prepMinutes }} min</li>
            <li><strong>Cocción:</strong> {{ mockRecipe.cookMinutes }} min</li>
            <li>
              <strong>Total:</strong> {{ mockRecipe.prepMinutes + mockRecipe.cookMinutes }} min
            </li>
          </ul>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button
            (click)="download()"
            [disabled]="loading"
            style="
              background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); 
              color: white; 
              padding: 14px 28px; 
              border: none; 
              border-radius: 6px; 
              cursor: pointer; 
              font-size: 16px;
              font-weight: 600;
              margin: 10px 0;
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
            "
          >
            @if (loading) {
              <span style="display: flex; align-items: center; gap: 8px;">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Generando PDF...
              </span>
            } @else {
              <span style="display: flex; align-items: center; gap: 8px;">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar PDF (pdf-lib)
              </span>
            }
          </button>

          <button
            (click)="generatePreview()"
            [disabled]="previewLoading"
            style="
              background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); 
              color: white; 
              padding: 14px 28px; 
              border: none; 
              border-radius: 6px; 
              cursor: pointer; 
              font-size: 16px;
              font-weight: 600;
              margin: 10px 0;
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(23, 162, 184, 0.1);
            "
          >
            @if (previewLoading) {
              <span style="display: flex; align-items: center; gap: 8px;">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Generando Preview...
              </span>
            } @else {
              <span style="display: flex; align-items: center; gap: 8px;">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Previsualizar PDF
              </span>
            }
          </button>
        </div>

        @if (error) {
          <div
            style="margin-top: 15px; padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; border: 1px solid #f5c6cb;"
          >
            <strong>❌ Error:</strong> {{ error }}
          </div>
        }

        @if (success) {
          <div
            style="margin-top: 15px; padding: 12px; background: #d4edda; color: #155724; border-radius: 6px; border: 1px solid #c3e6cb;"
          >
            <strong>✅ PDF generado correctamente</strong>
          </div>
        }

        @if (previewSuccess) {
          <div
            style="margin-top: 15px; padding: 12px; background: #d1ecf1; color: #0c5460; border-radius: 6px; border: 1px solid #bee5eb;"
          >
            <strong>👁️ PDF previsualizado correctamente</strong>
          </div>
        }

        @if (previewError) {
          <div
            style="margin-top: 15px; padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; border: 1px solid #f5c6cb;"
          >
            <strong>❌ Error en preview:</strong> {{ previewError }}
          </div>
        }

        @if (pdfUrl) {
          <div style="margin-top: 30px;">
            <h3 style="color: #333; margin-bottom: 15px;">📄 Preview del PDF:</h3>
            <div
              style="border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: #f8f9fa;"
            >
              <iframe
                [src]="sanitizeUrl(pdfUrl)"
                style="width: 100%; height: 600px; border: none;"
                title="PDF Preview"
              >
              </iframe>
            </div>
            <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
              <button
                (click)="openPdfInNewTab()"
                style="
                  background: linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%); 
                  color: white; 
                  padding: 10px 20px; 
                  border: none; 
                  border-radius: 6px; 
                  cursor: pointer; 
                  font-size: 14px;
                  font-weight: 600;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 6px rgba(111, 66, 193, 0.1);
                "
              >
                <span style="display: flex; align-items: center; gap: 8px;">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Abrir en nueva pestaña
                </span>
              </button>

              <button
                (click)="downloadPdf()"
                style="
                  background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
                  color: white; 
                  padding: 10px 20px; 
                  border: none; 
                  border-radius: 6px; 
                  cursor: pointer; 
                  font-size: 14px;
                  font-weight: 600;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.1);
                "
              >
                <span style="display: flex; align-items: center; gap: 8px;">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Descargar PDF
                </span>
              </button>
            </div>
            <p style="margin-top: 10px; color: #666; font-size: 14px;">
              💡 <strong>Tip:</strong> Si no ves el PDF en el iframe, prueba "Abrir en nueva
              pestaña" o descárgalo directamente.
            </p>
          </div>
        }

        <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 6px;">
          <h4 style="color: #495057; margin-bottom: 8px;">📋 Características de esta versión:</h4>
          <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
            <li>Usando <strong>pdf-lib</strong> - librería moderna y ligera</li>
            <li>Sin dependencias de fuentes externas</li>
            <li>Generación 100% client-side</li>
            <li>Tabla nutricional personalizada</li>
            <li>Footer con numeración de página</li>
            <li>🆕 <strong>Preview en tiempo real</strong> - Visualiza antes de descargar</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      button:hover:not(:disabled) {
        background: linear-gradient(135deg, #0056b3 0%, #004085 100%) !important;
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(0, 123, 255, 0.15);
      }
      button:disabled {
        background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%) !important;
        cursor: not-allowed;
        transform: none;
      }
    `,
  ],
})
export class RecipeV2PdfDemoComponent {
  mockRecipe = MOCK_RECIPE;
  loading = false;
  error: string | null = null;
  success = false;

  // Propiedades para el preview
  previewLoading = false;
  previewError: string | null = null;
  previewSuccess = false;
  pdfUrl: string | null = null;
  pdfBytes: Uint8Array | null = null;

  constructor(
    private pdf: RecipeV2PdfService,
    private sanitizer: DomSanitizer,
  ) {}

  async download() {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      console.log('🚀 Iniciando generación de PDF con pdf-lib...');
      await this.pdf.downloadRecipePdf(this.mockRecipe);
      this.success = true;
      console.log('✅ PDF generado exitosamente con pdf-lib');
    } catch (err) {
      this.error = 'Error al generar el PDF. Revisa la consola para más detalles.';
      console.error('❌ PDF generation error (pdf-lib):', err);
    } finally {
      this.loading = false;
    }
  }

  async generatePreview() {
    this.previewLoading = true;
    this.previewError = null;
    this.previewSuccess = false;
    this.pdfUrl = null;

    try {
      console.log('🚀 Iniciando generación de preview con pdf-lib...');

      // Generar el PDF y obtener los bytes
      this.pdfBytes = await this.pdf.generateRecipePdfBytes(this.mockRecipe);

      // Crear URL para el preview
      const blob = new Blob([this.pdfBytes as any], { type: 'application/pdf' });
      this.pdfUrl = URL.createObjectURL(blob);

      this.previewSuccess = true;
      console.log('✅ Preview generado exitosamente con pdf-lib');
    } catch (err) {
      this.previewError = 'Error al generar el preview. Revisa la consola para más detalles.';
      console.error('❌ Preview generation error (pdf-lib):', err);
    } finally {
      this.previewLoading = false;
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openPdfInNewTab() {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
    }
  }

  async downloadPdf() {
    if (!this.pdfBytes) return;

    try {
      const blob = new Blob([this.pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const safeName = this.mockRecipe.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '');
      link.download = `receta-${safeName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar URL
      URL.revokeObjectURL(url);
    } catch (err) {
      this.error = 'Error al descargar el PDF.';
      console.error('Download error:', err);
    }
  }

  ngOnDestroy() {
    // Limpiar URL del preview cuando el componente se destruye
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl);
    }
  }
}
