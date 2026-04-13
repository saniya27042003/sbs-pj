import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgIf, RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    public translateService: TranslateService,
    private router: Router,
    public authService: AuthService,
  ) {}

  get showNavbar(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/signup';
  }

  onLanguageChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'en' | 'mr';
    this.translateService.setLanguage(value);
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
