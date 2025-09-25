import { Experience } from "./experience";




export interface Candidat {
  refId: number;
  photo?: string;
  username: string;
  email?: string;
  fonction?: string;
  phone?: string;
  competences?: string[];
  bio?: string;
  experiences?: Experience[];
  cv?: string;   // 🔹 chemin ou URL du CV
}
