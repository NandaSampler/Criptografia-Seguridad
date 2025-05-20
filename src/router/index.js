// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Criptografia from '../views/Criptografia.vue';
import CifradoPolibio from '../components/CifradoPolibio.vue';
import EscitalaEspartana from '../components/EscitalaEspartana.vue';
import CodigoCesar from '../components/CodigoCesar.vue';
import MaquinaEnigma from '../components/MaquinaEnigma.vue';
import Alberti from '../components/Alberti.vue';

const routes = [
  // Ahora la raíz muestra Home
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },

  // Módulo Criptografía
  { path: '/criptografia', component: Criptografia },

  // Cada algoritmo
  { path: '/polibio', component: CifradoPolibio },
  { path: '/escitala', component: EscitalaEspartana },
  { path: '/cesar', component: CodigoCesar },
  { path: '/enigma', component: MaquinaEnigma },
  { path: '/alberti', component: Alberti },

  // Opción de fallback
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
