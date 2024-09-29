// import { Routes, RouterModule } from '@angular/router';
// import { PagesPage } from './pages.page';
// import { LoginGuardGuard } from '../services/guards/login-guard.guard';
// import { AdminGuardGuard } from '../services/guards/admin-guard.guard';
// import { HomePage } from './home/home.page';
// import { ListPage } from './list/list.page';
// import { SalaPage } from './sala/sala.page';

// const pageRute: Routes = [
//     {
//         path: '',
//         component: PagesPage,
//         canActivate: [LoginGuardGuard],
//         children: [
//             {path: 'home', component: HomePage},
//             // {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
//             // {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
//             // {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
//             // {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
//             {path: 'list', component: ListPage},
//             {path: 'profile', component: SalaPage},
//             {path: '', redirectTo : '/home', pathMatch: 'full'}
//         ]
//     },
//     {
//         path: '',
//         component: PagesPage,
//         canActivate: [AdminGuardGuard],
//         children: [
//             //{path: 'categoria', component: CategoriaComponent, data: {titulo: 'Categorias'}},
//             //{path: 'participante', component: ParticipanteComponent, data: {titulo: 'Participantes'}}
//         ]
//     }
// ];
// export const PAGES_ROUTES =  RouterModule.forChild(pageRute);
