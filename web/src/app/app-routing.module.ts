import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './unions/add/add.component';
import {AuthGuard} from './_guards/AuthGuard';

const routes: Routes = [
  {path: '!/add', component: AddComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
