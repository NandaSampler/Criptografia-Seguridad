<!-- src/views/Criptografia.vue -->
<template>
  <div class="crypto-courses-container">
    <h1>Módulo de Criptografía</h1>

    <div class="crypto-courses-grid">
      <router-link
        v-for="(cifrado, index) in cifrados"
        :key="index"
        :to="cifrado.ruta"
        class="crypto-courses-card"
      >
        <h2>{{ cifrado.nombre }}</h2>
        <p>{{ cifrado.descripcion }}</p>
        <div class="crypto-courses-link">Ver más →</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import '@/assets/crypto-courses.css';

export default {
  name: 'Criptografia',
  data() {
    return {
      cifrados: [
        {
          nombre: 'Cifrado de Polibio',
          ruta: '/polibio',
          descripcion: 'Convierte letras en pares de números con una tabla 5x5.'
        },
        {
          nombre: 'Escítala Espartana',
          ruta: '/escitala',
          descripcion: 'Transposición simple de caracteres por columnas.'
        },
        {
          nombre: 'Código César',
          ruta: '/cesar',
          descripcion: 'Desplaza letras del alfabeto según una clave numérica.'
        },
        {
          nombre: 'Máquina Enigma',
          ruta: '/enigma',
          descripcion: 'Cifrado con rotores y reflejo, basado en la máquina real.'
        },
        {
          nombre: 'Cifrado de Alberti',
          ruta: '/alberti',
          descripcion: 'Cifrado polialfabético con clave rotativa.'
        }
      ]
    };
  }
};
</script>