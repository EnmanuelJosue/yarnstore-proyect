import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { DownloadUploadFilesComponent } from './components/download-upload-files/download-upload-files.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'all',
    component: AllComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'clothes',
    component: ClothesComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'electronics',
    component: ElectronicsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'download-upload',
    component: DownloadUploadFilesComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
