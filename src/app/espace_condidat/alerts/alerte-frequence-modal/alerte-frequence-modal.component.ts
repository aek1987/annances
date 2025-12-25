import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alerte-frequence-modal',
  templateUrl: './alerte-frequence-modal.component.html',
  styleUrls: ['./alerte-frequence-modal.component.css']
})
export class AlerteFrequenceModalComponent implements OnChanges {

  @Input() visible: boolean = false;
  @Input() frequenceActuelle: "quotidienne" | "hebdomadaire" | "mensuelle" | "Immediate" = 'quotidienne';
  
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<"quotidienne" | "hebdomadaire" | "mensuelle" | "Immediate">();

  // ✅ tableau typé pour Angular
  readonly frequences: Array<"quotidienne" | "hebdomadaire" | "mensuelle" | "Immediate"> = 
      ["Immediate", "quotidienne", "hebdomadaire", "mensuelle"];

  frequenceSelectionnee: "quotidienne" | "hebdomadaire" | "mensuelle" | "Immediate" = 'quotidienne';

ngOnChanges() {
 console.log('Modal visible:', this.visible, 'Frequence actuelle:', this.frequenceActuelle);
  this.frequenceSelectionnee = this.frequenceActuelle;
}


  fermer() {
    this.close.emit();
  }

  confirmer() {
    this.confirm.emit(this.frequenceSelectionnee);
  }
}
