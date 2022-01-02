import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-download-upload-files',
  templateUrl: './download-upload-files.component.html',
  styleUrls: ['./download-upload-files.component.scss'],
})
export class DownloadUploadFilesComponent implements OnInit {
  rtaImg = '';
  constructor(private fileService: FilesService) {}
  download() {
    this.fileService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    console.log(element);

    const file = element.files?.item(0);
    console.log(file);

    if (file) {
      this.fileService.uploadFile(file).subscribe((rta) => {
        this.rtaImg = rta.location;
      });
    }
  }
  ngOnInit(): void {}
}
