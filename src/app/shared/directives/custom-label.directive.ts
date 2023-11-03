import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  // variables a utiliza
  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red';
  private _errors?: ValidationErrors | null

  // metodos input
  @Input() set color(value: string) {
    this._color = value;

    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value
    this.clearMessages();
    this.setErrorMessage();
  }

  // ciclo de vida
  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }

  ngOnInit(): void {
    this.setStyle()
  }

  // metodos personalizados
  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = ''
      return;
    }

    const errors = Object.keys(this._errors);

    errors.forEach(error => {
      switch (error) {
        case 'required':
          this.htmlElement!.nativeElement.innerText = this.htmlElement!.nativeElement.innerText.concat('Este elemento es requerido \n')
          break;
        case 'minlength':
          this.htmlElement!.nativeElement.innerText = this.htmlElement!.nativeElement.innerText.concat(`Minimo 6 caracteres (Actualmente: ${this._errors!['minlength'].actualLength}) \n`)
          break;
        case 'email':
          this.htmlElement!.nativeElement.innerText = this.htmlElement!.nativeElement.innerText.concat('Debe ser un email \n')
          break;
      }
    });
  }

  clearMessages(): void {
    if (!this.htmlElement) return;
    if (this._errors) {
      this.htmlElement.nativeElement.innerText = ''
      return;
    }
  }
}
