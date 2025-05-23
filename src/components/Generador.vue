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
        <input type="number" v-model.number="maxNumeros" min="0" max="5" />
      </label>
      <label>Cantidad máxima de mayúsculas:
        <input type="number" v-model.number="maxMayusculas" min="0" max="5" />
      </label>
      <label><input type="checkbox" v-model="incluirSimbolos" /> Incluir símbolos</label>
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

    <div v-if="modo === 'enigma' || modo === 'alberti'" class="config-avanzada">
      <label>Clave:
        <input type="text" v-model="clave" placeholder="Ej: ABC12" maxlength="20" />
        <button @click="generarClaveAleatoria">Clave aleatoria</button>
      </label>
    </div>

    <button class="generar-btn" @click="generar">Generar contraseña</button>

    <!-- Resultado -->
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

    <!-- Enlace informativo para Enigma o Alberti -->
    <div v-if="(modo === 'enigma' || modo === 'alberti') && resultado" class="enlace-metodos">
      <p>
        Esta contraseña se generó con un texto de ingreso aleatorio.
        <router-link to="/criptografia" class="enlace-clave">
          ¿Quieres personalizar tu texto? Explora los métodos de encriptación →
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import '@/assets/generador.css';
import {
  generarAleatoria,
  generarConEnigma,
  generarConAlberti
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
      simbolosPreferidos: '/?#%',
      clave: ''
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

      const base = generarAleatoria({
        longitud: this.longitud,
        excluir: this.excluir,
        maxNumeros: this.maxNumeros,
        maxMayusculas: this.maxMayusculas,
        incluirSimbolos: this.incluirSimbolos
      });

      if (this.modo === 'aleatoria') {
        this.resultado = base;
      } else if (this.modo === 'enigma') {
        this.resultado = generarConEnigma(base, this.clave || 'KEY01');
      } else if (this.modo === 'alberti') {
        this.resultado = generarConAlberti(base, this.clave || 'KEY01');
      } else if (this.modo === 'personalizada') {
        this.resultado = this.generarPersonalizada();
      }
    },
    generarPersonalizada() {
      if (!this.frase || !this.fecha) return 'Completa los campos.';
      this.desglose = [];

      const palabras = this.frase
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/)
        .filter(Boolean);

      const inicialesRaw = palabras.map(p => p[0]);
      const iniciales = inicialesRaw.join('');
      const capitalizado = iniciales.charAt(0).toUpperCase() + iniciales.slice(1);

      const fechaNumeros = this.fecha.replace(/[^0-9]/g, '').padStart(8, '0');
      const dia = fechaNumeros.slice(0, 2).replace(/^0/, '');
      const mes = fechaNumeros.slice(2, 4).replace(/^0/, '');
      const anio = fechaNumeros.slice(4);

      const simbolos = this.simbolosPreferidos.replace(/\s/g, '').split('').filter(Boolean);
      const sep = simbolos[0] || '#';
      const start = simbolos[1] || sep;
      const end = simbolos[2] || start;

      const mitad = Math.ceil(capitalizado.length / 2);
      const parte1 = capitalizado.slice(0, mitad);
      const parte2 = capitalizado.slice(mitad);

      const contrasena = `${start}${dia}${mes}${parte1}${sep}${parte2}${end}${anio.slice(-3)}`;

      this.desglose.push(`Frase: "${this.frase}" → Iniciales: ${inicialesRaw.join(' ')}`);
      this.desglose.push(`Capitalización: ${capitalizado}`);
      this.desglose.push(`Fecha: ${this.fecha} → Día: ${dia}, Mes: ${mes}, Año: ${anio}`);
      this.desglose.push(`Símbolos usados → inicio: '${start}', separador: '${sep}', final: '${end}'`);
      this.desglose.push(`Contraseña generada: ${contrasena}`);

      return contrasena;
    },
    generarClaveAleatoria() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let clave = '';
      for (let i = 0; i < 5; i++) {
        clave += chars[Math.floor(Math.random() * chars.length)];
      }
      this.clave = clave;
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
.color-inicio { color: #f39c12; font-weight: bold; }
.color-letras { color: #ffffff; }
.color-separador { color: #1abc9c; font-weight: bold; }
.color-final { color: #e74c3c; font-weight: bold; }
</style>
