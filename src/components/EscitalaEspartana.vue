<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #8e44ad;">
      Escitala Espartana
    </h2>

    <p class="cipher-description">
      Cifra el mensaje al reorganizar sus letras en una matriz y leerlas por columnas. Fue utilizada por los
      espartanos con cilindros de madera.
    </p>

    <label class="cipher-label">Texto:</label>
    <input v-model="texto" class="cipher-input" />

    <label class="cipher-label">Columnas:</label>
    <input type="number" v-model.number="columnas" class="cipher-input" />

    <div class="cipher-buttons">
      <button @click="cifrar" class="btn">Cifrar</button>
      <button @click="descifrar" class="btn alt">Descifrar</button>
    </div>

    <div v-if="resultado" class="cipher-output">
      <strong>Resultado:</strong> {{ resultado }}
    </div>

    <div v-if="resultado" class="cipher-buttons">
      <button class="copiar-btn" @click="copiar">Copiar</button>
      <span v-if="copiado" class="copiado-msg">¡Copiado al portapapeles!</span>
    </div>

    <div v-if="resultado" class="cipher-warning">
      ⚠️ Este método depende del objeto físico (el cilindro) y es fácilmente vulnerable si se conoce la cantidad de columnas.  
      <strong>No es adecuado para proteger información sensible hoy en día.</strong>
    </div>

    <div v-if="pasos.length" class="cipher-output" style="margin-top: 1rem;">
      <strong>Pasos:</strong>
      <ul>
        <li v-for="(paso, i) in pasos" :key="i">{{ paso }}</li>
      </ul>
    </div>

    <router-link to="/criptografia" class="cipher-back-button">
      ← Volver
    </router-link>
  </div>
</template>

<script>
import { cifrarEscitala, descifrarEscitala } from '../utils/escitala';

export default {
  name: 'EscitalaEspartana',
  data() {
    return {
      texto: '',
      columnas: 3,
      resultado: '',
      pasos: [],
      copiado: false
    };
  },
  methods: {
    cifrar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      const textoLimpio = this.texto.replace(/\s+/g, '');
      const filas = Math.ceil(textoLimpio.length / this.columnas);
      const matriz = Array.from({ length: filas }, () => Array(this.columnas).fill(''));

      let index = 0;
      for (let r = 0; r < filas; r++) {
        for (let c = 0; c < this.columnas; c++) {
          if (index < textoLimpio.length) {
            matriz[r][c] = textoLimpio[index++];
          }
        }
      }

      let resultadoParcial = '';
      let c = 0, r = 0;

      const procesarColumna = () => {
        if (c >= this.columnas) {
          this.resultado = resultadoParcial;
          return;
        }

        if (r < filas) {
          const char = matriz[r][c];
          if (char) {
            resultadoParcial += char;
            this.pasos.push(`Letra '${char}' de fila ${r + 1}, columna ${c + 1}`);
            this.resultado = resultadoParcial;
          }
          r++;
          setTimeout(procesarColumna, 400);
        } else {
          r = 0;
          c++;
          setTimeout(procesarColumna, 400);
        }
      };

      procesarColumna();
    },

    descifrar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      const textoLimpio = this.texto.replace(/\s+/g, '');
      const filas = Math.ceil(textoLimpio.length / this.columnas);
      const matriz = Array.from({ length: filas }, () => Array(this.columnas).fill(''));

      let index = 0;
      for (let c = 0; c < this.columnas; c++) {
        for (let r = 0; r < filas; r++) {
          if (index < textoLimpio.length) {
            matriz[r][c] = textoLimpio[index++];
          }
        }
      }

      let resultadoParcial = '';
      let r = 0, c = 0;

      const procesarFila = () => {
        if (r >= filas) {
          this.resultado = resultadoParcial;
          return;
        }

        if (c < this.columnas) {
          const char = matriz[r][c];
          if (char) {
            resultadoParcial += char;
            this.pasos.push(`Letra '${char}' de fila ${r + 1}, columna ${c + 1}`);
            this.resultado = resultadoParcial;
          }
          c++;
          setTimeout(procesarFila, 400);
        } else {
          c = 0;
          r++;
          setTimeout(procesarFila, 400);
        }
      };

      procesarFila();
    },

    copiar() {
      navigator.clipboard.writeText(this.resultado).then(() => {
        this.copiado = true;
        setTimeout(() => (this.copiado = false), 2000);
      });
    }
  }
};
</script>
