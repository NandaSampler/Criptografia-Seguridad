<template>
  <div class="cipher-container">
    <h2 class="cipher-title" style="color: #8e44ad;">
      Cifrado de Alberti
    </h2>

    <p class="cipher-description">
      Usa un disco con múltiples alfabetos para modificar el cifrado según una clave rotativa. Es un sistema
      polialfabético temprano.
    </p>

    <label class="cipher-label">Texto:</label>
    <input v-model="texto" class="cipher-input" />

    <label class="cipher-label">Clave:</label>
    <input v-model="clave" class="cipher-input" />

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
      🔐 Este cifrado polialfabético rotativo fue uno de los más avanzados de su tiempo.  
      <strong>Más seguro que los cifrados monoalfabéticos, aunque aún vulnerable sin claves modernas, si lo usas para crear tu contraseña asegurate de usar una clave difícil.</strong>
    </div>

    <router-link to="/criptografia" class="cipher-back-button">
      ← Volver
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Alberti',
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
    cifrar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      const abc = 'abcdefghijklmnopqrstuvwxyz';
      const texto = this.texto.toLowerCase();
      const clave = this.clave.toLowerCase();
      let resultadoParcial = '';

      const procesar = (i) => {
        if (i >= texto.length) return;

        const letra = texto[i];
        const letraClave = clave[i % clave.length];

        if (abc.includes(letra)) {
          const p = abc.indexOf(letra);
          const k = abc.indexOf(letraClave);
          const cifrada = abc[(p + k) % 26];

          resultadoParcial += cifrada;
          this.pasos.push(`'${letra}' + '${letraClave}' → '${cifrada}'`);
        } else {
          resultadoParcial += letra;
          this.pasos.push(`'${letra}' no se cifra`);
        }

        this.resultado = resultadoParcial;
        setTimeout(() => procesar(i + 1), 400);
      };

      procesar(0);
    },

    descifrar() {
      this.resultado = '';
      this.pasos = [];
      this.copiado = false;

      const abc = 'abcdefghijklmnopqrstuvwxyz';
      const texto = this.texto.toLowerCase();
      const clave = this.clave.toLowerCase();
      let resultadoParcial = '';

      const procesar = (i) => {
        if (i >= texto.length) return;

        const letra = texto[i];
        const letraClave = clave[i % clave.length];

        if (abc.includes(letra)) {
          const c = abc.indexOf(letra);
          const k = abc.indexOf(letraClave);
          const descifrada = abc[(c - k + 26) % 26];

          resultadoParcial += descifrada;
          this.pasos.push(`'${letra}' - '${letraClave}' → '${descifrada}'`);
        } else {
          resultadoParcial += letra;
          this.pasos.push(`'${letra}' no se descifra`);
        }

        this.resultado = resultadoParcial;
        setTimeout(() => procesar(i + 1), 400);
      };

      procesar(0);
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
