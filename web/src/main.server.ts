import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join, resolve } from 'path';
import { readFileSync, readFile } from 'fs';
enableProdMode();
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = '/app/build';

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./app/app.server.module.ngfactory');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;

const provider = provideModuleMap(LAZY_MODULE_MAP);

app.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provider]
    })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('*', (req, res) => {
    res.render('index', { req });
});

app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
    console.log(AppServerModuleNgFactory);
    console.log(provider);
    console.log(LAZY_MODULE_MAP);
});