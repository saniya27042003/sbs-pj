import { Component } from '@angular/core';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-login',
  imports: [TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
