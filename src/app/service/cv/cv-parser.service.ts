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
  const regex = /(\+213|0)(5|6|7)\d{8}\b/;
  const match = texte.match(regex);
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
  const section = texte.match(
    /Expériences?\s*([\s\S]*?)(?=Formation|Compétences|Langues|$)/i
  );
  if (!section) return [];

  const lignes = section[1]
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const experiences: Experience[] = [];

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i].replace('•', '').trim();

    // Data Analyst – DataPlus (2021–2025)
    const match = ligne.match(
      /(.*?)\s*[–-]\s*(.*?)\s*\((\d{4}\s*[–-]\s*\d{4})\)/i
    );

    if (match) {
      const poste = match[1].trim();
      const entreprise = match[2].trim();
      const duree = match[3].replace(/\s/g, '');

      let description = '';
      if (lignes[i + 1] && !lignes[i + 1].startsWith('•')) {
        description = lignes[i + 1];
        i++; // sauter la ligne description
      }

      experiences.push({ poste, entreprise, duree, description });
    }
  }

  return experiences;
}

private extraireFormations(texte: string): Formation[] {
  const section = texte.match(
    /Formation\s*([\s\S]*?)(?=Expériences?|Experience|Compétences|Langues|$)/i
  );
  if (!section) return [];

  const lignes = section[1]
    .split('\n')
    .map(l => l.replace(/[•]/g, '').trim())
    .filter(Boolean);

  const formations: Formation[] = [];

  lignes.forEach(ligne => {
    const match = ligne.match(
      /(Licence|Master|Ingénieur|BTS|Doctorat|Certificat|Diplôme)\s*(?:en\s*)?(.*?)\s*[–-]\s*(.*?)\s*\(?(\d{4})?\)?$/i
    );

    if (match) {
      formations.push({
        diplome: match[1],
        ecole: `${match[2]} - ${match[3]}`.trim(),
        annee: match[4] || ''
      });
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
