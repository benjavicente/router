import { Component } from '@angular/core'
import { RouterProvider } from '@tanstack/angular-router-experimental'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterProvider],
  template: '<router-provider />',
})
export class App {}
