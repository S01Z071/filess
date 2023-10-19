// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private apiBaseUrl = 'https://app-test.sodisce.si/ocr/api/v1/swagger-ui/index.html#/ocr-controller/handleFileUpload'; // Replace this with the actual Swagger API URL

//   constructor(private http: HttpClient) {}

//   // Define methods to interact with the API endpoints

//   // Example:
//   getSomeData() {
//     return this.http.get(`${this.apiBaseUrl}/endpoint`);
//   }

//   // Add more methods as per your API requirements
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiBaseUrl = 'https://app-test.sodisce.si/ocr/api/v1/swagger-ui/index.html#/ocr-controller/handleFileUpload'; // Replace this with the actual Swagger API URL
  private apiBaseUrl = 'https://app-test.sodisce.si/ocr/api/v1'; // Replace this with the actual Swagger API URL
  // private apiBaseUrl = '/ocr/api/v1/v3/api-docs'; // Replace this with the actual Swagger API URL
  constructor(private http: HttpClient) {}

  sendFile(file: File, email: string, callbackUrl: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('email', email);
    formData.append('callbackUrl', callbackUrl);

    return this.http.post<any>(`${this.apiBaseUrl}/document`, formData);
  }

  // Add more methods as per your API requirements
}