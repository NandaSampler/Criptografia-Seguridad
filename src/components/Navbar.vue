<template>
  <header class="navbar">
    <div class="navbar-content">
      <div class="navbar-logo">
        <router-link to="/">🔐 CriptografíaWeb</router-link>
      </div>
      <button class="hamburger" @click="menuAbierto = !menuAbierto">
        ☰
      </button>
      <nav :class="['nav-links', { abierto: menuAbierto }]">
        <router-link to="/" exact-active-class="activo" @click="menuAbierto = false">Inicio</router-link>
        <router-link to="/criptografia" active-class="activo" @click="menuAbierto = false">Criptografia</router-link>
        <router-link to="/seguridad" active-class="activo" @click="menuAbierto = false">Contraseña Segura</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuAbierto: false
    };
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #1e1e1e;
  border-bottom: 2px solid #f9b234;
  padding: 10px 20px;
}


.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}


.navbar-logo a {
  color: #f9b234;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  margin-right: 40px;
}

.hamburger {
  background: none;
  border: none;
  color: #f9b234;
  font-size: 1.5rem;
  display: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: auto;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffd36c;
}

.nav-links .activo {
  color: #f9b234;
  border-bottom: 2px solid #f9b234;
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

 .nav-links {
  display: flex;
  gap: 20px;
  margin-left: 20px;
}

  .nav-links.abierto {
    display: flex;
  }

  .nav-links a {
    padding: 10px 0;
    text-align: right;
  }

* {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}
}
</style>
