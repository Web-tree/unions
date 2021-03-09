import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './unions/add/add.component';
import {AuthGuard} from './_guards/AuthGuard';
import {ApplyTokenComponent} from './common/apply-token/apply-token.component';
import {AboutComponent} from './about/about.component';
import {SingleComponent} from './unions/single/single.component';
import {MyComponent} from './unions/my/my.component';

const routes: Routes = [
  {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'applyToken', component: ApplyTokenComponent},
  {path: 'about', component: AboutComponent},
  {path: 'my', component: MyComponent},
  {path: 'u/:unionId', component: SingleComponent},
  {path: '**', redirectTo: "/about"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
