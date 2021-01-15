import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Messages';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_message(record) {
    console.log(record);

    return this.firestore.collection(this.collectionName).add(record);
  }

  read_messages() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
}