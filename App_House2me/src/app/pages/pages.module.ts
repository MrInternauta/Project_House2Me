import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagesPage } from './pages.page';
import { HomePage } from './home/home.page';
import { ListPage } from './list/list.page';
import { SalaPage } from './sala/sala.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PagesPage,
    HomePage,
    ListPage,
    SalaPage
  ],
  exports: [
    PagesPage,
    HomePage,
    ListPage,
    SalaPage
  ]
})
export class PagesPageModule {}
