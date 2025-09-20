import { Component } from '@angular/core';

interface JobOffer {
  id: number;
  title: string;
  description: string;
  category: string;
  salary: number;
}

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent {
  jobOffers: JobOffer[] = [
    { id: 1, title: 'Développeur Angular', description: 'Frontend Developer', category: 'IT', salary: 50000 },
    { id: 2, title: 'Chef de projet', description: 'Gestion projet', category: 'Management', salary: 60000 }
  ];

  newJob: JobOffer = { id: 0, title: '', description: '', category: '', salary: 0 };
  isEditing: boolean = false;

  addJob() {
    if (!this.newJob.title) return;
    if (this.isEditing) {
      const index = this.jobOffers.findIndex(j => j.id === this.newJob.id);
      if (index !== -1) this.jobOffers[index] = { ...this.newJob };
      this.isEditing = false;
    } else {
      this.newJob.id = this.jobOffers.length + 1;
      this.jobOffers.push({ ...this.newJob });
    }
    this.newJob = { id: 0, title: '', description: '', category: '', salary: 0 };
  }

  editJob(job: JobOffer) {
    this.newJob = { ...job };
    this.isEditing = true;
  }

  deleteJob(id: number) {
    this.jobOffers = this.jobOffers.filter(job => job.id !== id);
  }
}
