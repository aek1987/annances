import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CvParserService {

  extraireInformations(cvText: string) {
    const email = this.extraireEmail(cvText);
    const telephone = this.extraireTelephone(cvText);
    const nom = this.extraireNom(cvText);
    const poste = this.extraireTitre(cvText);
    const competences = this.extraireCompetences(cvText);
    const langues = this.extraireLangues(cvText);

    return {
      nom,
      email,
      telephone,
      poste,
      competences,
      langues
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

  private extraireLangues(texte: string): string[] {
    const section = texte.match(/Langue(?:[\s\S]*?)(?=Centre|Intérêt|$)/i);
    if (!section) return [];
    const lignes = section[0].split(/:|,|\/|•/).map(s => s.trim()).filter(Boolean);
    return lignes;
  }
}
