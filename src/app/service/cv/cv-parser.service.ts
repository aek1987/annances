import { Injectable } from '@angular/core';
import { Experience } from 'src/app/modeles/experience';
import { Formation } from 'src/app/modeles/Formation';

@Injectable({
  providedIn: 'root'
})
export class CvParserService {

  extraireInformations(cvText: string) {
    const email = this.extraireEmail(cvText);
    const telephone = this.extraireTelephone(cvText);
    const nom = this.extraireNom(cvText);
     const adresse = this.extraireAdresse(cvText);
    const poste = this.extraireTitre(cvText);
    const competences = this.extraireCompetences(cvText);
    const langues = this.extraireLangues(cvText);
     const formations = this.extraireFormations(cvText);
     const experiences = this.extraireExperiences(cvText);

    return {
      nom,
      email,
      telephone,
      adresse,
      poste,
      competences,
      langues,
      formations,
      experiences
    };
  }

  private extraireEmail(texte: string): string {
    const match = texte.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    return match ? match[0] : '';
  }

  private extraireTelephone(texte: string): string {
    const match = texte.match(/(\+?\d{2,3}[-.\s]?)?\d{2,3}[-.\s]?\d{2,3}[-.\s]?\d{2,3}/);
    return match ? match[0] : '';
  }

  private extraireNom(texte: string): string {
    // Essaie de détecter un nom en haut du CV
    const lignes = texte.split('\n');
    const probableNom = lignes.find(l => /[A-Z][a-z]+/.test(l) && l.length < 40);
    return probableNom ? probableNom.trim() : '';
  }

  private extraireTitre(texte: string): string {
    const motsCles = ['DevOps', 'Engineer', 'Développeur', 'Fullstack', 'Backend', 'Frontend'];
    const ligne = texte.split('\n').find(l => motsCles.some(k => l.toLowerCase().includes(k.toLowerCase())));
    return ligne ? ligne.trim() : '';
  }

  private extraireCompetences(texte: string): string[] {
    const section = texte.match(/Compétences(?:[\s\S]*?)(?=Expériences|Formation|Langue|$)/i);
    if (!section) return [];
    const lignes = section[0].split(/•|-|,/).map(s => s.trim()).filter(Boolean);
    return lignes;
  }

  // 🔹 Extraction des formations
private extraireExperiences(texte: string): Experience[] {
  const section = texte.match(/Experience professionnelle\s*:\s*([\s\S]*?)(?=Formation|Compétences|Langues|$)/i);
  if (!section) return [];

  const lignes = section[1].split('\n').map(l => l.trim()).filter(Boolean);
  const experiences: Experience[] = [];

  let i = 0;
  while (i < lignes.length) {
    const ligne = lignes[i];
    // Exemple : "1. Developpeur Full-Stack - ABC Tech, Alger"
    const match = ligne.match(/\d*\.?\s*(.+?)\s*-\s*(.+)/);
    if (match) {
      const poste = match[1].trim();
      const entreprise = match[2].trim();
      let duree = '';
      // Vérifie si la prochaine ligne contient la période
      if (lignes[i+1] && /\d{4}/.test(lignes[i+1])) {
        duree = lignes[i+1].trim();
        i++;
      }
      experiences.push({ poste, entreprise, duree });
    }
    i++;
  }

  return experiences;
}

private extraireFormations(texte: string): Formation[] {
  const section = texte.match(/Formation\s*:\s*([\s\S]*?)(?=Experience|Compétences|Langues|$)/i);
  if (!section) return [];

  const lignes = section[1].split('\n').map(l => l.trim()).filter(Boolean);
  const formations: Formation[] = [];

  lignes.forEach(ligne => {
    // Exemple : "- Licence en Informatique - Universite de Technologie, Alger, 2022"
    const match = ligne.match(/(Licence|Master|Ingénieur|BTS|Doctorat|Certificat|Diplôme).*?-?\s*(.*?)(?:,?\s*(\d{4}))?$/i);
    if (match) {
      const diplome = match[1].trim();
      const ecole = match[2] ? match[2].trim() : '';
      const annee = match[3] ? match[3].trim() : '';
      formations.push({ diplome, ecole, annee });
    }
  });

  return formations;
}



  private extraireLangues(texte: string): string[] {
    const section = texte.match(/Langue(?:[\s\S]*?)(?=Centre|Intérêt|$)/i);
    if (!section) return [];
    const lignes = section[0].split(/:|,|\/|•/).map(s => s.trim()).filter(Boolean);
    return lignes;
  }
    // 🔹 Adresse
  private extraireAdresse(texte: string): string {
    // Recherche une ligne contenant des mots typiques d’adresse
    const regex = /(Adresse\s*:\s*)?([\d]{0,3}\s?\w+(?:\s\w+){0,4},?\s?\w+(?:\s\w+){0,2})/i;
    const match = texte.match(regex);
    if (match && match[2]) {
      return match[2].trim();
    }

    // Si rien trouvé, essayer de trouver une ligne avec "Rue", "Avenue", "Algérie", etc.
    const lignes = texte.split('\n');
    const probableAdresse = lignes.find(l =>
      /(Rue|Avenue|Lot|Cité|Alger|Mostaganem|Oran|Paris|France|Algérie)/i.test(l)
    );
    return probableAdresse ? probableAdresse.trim() : '';
  }
}
