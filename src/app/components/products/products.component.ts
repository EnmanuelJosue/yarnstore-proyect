import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  mostrar = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  agregar = false;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
    if (this.showProductDetail === false) {
      this.mostrar = false;
    }
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id).subscribe(
      (data) => {
        console.log('id', data);

        this.productChosen = data;
        this.statusDetail = 'success';
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
  }
  // readAndUpdate(id: string) {
  //   this.productsService
  //     .fetchReadAndUpdate(id, { title: 'change' })
  //     .subscribe((r) => {
  //       const read = r[0];
  //       const update = r[1];
  //       console.log('leyendo', read);
  //       console.log('Actualizando', update);
  //     });
  // }

  formLoaded(event: any) {
    console.log('h', event);
    this.productsService.create(event).subscribe((data) => {
      this.products.unshift(data);
      Swal.fire({
        title: 'Nuevo producto creado con exito',
        icon: 'success',
        confirmButtonText: 'Volver',
      });
    });
  }
  updateProduct() {
    this.mostrar = !this.mostrar;
  }
  updateLoaded(event: any) {
    const id = this.productChosen.id;
    this.productsService.update(id, event).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
      Swal.fire({
        title: 'Producto editado con exito',
        icon: 'success',
        confirmButtonText: 'Volver',
      });
    });
    setTimeout(() => {
      this.mostrar = !this.mostrar;
    }, 1000);
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
      Swal.fire({
        title: 'Eliminado con exito',
        icon: 'success',
        confirmButtonText: 'Volver',
      });
    });
  }

  loadMore() {
    if (this.activatedRoute.snapshot.url[0].path === 'all') {
      console.log('hola');
      this.productsService
        .getAllProducts(this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
    if (this.activatedRoute.snapshot.url[0].path === 'clothes') {
      const id = 1;
      this.productsService
        .getProductByCategories(id, this.limit, this.offset)
        .subscribe((data) => {
          console.log(this.limit, this.offset);

          if (data.length === 0) {
            Swal.fire({
              title: 'No hay productos',
              icon: 'warning',
              confirmButtonText: 'Volver',
            });
          }

          this.products = this.products.concat(data);

          this.offset += this.limit;
        });
    }
    if (this.activatedRoute.snapshot.url[0].path === 'electronics') {
      const id = 2;

      this.productsService
        .getProductByCategories(id, this.limit, this.offset)
        .subscribe((data) => {
          if (data.length === 0) {
            Swal.fire({
              title: 'No hay productos',
              icon: 'warning',
              confirmButtonText: 'Volver',
            });
          }

          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
  nuevoProducto() {
    this.agregar = !this.agregar;
  }
}
