import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { RegisterProduct } from './pages/register-product/register-product';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'registrar-producto',
        component: RegisterProduct
    },
    {
        path: 'registrar-producto/:id',
        component: RegisterProduct
    }
];
