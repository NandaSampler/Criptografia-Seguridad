<template>
  <div class="generador-container">
    <h2>Generador de Contraseñas Seguras</h2>

    <div class="generador-opciones">
      <label><input type="radio" value="aleatoria" v-model="modo" /> Aleatoria</label>
      <label><input type="radio" value="enigma" v-model="modo" /> Enigma</label>
      <label><input type="radio" value="alberti" v-model="modo" /> Alberti</label>
      <label><input type="radio" value="personalizada" v-model="modo" /> Personalizada</label>
    </div>

    <div v-if="modo === 'aleatoria'" class="config-avanzada">
      <label>Longitud:
        <input type="number" v-model.number="longitud" min="8" max="20" />
      </label>
      <label>Excluir caracteres:
        <input type="text" v-model="excluir" placeholder="Ej: lIO0" />
      </label>
      <label>Cantidad máxima de números:
        <input type="number" v-model.number="maxNumeros" min="1" />
      </label>
      <label>Cantidad máxima de mayúsculas:
        <input type="number" v-model.number="maxMayusculas" min="1" />
      </label>
      <label>
        <input type="checkbox" v-model="incluirSimbolos" />
        Incluir símbolos
      </label>
    </div>

    <div v-if="modo === 'personalizada'" class="config-avanzada">
      <label>Frase personal:
        <input type="text" v-model="frase" placeholder="Ej: Ojos que no ven, corazón que no siente" />
      </label>
      <label>Fecha importante:
        <input type="text" v-model="fecha" placeholder="Ej: 9/07/2003" />
      </label>
      <label>Caracteres que te gustan:
        <input type="text" v-model="simbolosPreferidos" placeholder="Ej: /?#%" />
      </label>
    </div>

    <button class="generar-btn" @click="generar">Generar contraseña</button>

    <div v-if="modo === 'personalizada' && resultado" class="resultado resaltado">
      <p><strong>Contraseña generada:</strong></p>
      <p class="resultado-coloreado" v-html="contrasenaResaltada"></p>
    </div>

    <div v-else-if="resultado" class="resultado">
      <p><strong>Contraseña generada:</strong> <code>{{ resultado }}</code></p>
    </div>

    <div v-if="resultado">
      <button @click="copiar" class="copiar-btn">Copiar</button>
      <button @click="guardar" class="guardar-btn">Guardar</button>
      <p v-if="copiado" class="copiado-msg">¡Copiada al portapapeles!</p>
    </div>

    <div v-if="modo === 'personalizada' && desglose.length" class="desglose-box">
      <h3>Desglose de la contraseña personalizada</h3>
      <ul>
        <li v-for="(linea, i) in desglose" :key="i">{{ linea }}</li>
      </ul>
    </div>

    <div v-if="historial.length" class="historial">
      <h3>Historial de contraseñas guardadas</h3>
      <ul>
        <li v-for="(item, i) in historial" :key="i"><code>{{ item }}</code></li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/generador.css';
import {
  generarAleatoria,
  generarConEnigma,
  generarConAlberti,
  generarPersonalizada
} from '@/utils/generador.js';

export default {
  name: 'Generador',
  data() {
    return {
      modo: 'aleatoria',
      resultado: '',
      copiado: false,
      historial: [],
      desglose: [],
      longitud: 12,
      excluir: '',
      maxNumeros: 3,
      maxMayusculas: 3,
      incluirSimbolos: true,
      frase: '',
      fecha: '',
      simbolosPreferidos: '/?#%'
    };
  },
  computed: {
    contrasenaResaltada() {
      if (this.modo !== 'personalizada' || !this.resultado) return '';
      const simbolos = this.simbolosPreferidos.replace(/\s/g, '').split('').filter(Boolean);
      const sep = simbolos[0] || '#';
      const start = simbolos[1] || sep;
      const end = simbolos[2] || start;

      const esc = s => s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
      const regex = new RegExp(`^(${esc(start)}\\d{2}\\d{2})([A-Za-z]+)(${esc(sep)})([A-Za-z]+)(${esc(end)}\\d{3})$`);
      const match = this.resultado.match(regex);

      if (!match) return `<code>${this.resultado}</code>`;

      const [, inicio, letras1, separador, letras2, final] = match;

      return `
        <span class="color-inicio">${inicio}</span>
        <span class="color-letras">${letras1}</span>
        <span class="color-separador">${separador}</span>
        <span class="color-letras">${letras2}</span>
        <span class="color-final">${final}</span>
      `;
    }
  },
  methods: {
    generar() {
      this.copiado = false;
      this.desglose = [];

      if (this.modo === 'aleatoria') {
        this.resultado = generarAleatoria({
          longitud: this.longitud,
          excluir: this.excluir,
          maxNumeros: this.maxNumeros,
          maxMayusculas: this.maxMayusculas,
          incluirSimbolos: this.incluirSimbolos
        });
      } else if (this.modo === 'enigma') {
        const base = generarAleatoria({
          longitud: this.longitud,
          excluir: this.excluir,
          maxNumeros: this.maxNumeros,
          maxMayusculas: this.maxMayusculas,
          incluirSimbolos: this.incluirSimbolos
        });
        this.resultado = generarConEnigma(base);
      } else if (this.modo === 'alberti') {
        const base = generarAleatoria({
          longitud: this.longitud,
          excluir: this.excluir,
          maxNumeros: this.maxNumeros,
          maxMayusculas: this.maxMayusculas,
          incluirSimbolos: this.incluirSimbolos
        });
        this.resultado = generarConAlberti(base);
      } else if (this.modo === 'personalizada') {
        this.resultado = generarPersonalizada(this.frase, this.fecha, this.simbolosPreferidos);
        this.desglose = [
          `Frase: "${this.frase}"`,
          `Fecha: "${this.fecha}"`,
          `Símbolos: "${this.simbolosPreferidos}"`,
          `Resultado generado: ${this.resultado}`
        ];
      }
    },
    copiar() {
      navigator.clipboard.writeText(this.resultado).then(() => {
        this.copiado = true;
        setTimeout(() => (this.copiado = false), 2000);
      });
    },
    guardar() {
      if (this.resultado && !this.historial.includes(this.resultado)) {
        this.historial.unshift(this.resultado);
      }
    }
  }
};
</script>

<style>
.color-inicio {
  color: #f39c12;
  font-weight: bold;
}
.color-letras {
  color: #ffffff;
}
.color-separador {
  color: #1abc9c;
  font-weight: bold;
}
.color-final {
  color: #e74c3c;
  font-weight: bold;
}
</style>
