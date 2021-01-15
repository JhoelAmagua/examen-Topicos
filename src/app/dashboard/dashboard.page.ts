// dashboard.page.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/observable';

interface MessageData {
  Name: string;
  Message: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  messageList = [];
  messageData: MessageData;
  messageForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private storage: AngularFireStorage
  ) { 
    this.messageData = {} as MessageData;

  }

  @ViewChild('imageUser') inputImageUser: ElementRef;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

    this.messageForm = this.fb.group({
      Name: this.userEmail,
      Message: ['', [Validators.required]],
    })

    this.firebaseService.read_messages().subscribe(data => {

      this.messageList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['Name'],
          Message: e.payload.doc.data()['Message'],
        };
      })

    });

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  CreateRecord() {
    this.firebaseService.create_message(this.messageForm.value)
      .then(resp => {
        //Reset form
        console.log(this.userEmail);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
