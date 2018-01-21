import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app'
import { AppModuleNgFactory } from './app.ngfactory'

platformBrowserDynamic()
  .bootstrapModuleFactory(AppModuleNgFactory);
