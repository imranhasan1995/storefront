import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
})
export class ProductsComponent {
users = signal<any[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.loading.set(true);
    this.http.get<any[]>('http://127.0.0.1:8000/api/externaldata/').subscribe({
      next: (data) => {
        this.users.set(data);   // <-- update signal
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
