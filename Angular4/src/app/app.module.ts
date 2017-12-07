import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { D3NEComponent } from './d3ne/d3ne.component'

@NgModule({
  declarations: [
    AppComponent,
    D3NEComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
