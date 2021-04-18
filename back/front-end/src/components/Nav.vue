<template>
  <div id="app">
    <div >
      <b-navbar toggleable="lg"  variant="info">
    <b-navbar-brand href="#">TaskHappy</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" v-if="!estaActivo">Inicio</b-nav-item>
        <b-nav-item to="/usuarios" v-if="estaActivo" >Usuarios</b-nav-item>
        <b-nav-item to="/login" v-if="!estaActivo">login</b-nav-item>
        <b-nav-item to="/register" v-if="!estaActivo">Registar</b-nav-item>
        <b-nav-item to="/tareas" v-if="estaActivo">Tareas</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto"  v-if="estaActivo">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="cerrarSeccion()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data(){
    return {

    }
  },
  methods:{
    ...mapActions(['cerrarSeccion', 'leerToken'])
  },
  computed: {
    ...mapGetters(['estaActivo'])
  },
  created(){
    this.leerToken();
  }
}
</script>

<style scoped>
body{
  background:#ffffff!important;
}
nav.navbar.navbar-light.bg-info.navbar-expand-lg{
    background-color: #b8b5ff!important;
}
.navbar-light .navbar-toggler{
  background: #ffffff;
}
.navbar-light .navbar-nav .nav-link {
    color: rgb(255 255 255 / 86%)  !important;
    font-weight: 600;
}
.navbar-light .navbar-nav .nav-link:hover {
    color: #007bff !important; 
    font-weight: 600;
}
.navbar-light .navbar-brand {
    color: white !important;
    font-weight: 800;
}
.navbar-light .navbar-brand {
    color: white;
}
</style>
