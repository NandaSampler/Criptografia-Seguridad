<template>
  <div class="password-container">
    <h1>¿Qué hace que una contraseña sea segura?</h1>

    <p>
      Una contraseña segura debe ser difícil de adivinar por personas o programas. Aquí tienes algunas recomendaciones clave:
    </p>

    <ul>
      <li>✅ Al menos <strong>12 caracteres</strong> de longitud.</li>
      <li>✅ Mezcla de <strong>mayúsculas, minúsculas, números y símbolos</strong>.</li>
      <li>❌ No uses palabras comunes, fechas de nacimiento o patrones simples.</li>
      <li>✅ Utiliza frases o combinaciones poco comunes (por ejemplo: <em>Gu4camole#Lun3s!</em>).</li>
      <li>✅ Nunca reutilices la misma contraseña en varios sitios.</li>
      <li><strong>Consejo: Para que tu contraseña sea efectiva, debes recordarla, para ello te recomendamos el modo personalizado del generador de contraseñas</strong></li>
    </ul>

    <button class="evaluate-btn" @click="mostrarEvaluador = !mostrarEvaluador">
      {{ mostrarEvaluador ? 'Ocultar evaluación' : 'Evaluar tu contraseña →' }}
    </button>

    <Evaluar v-if="mostrarEvaluador" />
    <Generador />
  </div>
</template>

<script>
import Evaluar from '@/components/Evaluar.vue';
import Generador from '@/components/Generador.vue'; 

export default {
  name: 'ContraseñaSegura',
  components: {
    Evaluar,
    Generador
  },
  data() {
    return {
      mostrarEvaluador: false
    };
  }
};
</script>

<style>
.password-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
  color: #f5f5f5;
  background-color: #121212;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(255,255,255,0.05);
}

.password-container h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #f9b234;
}

.password-container p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.password-container ul {
  list-style: none;
  padding-left: 0;
}

.password-container li {
  font-size: 1rem;
  margin-bottom: 10px;
}

.evaluate-btn {
  display: inline-block;
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #f9b234;
  color: #121212;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.evaluate-btn:hover {
  background-color: #ffd36c;
}
</style>
