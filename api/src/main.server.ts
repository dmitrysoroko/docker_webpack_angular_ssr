import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModule } from './app.server'
import { AppServerModuleNgFactory } from './app.server.ngfactory'
import * as express from 'express';
import {ngExpressEngine} from './express-engine'

enableProdMode();

const app = express();

app.engine('html', ngExpressEngine({
	baseUrl: 'http://localhost:4200',
	bootstrap: [AppServerModuleNgFactory]
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.get('/api/', (req, res) => {
	res.render('index', {req});
});

app.get('/api/lazy', (req, res) => {
	res.render('index', {req});
});

app.listen(8080,() => {
	console.log('listening...')
});
