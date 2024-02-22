import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() mode: any;
  @Input() names: any;
  @Input() url: any;
  @Input() method: any;
  @Input() multiple: any;
  @Input() disabled: any;
  @Input() accept: any;
  @Input() maxFileSize: any;
  @Input() auto = true
  @Input() withCredentials: any;
  @Input() invalidFileSizeMessageSummary: any;
  @Input() invalidFileSizeMessageDetail: any;
  @Input() invalidFileTypeMessageSummary: any;
  @Input() invalidFileTypeMessageDetail: any;
  @Input() previewWidth: any;
  @Input() chooseLabel = 'Choose'
  @Input() uploadLabel = 'Upload'
  @Input() cancelLabel = 'Cancel'
  @Input() customUpload: any;
  @Input() showUploadButton: any;
  @Input() showCancelButton: any;
  @Input() dataUriPrefix: any;
  @Input() showUploadInfo: any;
  @Input() files: File[] = [];

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  @Output() uploadedFiles: EventEmitter<File[]> = new EventEmitter();

  inputFileName: string = '';


  constructor(private sanitizer: DomSanitizer) { }

  onClick(event: Event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onFileSelected(event: any) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);
      }
    }
    this.uploadedFiles.emit(this.files);
  }

  removeFile(file: File) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }
}
