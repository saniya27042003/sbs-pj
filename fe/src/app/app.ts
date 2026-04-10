import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public translateService: TranslateService) {}

  onLanguageChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'en' | 'mr';
    this.translateService.setLanguage(value);
  }
}
