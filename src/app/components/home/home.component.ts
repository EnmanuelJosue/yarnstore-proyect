import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToAll() {
    this.router.navigateByUrl('all');
  }
  goToClothes() {
    this.router.navigateByUrl('clothes');
  }
  goToElectronics() {
    this.router.navigateByUrl('electronics');
  }
  goToDownload() {
    this.router.navigateByUrl('download-upload');
  }
  goToHome() {
    this.router.navigateByUrl('home');
  }
  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
