import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devenir-partenaire',
  templateUrl: './devenir-partenaire.component.html',
  styleUrls: ['./devenir-partenaire.component.css']
})
export class DevenirPartenaireComponent {
  partenariatForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.partenariatForm = this.fb.group({
      nomEntreprise: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      typePartenaire: ['recrutement'],
      message: ['']
    });
  }

  get nomEntrepriseInvalid() {
    const control = this.partenariatForm.get('nomEntreprise');
    return control?.invalid && (control.dirty || control.touched);
  }

  get emailInvalid() {
    const control = this.partenariatForm.get('email');
    return control?.invalid && (control.dirty || control.touched);
  }

  soumettreFormulaire() {
    if (this.partenariatForm.valid) {
      console.log('Formulaire soumis:', this.partenariatForm.value);
      alert('Votre demande de partenariat a été envoyée avec succès!');
      this.partenariatForm.reset({
        typePartenaire: 'recrutement'
      });
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
}