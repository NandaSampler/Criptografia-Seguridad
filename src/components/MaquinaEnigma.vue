<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #7f8c8d;">Máquina Enigma</h2>

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

    <div v-if="pasos.length" class="cipher-output" style="margin-top: 1rem;">
      <strong>Pasos:</strong>
      <ul>
        <li v-for="(paso, i) in pasos" :key="i">{{ paso }}</li>
      </ul>
    </div>

    <div v-if="resultado" class="cipher-warning">
      ✅ Este método fue revolucionario en su época, con millones de combinaciones posibles gracias a sus rotores y
      clavijas.
      <strong>Aunque ya ha sido superado, es un gran ejemplo de criptografía mecánica avanzada.</strong>
    </div>
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
      pasos: []
    };
  },
  methods: {
    procesar() {
      // Reinicia completamente
      const textoInicial = this.texto;
      const claveInicial = this.clave;

      this.resultado = '';
      this.pasos = [];

      const { resultado, pasos } = procesarEnigmaConPasos(textoInicial, claveInicial);
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
    }
  }
};
</script>
