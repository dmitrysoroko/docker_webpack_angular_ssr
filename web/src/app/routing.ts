import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'about', component: AboutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
