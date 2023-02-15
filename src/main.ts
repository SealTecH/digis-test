import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app-component/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
   .catch(err => console.error(err));
