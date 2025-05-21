<template>
  <div class="evaluador-container">
    <h2>Evalúa tu contraseña</h2>

    <div class="input-group">
      <input
        :type="mostrar ? 'text' : 'password'"
        v-model="password"
        placeholder="Escribe tu contraseña"
        class="evaluador-input"
      />
      <button class="mostrar-btn" @click="mostrar = !mostrar">
        {{ mostrar ? 'Ocultar' : 'Mostrar' }}
      </button>
    </div>

    <div v-if="password" class="evaluador-result">
      <p :class="nivelClass">
        Seguridad: <strong>{{ nivel }}</strong>
      </p>

      <div class="barra-container">
        <div
          class="barra"
          :class="nivelClass"
          :style="{ width: barraAncho + '%' }"
        ></div>
      </div>

      <ul class="evaluador-tips">
        <li v-for="(tip, i) in consejos" :key="i">⚠️ {{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Evaluador',
  data() {
    return {
      password: '',
      mostrar: false
    };
  },
  computed: {
    score() {
      const pwd = this.password;
      let score = 0;
      if (pwd.length >= 12) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/\d/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      return score;
    },
    nivel() {
      if (this.score >= 5) return 'Fuerte';
      if (this.score >= 3) return 'Media';
      return 'Débil';
    },
    nivelClass() {
      return {
        'nivel-debil': this.nivel === 'Débil',
        'nivel-media': this.nivel === 'Media',
        'nivel-fuerte': this.nivel === 'Fuerte'
      };
    },
    barraAncho() {
      return (this.score / 5) * 100;
    },
    consejos() {
      const tips = [];
      const pwd = this.password;

      if (pwd.length < 12) tips.push('Usa al menos 12 caracteres.');
      if (!/[A-Z]/.test(pwd)) tips.push('Agrega al menos una letra mayúscula.');
      if (!/[a-z]/.test(pwd)) tips.push('Incluye letras minúsculas.');
      if (!/\d/.test(pwd)) tips.push('Agrega al menos un número.');
      if (!/[^A-Za-z0-9]/.test(pwd)) tips.push('Incluye símbolos como !@#$.');

      return tips;
    }
  }
};
</script>

<style scoped>
.evaluador-container {
  padding: 30px;
  background-color: #1e1e1e;
  color: #fff;
  border-radius: 12px;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}

h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #f9b234;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.evaluador-input {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: #2a2a2a;
  color: white;
}

.mostrar-btn {
  background-color: #f9b234;
  border: none;
  color: #121212;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.mostrar-btn:hover {
  background-color: #ffd36c;
}

.evaluador-result p {
  font-size: 1.1rem;
  margin-top: 20px;
  margin-bottom: 10px;
}

.nivel-debil {
  color: #e74c3c;
}
.nivel-media {
  color: #f1c40f;
}
.nivel-fuerte {
  color: #2ecc71;
}

.barra-container {
  width: 100%;
  height: 12px;
  background-color: #333;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
}

.barra {
  height: 100%;
  transition: width 0.4s ease;
}
.barra.nivel-debil {
  background-color: #e74c3c;
}
.barra.nivel-media {
  background-color: #f1c40f;
}
.barra.nivel-fuerte {
  background-color: #2ecc71;
}

.evaluador-tips {
  list-style: none;
  padding-left: 0;
}
.evaluador-tips li {
  margin-bottom: 6px;
  font-size: 0.95rem;
}
</style>
