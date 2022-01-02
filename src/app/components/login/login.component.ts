import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  newProduct: FormGroup;
  newLogin: FormGroup;
  form: any;
  showForm = false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private route: Router,
    private storeService: StoreService
  ) {
    this.newProduct = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.newLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  sendProduct() {
    this.form = this.newProduct.value;
    this.newProduct.reset();
    this.usersService.create(this.form).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: 'Registro exitoso',
          icon: 'success',
          confirmButtonText: 'Volver',
        });
      },
      (errorMsg) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: errorMsg,
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Volver',
        });
      }
    );
    setTimeout(() => {
      this.showForm = !this.showForm;
    }, 500);
  }

  loginUser() {
    this.form = this.newLogin.value;
    this.authService.loginAndGet(this.form.email, this.form.password).subscribe(
      (rta) => {
        Swal.fire({
          title: 'Inicio Sesión Exitoso.',
          icon: 'success',
          confirmButtonText: 'Volver',
        });
        setTimeout(() => {
          this.storeService.isUserLoggin.next(true);
          this.route.navigateByUrl('all');
        }, 1000);
      },
      (errorMsg) => {
        this.statusDetail = 'error';
        console.log(errorMsg);

        Swal.fire({
          title: errorMsg.error.message,
          text: 'No estas registrado, registrate para continuar',
          icon: 'error',
          confirmButtonText: 'Volver',
        });
      }
    );
  }

  registrar() {
    this.showForm = !this.showForm;
  }
  ngOnInit(): void {}
}
