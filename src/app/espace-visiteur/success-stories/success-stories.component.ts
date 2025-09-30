import { Component, ElementRef, ViewChild } from '@angular/core';

interface SuccessStory {
  nom: string;
  role: string;
  entreprise: string;
  temoignage: string;
  photo: string;
}

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent {
  stories: SuccessStory[] = [
    {
      nom: "Sarah B.",
      role: "Développeuse Frontend",
      entreprise: "TechCorp",
      temoignage: "Grâce à cette plateforme, j’ai trouvé mon premier emploi en CDI en moins de 2 mois !",
      photo: "assets/images/sarah.jpg"
    },
    {
      nom: "Ali M.",
      role: "Chef de Projet",
      entreprise: "Smart Solutions",
      temoignage: "Une expérience fluide et des offres de qualité, j’ai pu évoluer dans ma carrière.",
      photo: "assets/images/ali.jpg"
    },
    {
      nom: "Entreprise XYZ",
      role: "Partenaire",
      entreprise: "Entreprise XYZ",
      temoignage: "Nous avons recruté plusieurs talents motivés grâce à cette plateforme.",
      photo: "assets/images/company.jpg"
    }
  ]; @ViewChild('slider', { static: false }) slider!: ElementRef;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -300,   // largeur approximative d'une carte + gap
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
  
}
