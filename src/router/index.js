import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Criptografia from '../views/Criptografia.vue';
import CifradoPolibio from '../components/CifradoPolibio.vue';
import EscitalaEspartana from '../components/EscitalaEspartana.vue';
import CodigoCesar from '../components/CodigoCesar.vue';
import MaquinaEnigma from '../components/MaquinaEnigma.vue';
import Alberti from '../components/Alberti.vue';
import ContrasenaSegura from '../views/ContrasenaSegura.vue'; // 👈 nuevo

const routes = [
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },

  { path: '/criptografia', component: Criptografia },
  { path: '/polibio', component: CifradoPolibio },
  { path: '/escitala', component: EscitalaEspartana },
  { path: '/cesar', component: CodigoCesar },
  { path: '/enigma', component: MaquinaEnigma },
  { path: '/alberti', component: Alberti },

  { path: '/seguridad', component: ContrasenaSegura }, // ✅ nueva ruta

  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // 👈 Esto fuerza el scroll al inicio
  }
});

export default router;
