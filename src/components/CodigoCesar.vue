<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #8e44ad;">
      Código César
    </h2>

    <p class="cipher-description">
      Cifra desplazando cada letra del mensaje un número fijo de posiciones en el alfabeto. Es uno de los métodos de
      cifrado más antiguos.
    </p>

    <label class="cipher-label">Texto:</label>
    <input v-model="texto" class="cipher-input" />

    <label class="cipher-label">Desplazamiento:</label>
    <input type="number" v-model.number="clave" class="cipher-input" />

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

    <div v-if="pasos.length" class="cipher-output" style="margin-top: 1rem;">
      <strong>Pasos:</strong>
      <ul>
        <li v-for="(paso, i) in pasos" :key="i">{{ paso }}</li>
      </ul>
    </div>

    <div v-if="resultado" class="cipher-warning">
      ⚠️ Este cifrado es extremadamente fácil de romper por fuerza bruta: sólo existen 25 combinaciones posibles.
      <strong>Evita usarlo para datos importantes o contraseñas.</strong>
    </div>

    <router-link to="/criptografia" class="cipher-back-button">
      ← Volver
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CodigoCesar',
  data() {
    return {
      texto: '',
      clave: 3,
      resultado: '',
      pasos: [],
      copiado: false
    };
  },
  methods: {
    cifrar() {
      this.pasos = [];
      this.resultado = '';
      this.copiado = false;
      let resultadoParcial = '';
      const texto = this.texto;
      const clave = this.clave;

      const procesarLetra = (i) => {
        if (i >= texto.length) return;

        const original = texto[i];
        const charCode = original.charCodeAt(0);

        if (original.match(/[a-zA-Z]/)) {
          const base = original === original.toUpperCase() ? 65 : 97;
          const nuevoCharCode = (charCode - base + clave) % 26 + base;
          const nuevo = String.fromCharCode(nuevoCharCode);
          resultadoParcial += nuevo;
          this.pasos.push(`'${original}' → '${nuevo}' (código ${charCode} → ${nuevoCharCode})`);
        } else {
          resultadoParcial += original;
          this.pasos.push(`'${original}' no se cifra (carácter especial)`);
        }

        this.resultado = resultadoParcial;
        setTimeout(() => procesarLetra(i + 1), 800);
      };

      procesarLetra(0);
    },

    descifrar() {
      this.pasos = [];
      this.resultado = '';
      this.copiado = false;
      let resultadoParcial = '';
      const texto = this.texto;
      const clave = this.clave;

      const procesarLetra = (i) => {
        if (i >= texto.length) return;

        const original = texto[i];
        const charCode = original.charCodeAt(0);

        if (original.match(/[a-zA-Z]/)) {
          const base = original === original.toUpperCase() ? 65 : 97;
          const nuevoCharCode = (charCode - base - clave + 26) % 26 + base;
          const nuevo = String.fromCharCode(nuevoCharCode);
          resultadoParcial += nuevo;
          this.pasos.push(`'${original}' → '${nuevo}' (código ${charCode} → ${nuevoCharCode})`);
        } else {
          resultadoParcial += original;
          this.pasos.push(`'${original}' no se descifra (carácter especial)`);
        }

        this.resultado = resultadoParcial;
        setTimeout(() => procesarLetra(i + 1), 800);
      };

      procesarLetra(0);
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
