import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Candidat } from "src/app/modeles/candidat";
import { Experience } from "src/app/modeles/experience";
import { Formation } from "src/app/modeles/Formation";
import { CandidatService } from "src/app/service/candidate.service";
import { CvParserService } from "src/app/service/cv/cv-parser.service";
import { PdfReaderService } from "src/app/service/cv/pdf-reader.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"],
})
export class ProfilComponent {
  editMode = false;
  candidat: Candidat | null = null;
  newCompetence = "";
  newExperience: Experience = { poste: "", entreprise: "", duree: "" };
  //aucun idee
  cvText: string = "";
  newLangue: string = "";
  newFormation: Formation = { diplome: "", ecole: "", annee: "" };
  experience: Experience = { poste: "", entreprise: "", duree: "" };
  // Formations
  formationForms: Formation[] = [];
  experienceForms: any[] = [];
  selectedFileName: string = "";
  constructor(
    private router: Router,
    private candidatService: CandidatService,
    private pdfReader: PdfReaderService,
    private cvParser: CvParserService
  ) {}

  ngOnInit() {
    // ✅ Initialisation immédiate pour éviter candidat = null
    this.candidat = this.getEmptyCandidat();

    this.candidatService.getCandidatConnecte().subscribe({
      next: (candidat) => {
        if (!candidat) {
          console.warn("⚠️ Aucun candidat reçu");
          return;
        }

        this.candidat = candidat;

        // ✅ Initialisation sécurisée des tableaux
        this.candidat.langues ??= [];
        this.candidat.competences ??= [];
        this.candidat.formations ??= [];
        this.candidat.experiences ??= [];

        // ✅ Mise à jour du statut
        this.candidat.status = this.candidatService.getStatus(this.candidat);

        console.log("👤 Profil candidat chargé :", this.candidat);
      },
      error: (err) => {
        console.error("❌ Erreur chargement candidat :", err);
      },
    });
  }

  // ✅ Gestion des fichiers PDF CV
  async onCvUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const texte = await this.pdfReader.extraireTexte(file);
      const infos = this.cvParser.extraireInformations(texte);
      console.log("📄 Infos détectées depuis le CV :", infos);

      // auto-remplissage partiel
      this.candidat!.username = infos.nom || this.candidat!.username;
      this.candidat!.email = infos.email || this.candidat!.email;
      this.candidat!.phone = infos.telephone || this.candidat!.phone;
      this.candidat!.adresse = infos.adresse || this.candidat!.adresse;
      this.candidat!.competences =
        infos.competences || this.candidat!.competences;
      this.candidat!.langues = infos.langues || this.candidat!.langues;
      this.candidat!.formations = infos.formations || this.candidat!.formations;
      this.candidat!.experiences =
        infos.experiences || this.candidat!.experiences;

      //  this.candidat!.formations = infos.formations || this.candidat!.competences;

