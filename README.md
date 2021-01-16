# Examen Topicos 14-01-2021
## Link de video en onedrive:
https://epnecuador-my.sharepoint.com/:v:/g/personal/jorge_amagua01_epn_edu_ec/EdRgKWu_IVZHkW57F05sGEQBkC0WE7vwBBIYLsvcOYvyNw?e=fBYIx3
## Métodos implementados: 
### Login:
En esta primera función implementamos el código de Login, en el cual validamos que el usuario que 
ingresa al chat cuente con una cuenta registrada, de este modo se puede enlazar sus mensajes con
el respectivo usuario.

    <ion-item>
      <ion-label position="floating" color="primary">Correo</ion-label>
      <ion-input type="text" formControlName="email"></ion-input>
    </ion-item>
    <div class="validation-errors">
      <ng-container *ngFor="let validation of validation_messages.email">
        <div class="error-message"
          *ngIf="validations_form.get('email').hasError(validation.type) && (validations_form.get('email').dirty 
                 || validations_form.get('email').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>

    <ion-item>
      <ion-label position="floating" color="primary">Contraseña</ion-label>
      <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>
    </ion-item>
    <div class="validation-errors">
      <ng-container *ngFor="let validation of validation_messages.password">
        <div class="error-message"
          *ngIf="validations_form.get('password').hasError(validation.type) && (validations_form.get('password').dirty 
          || validations_form.get('password').touched)">
          {{ validation.message }}
        </div>
      </ng-container>
    </div>
    
    
### Mensajes: 
En esta parte se crea un arreglo de los mensajes que serán guardados en Firebase, 
los cuales constan de un user email, el mensaje y la foto que envíe:

      interface MessageData {
      Name: string;
      Message: string;
      photoURL: string;
      }
      
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
      photoURL: String(this.urlImage),
    })

    this.firebaseService.read_messages().subscribe(data => {

      this.messageList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['Name'],
          Message: e.payload.doc.data()['Message'],
          photoURL: this.inputImageUser.nativeElement.value,
        };
      })
    });

  }

### Función de imagenes:
En esta sección creamos la función implementada para lograr capturar las imágenes enviadas, 
guardarlas con un id randómico y los datos con los que se guardan.
      onUpload(e) {
        const id = Math.random().toString(36).substring(2);
        const file = e.target.files[0];
        const filePath = `images/${id}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
        console.log("foto", file);
      }
