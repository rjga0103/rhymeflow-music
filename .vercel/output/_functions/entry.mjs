import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CJscYYqu.mjs';
import { manifest } from './manifest_Bnb7utqh.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/admin.astro.mjs');
const _page4 = () => import('./pages/artistas/_slug_.astro.mjs');
const _page5 = () => import('./pages/artistas.astro.mjs');
const _page6 = () => import('./pages/aviso-legal.astro.mjs');
const _page7 = () => import('./pages/contacto.astro.mjs');
const _page8 = () => import('./pages/politica-cookies.astro.mjs');
const _page9 = () => import('./pages/politica-privacidad.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/admin.ts", _page3],
    ["src/pages/artistas/[slug].astro", _page4],
    ["src/pages/artistas/index.astro", _page5],
    ["src/pages/aviso-legal.astro", _page6],
    ["src/pages/contacto.astro", _page7],
    ["src/pages/politica-cookies.astro", _page8],
    ["src/pages/politica-privacidad.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f70bcaa7-9275-44de-bce7-7a8cdfa28fca",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
