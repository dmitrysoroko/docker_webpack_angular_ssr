import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { AppComponent }     from './app.component';
import { routing }     from './routing';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
      AppComponent,
      AboutComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'my-app' }),
      routing
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
