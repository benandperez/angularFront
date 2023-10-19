import { Component, Input  } from '@angular/core';
@Component({
  selector: 'error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css'],
})
export class ErrorMessagesComponent {
  @Input()
  color: string = 'alert-danger';
  @Input() mensaje = 'No cumples con el Score, presiona Click en lista de usuarios del menu para regresar';
  @Input() showModal:boolean = true;

	close() {
		this.showModal = false
	}

}
