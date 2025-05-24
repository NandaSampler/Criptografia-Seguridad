<template>
  <div class="home-container">
    <h1>Bienvenido a Criptografía Web</h1>

    <div class="intro-crypto">
      <h2>¿Qué es la criptografía?</h2>
      <p>
        La criptografía es el arte de proteger la información mediante técnicas de codificación
        que impiden que personas no autorizadas puedan entenderla. Desde la antigüedad hasta la era digital,
        ha sido esencial para la seguridad en la comunicación y el resguardo de datos sensibles.
      </p>
    </div>

    <div class="home-content">
      <section class="home-section">
        <h2>Cifrado de Polibio</h2>
        <p>
          Inventado en la Antigua Grecia, este método usa una cuadrícula 5×5
          (fila, columna) para convertir cada letra en un par numérico.
          Tradicionalmente se fusionan “I” y “J” en un solo casillero.
          Su sencillez permitió intercambios rápidos de mensajes en el ejército,
          aunque hoy se considera débil frente a análisis de frecuencia.
          Se aprende fácilmente y sienta las bases de los cifrados por sustitución.
        </p>
      </section>

      <section class="home-section">
        <h2>Escítala Espartana</h2>
        <p>
          Procedente de Esparta, consiste en enrollar una tira de pergamino
          alrededor de un bastón de diámetro conocido. Al escribir el mensaje
          sobre el bastón y luego desenrollar, las letras quedan dispersas.
          Sólo quien posee el bastón del mismo grosor puede reordenarlo.
          Es un cifrado por transposición que ilustra la importancia de la posición
          en la criptografía.
        </p>
      </section>

      <section class="home-section">
        <h2>Código César</h2>
        <p>
          Atribuido a Julio César, desplaza cada letra del alfabeto un número
          fijo de posiciones (por defecto tres). Por ejemplo, “A→D”, “B→E”, etc.
          Fue efectivo en la Roma antigua, pero hoy se rompe en milisegundos
          por fuerza bruta, ya que sólo hay 25 posibles desplazamientos.
          Sirve como introducción a los cifrados de sustitución monoalfabética.
        </p>
      </section>

      <section class="home-section">
        <h2>Máquina Enigma</h2>
        <p>
          Máquina electro-mecánica usada por Alemania en la Segunda Guerra Mundial.
          Incorporaba 3–5 rotores intercambiables, un panel de clavijas
          (“plugboard”) y un reflector que cambiaba la ruta cifrada.
          Cada pulsación giraba los rotores, modificando la clave continuamente.
          Su complejidad (~10^114 combinaciones) fue finalmente rota por el equipo
          de Bletchley Park con las “Bombas”, sentando las bases de la criptografía moderna.
        </p>
      </section>

      <section class="home-section">
        <h2>Cifrado de Alberti</h2>
        <p>
          Propuesto en 1467 por Leon Battista Alberti, fue el primer sistema
          polialfabético práctico. Consiste en dos discos concéntricos con alfabetos,
          uno fijo y otro giratorio. Tras un conjunto de caracteres cifrados,
          el disco rotativo cambia posición, alterando la correspondencia letra-cipher.
          Esto complicaba enormemente el análisis de frecuencias frente
          a los métodos monoalfabéticos.
        </p>
      </section>
    </div>

  <div class="home-button-wrapper">
  <router-link to="/criptografia" class="home-button">
    Descubre cómo usar estos métodos criptográficos →
  </router-link>
</div>
  </div>
</template>

<script>
import '@/assets/home.css';

export default {
  name: 'Home',
};
</script>
