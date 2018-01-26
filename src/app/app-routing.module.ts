import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Define what routes we can take. The routes require a path as the url, and a component which it will display.
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // Default route takes you to the designated page whenever loaded
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Link to specific hero details. The ':' indicates :id is a placeholder for a specific hero id
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  // Exporting lets you use router directives available in the AppModule components that require them
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
