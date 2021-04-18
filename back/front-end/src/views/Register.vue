<template>
  <div class="container">
    <div class="row content-login d-flex justify-content-center align-items-center text-center">
      <form @submit="agregarUsuario()">
        <h1>CREAR USUARIO NUEVO</h1>
        <input type="text" class="form-control my-2 text-center" placeholder="USER" v-model="usuario.role">
        <input type="text" class="form-control my-2 text-center" placeholder="Nombre de usuario" v-model="usuario.nombre">
        <input type="text" class="form-control my-2 text-center" placeholder="Correo" v-model="usuario.email">
        <input type="text" class="form-control my-2 text-center" placeholder="contraseña" v-model="usuario.pass">
        <b-button class="btn-success my-2 btn-block" type="@submit"> Crear </b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            usuario:  { nombre: '', email: '@taskhappy.com', pass: '', role: 'USER'},
        }
    },
    methods: {
      agregarUsuario(){
        this.axios.post('/nuevo-usuario', this.usuario)
         .then(res => {
            console.log(res.data);
            this.usuarios.push = (res.data);
            this.usuario.nombre = '';
            this.usuario.email = '';
            this.usuario.pass = '';
            this.usuario.role = '';
            this.$router.push('/login')

         })
         .catch(e => {
             console.log(e.response);
         })
      },
    },
    created(){
      this.agregarUsuario();
    },
}
</script>

<style scoped>
.content-login{
    height: 90vh;
    width: 80%;
    margin: 0 auto;
}
h1 {
    color: #7868E6;
    font-weight: 800;
    margin: 20px 0;
}
button{
    color: azure;
    font-weight: 700;
    background: #7868E6 !important;
    height: 56px !important;
    border-radius: 2rem;
    border-style: none;
}
.form-control {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    font-weight: 700;
    background-color: #f5f5f5;
    background-clip: padding-box;
    border: 1px solid #ced4da00;
    border-radius: 1.25rem;
}
input{
  border-radius: 20rem !important;
  height: 56px !important;
  font-weight: 700;
  color: #A4A4A4;
}
</style>