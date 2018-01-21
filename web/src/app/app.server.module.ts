import { NgModule }               from '@angular/core';
import { ServerModule }           from '@angular/platform-server';
import { BrowserModule }    from '@angular/platform-browser';
import { ModuleMapLoaderModule }  from '@nguniversal/module-map-ngfactory-loader';

import { AppModule }              from './app.module';
import { AppComponent }           from './app.component';

@NgModule({
  imports: [
      AppModule,
      ServerModule,
      ModuleMapLoaderModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppServerModule { }
