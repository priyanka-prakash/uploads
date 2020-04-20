import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-uploader';
  selectedFile:File  = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';

    fileChangeEvent(event: any): void {
        console.log("event:",event);
        this.imageChangedEvent = event;
        this.selectedFile =  <File>event.target.files[0];
    }
    onUpload(){
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload',fd, {
            reportProgress:true,
            observe:'events'
        }).
        subscribe( event => {
            if(event.type === HttpEventType.UploadProgress){
                console.log("progress:"+ Math.round( event.loaded / event.total * 100) + "%");
            }else if(event.type == HttpEventType.Response){
                console.log(event);
            }
           
        });
    }

    constructor(private http:HttpClient){
        // https://w3path.com/new-angular-8-file-upload-or-image-upload/
    }





    //kljsdlkALK;Jdfjklksdjflaks;djflaskjdfisldjflkds

    imageCropped(event: ImageCroppedEvent) {
        console.log("croppper ",event);
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}
