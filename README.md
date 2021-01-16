# Examen Topicos 14-01-2021
## Métodos implementados: 
### Login:

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
    

