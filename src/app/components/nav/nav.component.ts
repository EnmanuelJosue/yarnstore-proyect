import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;

  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router
  ) {
    this.storeService.isUserLoggin$.subscribe((value) => {
      if (value) {
        this.login();
      } else {
        this.profile = null;
      }
    });
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    if (localStorage.getItem('token')) {
      this.authService.profile().subscribe(
        (rta) => {
          this.profile = rta;
        },
        (errorMsg) => {
          if (errorMsg.error.statusCode === 401) {
            localStorage.removeItem('token');
          }
        }
      );
    }
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  login() {
    if (localStorage.getItem('token')) {
      this.authService.profile().subscribe((rta) => {
        this.profile = rta;
      });
    } else {
      this.router.navigateByUrl('login');
      this.toggleMenu();
    }

    // this.authService
    //   .loginAndGet('manolo@gmail.com', '1212')
    //   .subscribe((rta) => {
    //     console.log(rta);

    //     this.profile = rta;
    //     // this.token = '---'; // Antes enviaba el token pero como ahora tengo un servicio de una vez lo envio en el, que llama 2 a la vez con un switchmap para evitar el callback hell
    //   });
  }
  logOut() {
    localStorage.removeItem('token');
    this.storeService.isUserLoggin.next(false);
    this.router.navigateByUrl('home');
  }
  goToAll() {
    this.router.navigateByUrl('all');
    this.toggleMenu();
  }
  goToClothes() {
    this.router.navigateByUrl('clothes');
    this.toggleMenu();
  }
  goToElectronics() {
    this.router.navigateByUrl('electronics');
    this.toggleMenu();
  }
  goToDownload() {
    this.router.navigateByUrl('download-upload');
    this.toggleMenu();
  }
  goToHome() {
    this.router.navigateByUrl('home');
  }
}
