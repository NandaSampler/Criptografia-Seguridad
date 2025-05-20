import { createRouter, createWebHistory } from 'vue-router';

import Criptografia from '../views/Criptografia.vue';
import CifradoPolibio from '../components/CifradoPolibio.vue';
import EscitalaEspartana from '../components/EscitalaEspartana.vue';
import CodigoCesar from '../components/CodigoCesar.vue';
import MaquinaEnigma from '../components/MaquinaEnigma.vue';
import Alberti from '../components/Alberti.vue';


const routes = [
  { path: '/', redirect: '/criptografia' },
  { path: '/criptografia', component: Criptografia },
  { path: '/polibio', component: CifradoPolibio },
  { path: '/escitala', component: EscitalaEspartana },
  { path: '/cesar', component: CodigoCesar },
  { path: '/enigma', component: MaquinaEnigma },
  { path: '/alberti', component: Alberti }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
