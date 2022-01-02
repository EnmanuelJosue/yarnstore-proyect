import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadUploadFilesComponent } from './download-upload-files.component';

describe('DownloadUploadFilesComponent', () => {
  let component: DownloadUploadFilesComponent;
  let fixture: ComponentFixture<DownloadUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadUploadFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
