<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #8e44ad;">
      Cifrado de Polibio
    </h2>

    <p class="cipher-description">
      Utiliza una tabla 5x5 para convertir letras en pares de números según su posición. Fue usado para enviar
      mensajes codificados con señales.
    </p>

    <label for="input" class="cipher-label">Texto:</label>
    <input id="input" v-model="texto" class="cipher-input" />

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
      ⚠️ Este cifrado produce solo números, lo que lo hace predecible.
      <strong>No se recomienda usarlo para contraseñas modernas.</strong>
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
import { cifrarPolibio, descifrarPolibio } from '../utils/polibio';

export default {
  name: 'CifradoPolibio',
  data() {
    return {
      texto: '',
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

      let resultadoParcial = '';
      const texto = this.texto.toLowerCase().replace(/j/g, 'i');
      const tabla = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'k'],
        ['l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u'],
        ['v', 'w', 'x', 'y', 'z']
      ];

      const procesarLetra = (i) => {
        if (i >= texto.length) return;

        const char = texto[i];

        if (/[a-z]/.test(char)) {
          let fila = -1;
          let col = -1;
          for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
              if (tabla[r][c] === char) {
                fila = r + 1;
                col = c + 1;
              }
            }
          }
          if (fila !== -1 && col !== -1) {
            resultadoParcial += `${fila}${col} `;
            this.pasos.push(`'${char}' → ${fila}${col}`);
          }
        } else {
          resultadoParcial += char + ' ';
          this.pasos.push(`'${char}' no se cifra`);
        }

        this.resultado = resultadoParcial.trim();
        setTimeout(() => procesarLetra(i + 1), 800);
      };

      procesarLetra(0);
    },

    descifrar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      let resultadoParcial = '';
      const texto = this.texto.replace(/\s+/g, '');
      const tabla = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'k'],
        ['l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u'],
        ['v', 'w', 'x', 'y', 'z']
      ];

      let i = 0;

      const procesarPar = () => {
        if (i >= texto.length) return;

        const digitos = texto.slice(i, i + 2);

        if (digitos.length === 2 && /^[1-5]{2}$/.test(digitos)) {
          const fila = parseInt(digitos[0]) - 1;
          const col = parseInt(digitos[1]) - 1;
          const letra = tabla[fila][col];
          resultadoParcial += letra;
          this.pasos.push(`${digitos} → '${letra}'`);
        } else {
          resultadoParcial += digitos;
          this.pasos.push(`'${digitos}' no se descifra`);
        }

        this.resultado = resultadoParcial;
        i += 2;
        setTimeout(procesarPar, 800);
      };

      procesarPar();
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
