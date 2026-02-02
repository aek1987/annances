import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ask-ia',
  templateUrl: './ask-ia.component.html',
  styleUrls: ['./ask-ia.component.css']
})
export class AskIAComponent {

  messages: { role: string; text: string }[] = [];
  question: string = '';

  constructor(private http: HttpClient) {}

  send() {
    if (!this.question.trim()) return;

    // Message utilisateur
    this.messages.push({ role: 'User', text: this.question });

    this.http.post<any>('https://job-ia-1.onrender.com/api/chat', {
      message: this.question
    }).subscribe({
      next: (res) => {
        this.messages.push({ role: 'IA', text: res.reply });
      },
      error: () => {
        this.messages.push({ role: 'IA', text: 'Erreur IA 😢' });
      }
    });

    this.question = '';
  }
}
