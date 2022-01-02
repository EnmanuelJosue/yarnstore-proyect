import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  newProduct: FormGroup;
  updateProduct: FormGroup;
  form: any;

  @Input() showCreate = true;
  @Input() showUpdate = true;
  @Output() ngSubmit = new EventEmitter<any>();
  options = [
    { id: 1, label: 'Ropa' },
    { id: 2, label: 'Electronica' },
    { id: 3, label: 'Muebles' },
    { id: 4, label: 'Juguetes' },
    { id: 5, label: 'Otros' },
  ];
  constructor(private formBuilder: FormBuilder) {
    this.newProduct = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      images: new FormControl([`https://placeimg.com/640/480/any`]),
      price: new FormControl('', Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
    this.updateProduct = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }
  sendProduct() {
    this.form = this.newProduct.value;
    this.ngSubmit.emit(this.form);
  }

  onUpdateProduct() {
    this.form = this.updateProduct.value;

    this.ngSubmit.emit(this.form);
    this.updateProduct.reset();
  }

  // onUpload(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0);
  //   console.log(file?.name);

  //   if (file) {
  //     const dto = new FormData();
  //     dto.append('file', file.name);
  //     console.log(dto);
  //   }
  // }

  // updateProduct() {
  //   this.form = this.newProduct.value;
  //   this.ngSubmit.emit(this.form);
  // }

  ngOnInit(): void {}
}
