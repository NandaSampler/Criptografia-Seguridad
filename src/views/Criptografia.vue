<template>
  <div class="container">
    <h1>Módulo de Criptografía</h1>

    <div class="card-grid">
      <router-link
        v-for="(cifrado, index) in cifrados"
        :key="index"
        :to="cifrado.ruta"
        class="card"
      >
        <h2>{{ cifrado.nombre }}</h2>
        <p>{{ cifrado.descripcion }}</p>
        <div class="link">Ver más →</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Criptografia',
  data() {
    return {
      cifrados: [
        { nombre: 'Cifrado de Polibio', ruta: '/polibio', descripcion: 'Convierte letras en pares de números con una tabla 5x5.' },
        { nombre: 'Escítala Espartana', ruta: '/escitala', descripcion: 'Transposición simple de caracteres por columnas.' },
        { nombre: 'Código César', ruta: '/cesar', descripcion: 'Desplaza letras del alfabeto según una clave numérica.' },
        { nombre: 'Máquina Enigma', ruta: '/enigma', descripcion: 'Cifrado con rotores y reflejo, basado en la máquina real.' },
        { nombre: 'Cifrado de Alberti', ruta: '/alberti', descripcion: 'Cifrado polialfabético con clave rotativa.' }
      ]
    };
  }
};
</script>
