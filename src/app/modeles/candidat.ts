import { Experience } from "./experience";
import { Formation } from "./Formation";

export interface Candidat {
  refId: number;
  photo?: string;
  username: string;
  email?: string;
  fonction?: string;
  status:
    | "active"
    | "desactive"
    | "en_attente_validation"
    | "incomplet"
    | "pret";
  phone?: string;
  bio?: string;
  cv: string; ///🔹 chemin ou URL du CV
  adresse?: string;
  progression?: number;
  langues?: string[];
  formations: Formation[];
  experiences: Experience[];
  competences: string[]; // 🔹 Ajouté ici
  favoris?: number[];
}
