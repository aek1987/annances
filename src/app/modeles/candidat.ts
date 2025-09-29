import { Experience } from "./experience";
import { Formation } from "./Formation";




export interface Candidat {
  refId: number;
  photo?: string;
  username: string;
  email?: string;
  fonction?: string;
  status: 'active' | 'desactive' ;
  phone?: string; 
  bio?: string;
  experiences: Experience[];
  competences: string[];
  cv?: string; ///🔹 chemin ou URL du CV
  adresse?: string; 
  formations: Formation[];

}
