import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './apiServices/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor(private api:ApiService ) {}
  ngOnInit() {
    this.api.getReminders().subscribe(data => {
      console.log(data);
    });
  }
}
