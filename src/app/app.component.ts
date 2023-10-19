import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ApiService } from './api-service';
import { VersionService } from './version.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit{

  version: string = '';

  constructor(
    private versionService: VersionService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.version = this.versionService.getVersion();
  }


  title = 'file-app';
  email: string = '';
  file: File | undefined;
  fileName: string = '';
  isSent: boolean = false; // New property to track if the message is sent
  isError: boolean = false; // track if message is not sent

  // for messages
  errorTagCreated: boolean = false;
  errorFileTagCreated: boolean = false;
  emailErrorTagCreated: boolean = false;
  sentTagCreated: boolean = false;

  // Use ViewChild to access the dynamically created <p> element
  @ViewChild('sentTag', { static: false })
  sentTagElementRef!: ElementRef<HTMLParagraphElement>;

  // @ViewChild('sentTagId', { static: false })
  // sentTagElementRef!: ElementRef<HTMLParagraphElement>;

  // constructor(
  //   private apiService: ApiService,
  //   private versionService: VersionService // Add this line
  // ) {
  //   this.version = this.versionService.getVersion();
  // }

   // constructor(private versionService: VersionService) {}

  // constructor(private apiService: ApiService) {} // Inject ApiService in the constructor



 selectedFiles: File[] = [];



  onFileChange(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      // Loop through the selected files and check if they are PDF files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
          this.selectedFiles.push(file);
        }
      }

      this.fileName =
        this.selectedFiles.length === 1
          ? this.selectedFiles[0].name
          : `${this.selectedFiles.length} files selected`;
    } else {
      this.fileName = 'No files chosen';
      this.selectedFiles = [];
    }
  }

  // Method to remove a selected file
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.fileName =
      this.selectedFiles.length === 1
        ? this.selectedFiles[0].name
        : `${this.selectedFiles.length} files selected`;
  }


  sendFile() {

    if (this.selectedFiles.length === 0 && this.email === '') {
      this.isError = true;
      this.nothingError();
      return;
    } else if (this.email === '') {
      this.isError = true;
      this.createErorTag();
      return;
    } else if (this.selectedFiles.length === 0) {
      this.isError = true;
      this.createErorTagFile();
      return;
    }
    // else if(this.sentTagCreated === true){
    //   this.createTag()
    // }


    const callbackUrl = `mailto:${this.email}`;

    this.selectedFiles.forEach((file) => {
      this.apiService.sendFile(file, this.email, callbackUrl).subscribe(
        (response) => {
          console.log("API response:", response);
          this.isSent = true;
          setTimeout(() => {
            this.isSent = false;
          }, 3000);
        },
        (error) => {
          console.error("API error:", error);
        }
      );
      this.createTag();
    });

    this.selectedFiles = [];
    this.fileName = 'Ni iznranih datotek';
  }





    private nothingError() {
      if (!this.errorTagCreated) {
        this.errorTagCreated = true;
        const isErrortTag = document.createElement('p');
        isErrortTag.className = 'errorTag';
        isErrortTag.id = 'errorTagId';
        isErrortTag.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
        isErrortTag.innerText = 'Polja so prazna!';
        // Apply styles to the created <p> element
        // isErrortTag.style.marginTop = '40px';
        isErrortTag.style.position = 'relative';
        isErrortTag.style.width = '8%';
        isErrortTag.style.height = '5%';
        isErrortTag.style.textAlign = 'center';
        isErrortTag.style.fontWeight = '900';
        isErrortTag.style.fontSize = '12px';
        isErrortTag.style.top = '50%';
        isErrortTag.style.left = '50%';
        isErrortTag.style.transform = 'translate(-50%, -50%)';
        isErrortTag.style.backgroundColor = '#fa1905';
        isErrortTag.style.padding = '5px 20px';
        isErrortTag.style.borderRadius = '26px 26px 26px 26px';
        isErrortTag.style.color = 'white';
        isErrortTag.style.fontWeight = 'bold';


        document.body.appendChild(isErrortTag);

        // Automatically delete the <p> element after 15 seconds
        setTimeout(() => {
          if (isErrortTag && isErrortTag.parentNode) {
            isErrortTag.parentNode.removeChild(isErrortTag);
            this.errorTagCreated = false;
          }
        }, 2500);
      }
    }


       //error for file
    private createErorTagFile () {
      if (!this.errorFileTagCreated) {
        this.errorFileTagCreated = true;
        const isErrortTag = document.createElement('p');
        isErrortTag.className = 'errorTag';
        isErrortTag.id = 'errorTagId';
        isErrortTag.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
        isErrortTag.innerText = 'Ni pripeta datoteka!';
        // Apply styles to the created <p> element
        isErrortTag.style.position = 'relative';
        // isErrortTag.style.marginTop = '40px';
        isErrortTag.style.width = '8%';
        isErrortTag.style.height = '5%';
        isErrortTag.style.textAlign = 'center';
        isErrortTag.style.fontWeight = '900';
        isErrortTag.style.fontSize = '12px';
        isErrortTag.style.top = '50%';
        isErrortTag.style.left = '50%';
        isErrortTag.style.transform = 'translate(-50%, -50%)';
        isErrortTag.style.backgroundColor = '#fa1905';
        isErrortTag.style.padding = '5px 20px';
        isErrortTag.style.borderRadius = '26px 26px 26px 26px';
        isErrortTag.style.color = 'white';
        isErrortTag.style.fontWeight = 'bold';


        document.body.appendChild(isErrortTag);

        // Automatically delete the <p> element after 15 seconds
        setTimeout(() => {
          if (isErrortTag && isErrortTag.parentNode) {
            isErrortTag.parentNode.removeChild(isErrortTag);
            this.errorFileTagCreated = false;
          }
        }, 2500);
      }
    }



    //create error tag for email
    private createErorTag() {
      if (!this.emailErrorTagCreated) {
        this.emailErrorTagCreated = true;
        const isErrortTag = document.createElement('p');
        isErrortTag.className = 'errorTag';
        isErrortTag.id = 'errorTagId';
        isErrortTag.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
        isErrortTag.innerText = 'Ni vpisan mail!';
        // Apply styles to the created <p> element
        // isErrortTag.style.marginTop = '40px';
        isErrortTag.style.position = 'relative';
        isErrortTag.style.width = '8%';
        isErrortTag.style.height = '5%';
        isErrortTag.style.textAlign = 'center';
        isErrortTag.style.fontWeight = '900';
        isErrortTag.style.fontSize = '12px';
        isErrortTag.style.top = '50%';
        isErrortTag.style.left = '50%';
        isErrortTag.style.transform = 'translate(-50%, -50%)';
        isErrortTag.style.backgroundColor = '#f22f1d';
        isErrortTag.style.padding = '5px 20px';
        isErrortTag.style.borderRadius = '26px 26px 26px 26px';
        isErrortTag.style.color = 'white';
        isErrortTag.style.fontWeight = 'bold';

        document.body.appendChild(isErrortTag);

        // Automatically delete the <p> element after 15 seconds
        setTimeout(() => {
          if (isErrortTag && isErrortTag.parentNode) {
            isErrortTag.parentNode.removeChild(isErrortTag);
            this.emailErrorTagCreated = false;
          }
        }, 2500);
      }
    }

    //create sent tag
    private createTag() {
      if (!this.sentTagCreated) {
        this.sentTagCreated = true;
        const isSentTag = document.createElement('p');
        // isSentTag.innerText = text;
        isSentTag.className = 'sentTag';
        isSentTag.id = 'sentTagId';
        isSentTag.innerText = 'Poslano';
        isSentTag.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
        // Apply styles to the created <p> element
        // isSentTag.style.marginTop = '40px';
        isSentTag.style.position = 'relative';
        isSentTag.style.width = '8%';
        isSentTag.style.height = '5%';
        isSentTag.style.textAlign = 'center';
        isSentTag.style.fontWeight = '900';
        isSentTag.style.fontSize = '12px';
        isSentTag.style.top = '50%';
        isSentTag.style.left = '50%';
        isSentTag.style.transform = 'translate(-50%, -50%)';
        isSentTag.style.backgroundColor = '#6fe344';
        isSentTag.style.padding = '5px 20px';
        isSentTag.style.borderRadius = '26px 26px 26px 26px';
        isSentTag.style.color = 'white';
        isSentTag.style.fontWeight = 'bold';

        document.body.appendChild(isSentTag);
        // this.sentTagElementRef.nativeElement.appendChild(isSentTag);

        // Automatically delete the <p> element after 15 seconds
        setTimeout(() => {
          if (isSentTag && isSentTag.parentNode) {
            isSentTag.parentNode.removeChild(isSentTag);
            this.sentTagCreated = false;
          }
        }, 2500);
      }
    }
 }


