import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Report } from './report/report';
import { Signup } from './signup/signup';
import { SabhasadMaster } from './sabhasad-master/sabhasad-master';
import { SabhasadVargani } from './sabhasad-vargani/sabhasad-vargani';
import { TransactionDetail } from './transaction-detail/transaction-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'report', component: Report },
  { path: 'sabhasad-master', component: SabhasadMaster },
  { path: 'sabhasad-vargani', component: SabhasadVargani },
  { path: 'transaction-detail', component: TransactionDetail },
];
