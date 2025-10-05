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
 private extraireFormations(texte: string): Formation[] {
  const section = texte.match(/(🎓\s*)?Formations?(?:[\s\S]*?)(?=🧳|Expérience|Compétence|Langue|$)/i);
  if (!section) return [];

  const lignes = section[0]
    .split(/\n|•|-/)
    .map(l => l.trim())
    .filter(l => l.length > 0 && !/formation/i.test(l));

  const formations: Formation[] = [];
  lignes.forEach(ligne => {
    // Exemple : "2017 - 2020 Licence Informatique - Université de Mostaganem"
    const match = ligne.match(/(\d{4}).*?(Licence|Master|Ingénieur|BTS|Doctorat|Certificat|Diplôme).*?(Université|École|Institut)?\s*(.*)?/i);
    if (match) {
      const annee = match[1] || '';
      const diplome = match[2] || 'Formation';
      const ecole = match[4] || 'Établissement inconnu';
      formations.push({ diplome, ecole, annee });
    }
  });

  return formations;
}

private extraireExperiences(texte: string): Experience[] {
  const section = texte.match(/(🧳\s*)?Expériences?(?:[\s\S]*?)(?=🎓|Formation|Compétence|Langue|$)/i);
  if (!section) return [];

  const lignes = section[0].split(/\n|•|-/).map(l => l.trim()).filter(Boolean);
  const experiences: Experience[] = [];

  for (let i = 0; i < lignes.length; i++) {
    const line = lignes[i];
    if (/(Développeur|Engineer|Technicien|Manager|Chef|Consultant|Architecte|DevOps)/i.test(line)) {
      const exp: Experience = {
        poste: line,
        entreprise: lignes[i + 1] || '',
        duree: lignes[i + 2] || ''
      };
      experiences.push(exp);
    }
  }

  return experiences;
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
