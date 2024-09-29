import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { LogoutGuard } from './services/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule',
    canActivate: [LoginGuardGuard],
  },
  { 
    path: 'sala/:name', 
    loadChildren: './pages/sala/sala.module#SalaPageModule',
    canActivate: [LoginGuardGuard]
  },
  { 
    
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule', canActivate: [LogoutGuard]
  },
  { path: 'signin', loadChildren: './login/signin.module#SigninPageModule', canActivate: [LogoutGuard] },
  { path: '**', redirectTo: 'home',  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