      if (this.candidat) {
        this.candidat.status = this.candidatService.getStatus(this.candidat);
        alert("✅ CV analysé avec succès ! Informations ajoutées.");
      }
    } catch (error) {
      console.error("Erreur lecture CV :", error);
      alert("❌ Erreur lors de l’analyse du CV.");
    }
  }

  extraireInfosCandidat(texte: string) {
    // Exemple très simple (tu peux améliorer avec des regex)
    const email = texte.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    const phone = texte.match(/\+?\d[\d\s().-]{7,}/);

    console.log("📧 Email détecté :", email ? email[0] : "Aucun");
    console.log("📞 Téléphone détecté :", phone ? phone[0] : "Aucun");
  }
  get candidatSafe(): Candidat {
    return (
      this.candidat ?? {
        refId: 0,
        username: "",
        email: "",
        fonction: "",
        status: "active",
        phone: "",
        photo: "../../assets/user.png",
        competences: [],
        experiences: [],
        formations: [],
        favoris: [],
        cv: "",
      }
    );
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }
  retour() {
    this.router.navigate(["/offres-emploi"]);
  }

  savecandidat() {
    if (!this.candidat) return;

    // Mettre à jour le status et progression localement
    this.candidat.status = this.candidatService.getStatus(this.candidat);
    this.candidat.progression = this.candidatService.getProgression(  this.candidat  );

    this.candidatService.updateCandidat(this.candidat).subscribe({
      next: (updated) => {
        this.candidat = updated;
        this.editMode = false;
        alert("✅ Profil mis à jour avec succès");
      },
      error: (err) => {
        console.error(err);
        alert("❌ Erreur lors de la mise à jour du profil");
      },
    });
  }

  addCompetence(newSkill: string) {
    if (!newSkill || !newSkill.trim()) {
      // Champ vide ou uniquement des espaces
      alert("Veuillez saisir une compétence valide !");
      return;
    }

    if (this.candidat) {
      this.candidat.competences.push(newSkill.trim());
      this.newCompetence = ""; // Réinitialiser le champ
    }
  }

  removeCompetence(index: number) {
    if (
      this.candidat &&
      this.candidat.competences &&
      index > -1 &&
      index < this.candidat.competences.length
    ) {
      // Supprimer la compétence à l'index donné
      this.candidat.competences.splice(index, 1);
    }
  }

  addExperience(newExp: Experience) {
    if (this.candidat) {
      this.candidat.experiences.push(newExp);
    }
  }

  addFormation() {
    if (
      !this.newFormation.diplome ||
      !this.newFormation.ecole ||
      !this.newFormation.annee
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (this.candidat) {
      // ✅ Vérifie que candidat n'est pas null
      if (!this.candidat.formations) {
        this.candidat.formations = []; // init si undefined
      }
      this.candidat.formations.push({ ...this.newFormation });

      // Reset du formulaire
      this.newFormation = { diplome: "", ecole: "", annee: "" };
    }
  }

  changerPhoto(photoPath: string) {
    if (this.candidat) {
      this.candidat.photo = photoPath;
      this.candidatService.updatePhoto(this.candidat.refId, photoPath);
    }
  }
  //

  get progression(): number {
    if (!this.candidat) return 0;
    return this.candidatService.getProgression(this.candidat);
  }

  addLangue() {
    if (!this.newLangue.trim()) return;
    if (!this.candidat) return;

    this.candidat.langues!.push(this.newLangue.trim());
    this.newLangue = "";
  }

  removeLangue(index: number) {
    if (!this.candidat) return;
    this.candidat.langues!.splice(index, 1);
  }

  // ===================== EXPÉRIENCES =====================
  addExperienceForm() {
    // Ajouter un objet vide pour afficher les 3 champs
    this.experienceForms.push({ poste: "", entreprise: "", duree: "" });
  }

  saveExperience(idx: number) {
    const newExp = this.experienceForms[idx];
    if (!this.candidat) this.candidat = this.getEmptyCandidat();
    if (!this.candidat!.experiences) this.candidat!.experiences = [];
    this.candidat!.experiences.push({ ...newExp });
    this.experienceForms.splice(idx, 1); // Retirer le formulaire dynamique
  }

  removeFormExperience(idx: number) {
    this.experienceForms.splice(idx, 1); // Annuler la saisie
  }

  removeExperience(idx: number) {
    if (this.candidat && this.candidat.experiences) {
      this.candidat.experiences.splice(idx, 1); // Supprimer expérience existante
    }
  }

  // ===================== FORMATIONS =====================
  addFormationForm() {
    // Ajouter un objet vide pour afficher les 3 champs
    this.formationForms.push({ diplome: "", ecole: "", annee: "" });
  }

  saveFormation(idx: number) {
    const newForm = this.formationForms[idx];
    if (!this.candidat) this.candidat = this.getEmptyCandidat();
    if (!this.candidat!.formations) this.candidat!.formations = [];
    this.candidat!.formations.push({ ...newForm });
    this.formationForms.splice(idx, 1); // Retirer le formulaire dynamique
  }

  removeFormFormation(idx: number) {
    this.formationForms.splice(idx, 1); // Annuler la saisie
  }

  removeFormation(idx: number) {
    if (this.candidat && this.candidat.formations) {
      this.candidat.formations.splice(idx, 1); // Supprimer formation existante
    }
  }
  getEmptyCandidat(): Candidat {
    return {
      refId: 0,
      username: "",
      status: "active",
      cv: "",
      formations: [],
      experiences: [],
      competences: [],
    };
  }

  // puis
}
