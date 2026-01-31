export class ModalConfirm {
  private modalElement!: HTMLElement;
  private overlayElement!: HTMLElement;
  private onConfirmCallback?: () => void;
  private onCancelCallback?: () => void;
  private overlayClickHandler?: (e: Event) => void;

  constructor() {
    this.createModal();
  }

  private createModal(): void {
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'modal-overlay';
    this.overlayElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    `;

    // Crear modal
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal-confirm';
    this.modalElement.style.cssText = `
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-width: 400px;
      width: 90%;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `;

    this.overlayElement.appendChild(this.modalElement);
    document.body.appendChild(this.overlayElement);

    this.overlayClickHandler = (e: Event) => {
      if (e.target === this.overlayElement) {
        this.onCancel();
      }
    };
    this.overlayElement.addEventListener('click', this.overlayClickHandler);
  }

  public show(message: string, onConfirm: () => void, onCancel?: () => void): void {
    this.onConfirmCallback = onConfirm;
    this.onCancelCallback = onCancel;

    this.modalElement.innerHTML = '';

    const content = document.createElement('div');
    content.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.2rem; font-family: 'FuenteTitulos', serif;">Confirmar eliminación</h3>
      <p style="margin: 0 0 1.5rem 0; color: #666; line-height: 1.5;">${message}</p>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn-cancel" style="
          padding: 10px 20px;
          border: 2px solid #000;
          background-color: white;
          color: #000;
          border-radius: 2vw;
          cursor: pointer;
          font-size: 1rem;
          font-family: 'FuenteTitulos', serif;
          transition: all 0.2s ease;
        ">Cancelar</button>
        <button class="btn-confirm" style="
          padding: 10px 20px;
          border: none;
          background-color: #dc3545;
          color: white;
          border-radius: 2vw;
          cursor: pointer;
          font-size: 1rem;
          font-family: 'FuenteTitulos', serif;
          transition: all 0.2s ease;
        ">Eliminar</button>
      </div>
    `;

    this.modalElement.appendChild(content);

    const confirmBtn = content.querySelector('.btn-confirm') as HTMLButtonElement;
    const cancelBtn = content.querySelector('.btn-cancel') as HTMLButtonElement;

    confirmBtn.addEventListener('click', () => this.onConfirm());
    cancelBtn.addEventListener('click', () => this.onCancel());

    confirmBtn.addEventListener('mouseenter', () => {
      confirmBtn.style.backgroundColor = '#c82333';
      confirmBtn.style.transform = 'translateY(-2px)';
      confirmBtn.style.boxShadow = '0 10px 20px rgba(220, 53, 69, 0.4)';
    });
    confirmBtn.addEventListener('mouseleave', () => {
      confirmBtn.style.backgroundColor = '#dc3545';
      confirmBtn.style.transform = 'translateY(0)';
      confirmBtn.style.boxShadow = 'none';
    });

    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.backgroundColor = '#000';
      cancelBtn.style.color = 'white';
      cancelBtn.style.transform = 'translateY(-2px)';
      cancelBtn.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });
    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.backgroundColor = 'white';
      cancelBtn.style.color = '#000';
      cancelBtn.style.transform = 'translateY(0)';
      cancelBtn.style.boxShadow = 'none';
    });

    this.overlayElement.style.opacity = '1';
    this.overlayElement.style.visibility = 'visible';
    this.modalElement.style.transform = 'scale(1)';
  }

  private onConfirm(): void {
    this.hide();
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
  }

  private onCancel(): void {
    this.hide();
    if (this.onCancelCallback) {
      this.onCancelCallback();
    }
  }

  private hide(): void {
    this.overlayElement.style.opacity = '0';
    this.overlayElement.style.visibility = 'hidden';
    this.modalElement.style.transform = 'scale(0.8)';
  }

  public destroy(): void {
    if (this.overlayClickHandler) {
      this.overlayElement.removeEventListener('click', this.overlayClickHandler);
    }

    if (this.overlayElement && this.overlayElement.parentNode) {
      this.overlayElement.parentNode.removeChild(this.overlayElement);
    }
  }
}
