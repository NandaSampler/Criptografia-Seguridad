<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #8e44ad;">
      Máquina Enigma
    </h2>
    <p class="cipher-description">
      Simula los rotores de la famosa máquina Enigma utilizada en la Segunda Guerra Mundial.
    </p>

    <label class="cipher-label">Texto:</label>
    <input v-model="texto" class="cipher-input" />

    <label class="cipher-label">Clave:</label>
    <input v-model="clave" class="cipher-input" />

    <div class="cipher-buttons">
      <button @click="procesar" class="btn">Procesar</button>
    </div>

    <div v-if="resultado" class="cipher-output">
      <strong>Resultado:</strong> {{ resultado }}
    </div>

    <div v-if="resultado" class="cipher-buttons">
      <button class="copiar-btn" @click="copiar">Copiar</button>
      <span v-if="copiado" class="copiado-msg">¡Copiado al portapapeles!</span>
    </div>

    <div v-if="pasos.length" class="cipher-output" style="margin-top: 1rem;">
      <strong>Pasos:</strong>
      <ul>
        <li v-for="(paso, i) in pasos" :key="i">{{ paso }}</li>
      </ul>
    </div>

    <div v-if="resultado" class="cipher-warning">
      ✅ Este método fue revolucionario en su época, con millones de combinaciones posibles gracias a sus rotores y clavijas.
      <strong>Es un gran ejemplo de criptografía mecánica avanzada y puede servirte para cifrar tu contraseña.</strong>
    </div>

    <!-- Botón de volver -->
    <router-link to="/criptografia" class="cipher-back-button">
      ← Volver
    </router-link>
  </div>
</template>

<script>
import { procesarEnigmaConPasos } from '../utils/enigma';

export default {
  name: 'MaquinaEnigma',
  data() {
    return {
      texto: '',
      clave: '',
      resultado: '',
      pasos: [],
      copiado: false
    };
  },
  methods: {
    procesar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      const { resultado, pasos } = procesarEnigmaConPasos(this.texto, this.clave);
      this.animarResultado(resultado, pasos);
    },
    animarResultado(resultado, pasos) {
      let acumulado = '';
      let i = 0;

      const mostrarLetra = () => {
        if (i >= resultado.length) return;
        acumulado += resultado[i];
        this.resultado = acumulado;
        this.pasos.push(pasos[i]);
        i++;
        setTimeout(mostrarLetra, 400);
      };

      mostrarLetra();
    },
    copiar() {
      navigator.clipboard.writeText(this.resultado).then(() => {
        this.copiado = true;
        setTimeout(() => {
          this.copiado = false;
        }, 2000);
      });
    }
  }
};
</script>
