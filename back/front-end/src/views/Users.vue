<template>
  <div>
    <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged">
      {{ mensaje.texto }} 
    </b-alert>

    <div class="container">
      <div class="row justify-content-center">
        <div class="content-edit" @submit.prevent="editarUsuario(usuarioEditar)" v-if="editar">
          <form class="color">
          <h1 class="text-center">Editar usuario</h1>
          <input type="text" class="form-control my-2" placeholder="Nombre de usuario" v-model="usuarioEditar.nombre">
          <input type="text" class="form-control my-2" placeholder="Correo" v-model="usuarioEditar.email">
          <input type="text" class="form-control my-2" placeholder="contraseña" v-model="usuarioEditar.pass">
          <input type="text" class="form-control my-2" placeholder="Rol User" v-model="usuarioEditar.role">
            <div class="style-button"> 
              <b-button class="btn-warning my-2 btn-block" type="@submit"> Modificar usuario</b-button>
            <b-button class="my-2 btn-block" type="@submit" @click="editar = false"> cancelar </b-button>
            </div>
        </form>
        </div>
      </div>
    </div>

    <br />

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 card-deck" v-for="(item, index) in usuarios" :key="index">
          <div class="card">
            <img src="" class="card-img-top" alt="">
            <div class="card-body">
              <p class="role card-text">{{item.role}}</p>
              <h5 class="card-title">{{item.nombre}}</h5>
                <span>Registrado desde:</span>

              <p class="card-text"><small class="text-muted">{{item.date}}</small></p>
              <a class="btn-primary btn-sm mx-2" @click="buttonClicked(item._id)">Mirar</a>
              <a class="btn-warning btn-sm" @click="activarUsuario(item._id)" >Editar</a>
              <a class="btn-danger btn-sm mx-2" @click.prevent="eliminarUsuario(item._id)"  >Eorrar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario:  { nombre: '', email: '', pass: '', role: ''},
            usuarios: [],
            mensaje: { color: '', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            usuarioEditar: {},
            editar: false,
            agregar: false,

        }
    },
    methods: {
      alerta(){
        this.mensaje.color = 'success';
        this.mensaje.texto = 'Probando alerta';
        this.showAlert();
      },
      listaUsuarios(){
        this.axios.get('/usuarios')
         .then(res => {
            console.log(res.data);
            this.usuarios = res.data
         })
         .catch(e => {
             console.log(e.response);
         })
      },
      buttonClicked(id) {
        //this.$router.push('/usuario/' + id)
        this.axios.get(`/usuario/${id}`)
        .then(res => {
            console.log(res.data);
            this.$router.push(`/usuario/${id}`)
          })
          .catch(err => {
            console.log(err.response);
          })
      },
      eliminarUsuario(id){
          console.log(id)
          this.axios.delete(`/usuario/${id}`)
           .then(res =>{
               const index = this.ususario.findIndex(item => item._id === res.data._id);
               this.usuario.splice(index, 1)
           })
           .catch(e =>{
               console.log(e.response)
           })
      },
      activarUsuario(id){
        this.editar = true;
        console.log(id);
        this.axios.get(`/usuario/${id}`)
          .then(res => {
            this.usuarioEditar = res.data;
          })
          .catch(e =>{
            console.log(e.response)
          })
      },
      editarUsuario(item){
        this.axios.put(`/usuario/${item._id}`, item)
         .then(res =>{
           const index = this.usuarios.findIndex(u => u._id === res.data._id)
           this.usuarios[index].nombre = res.data.nombre;
           this.usuarios[index].email = res.data.email;
           this.usuarios[index].pass = res.data.pass;
           this.usuarios[index].role = res.data.role;
           this.mensaje.color = 'success';
           this.mensaje.texto = 'Usuario editado';
           this.showAlert();
           this.editar = false;
         })
         .catch(e => {
           console.log(e.response)
         })
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    },
    created(){
      this.listaUsuarios();
    },
}
</script>


<style scoped>
.card-deck{
  padding: 10px;

}
.card{
  background: #c3c7ff !important;
    border-style: none;
    border-radius: 2rem;
    padding: 2rem;
}
h1.text-center {
  color: #7868E6;
  font-weight: 600;

}
a{
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  border-radius: 1rem;
}
h5{
  color: #212529;
  font-weight: 800;
  font-size: 1.7rem;
}
p{
  color: white;
}
p.role{
  color: #77b8ff;
    font-weight: 800;
}
.role {
    background: #212529;
    padding: 0.3rem;
    border-radius: 3.2rem;
    text-align: center;
}
.content-edit{
  background: #ffffff;
  z-index: 10;
  position: fixed;
  padding: 20px;
  display: inline;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  top: 0px;
}
form{
  margin: 0 auto;
  height: 100vh;
}
input {
    width: 300px;
    margin: 0 auto;
    height: 56px;
    border-radius: 2rem;
    text-align: center;
    font-weight: 600;
    color: #A4A4A4;
    background: #E5E5E5;
    border-style: none;
}
.style-button{
   width: 300px;
  margin: 0 auto;;
}
.btn-warning.btn-block.btn-secondary {
    background: #7868E6;
    border-style: none;
    color: white;
    height: 56px;
    border-radius: 2rem;
    font-weight: 700;
}
button.btn.my-2.btn-block {
    border-radius: 2rem;
    height: 56px;
    color: white;
    font-weight: 800;
}
.text-muted {
    font-weight: 600;
    color: #000000 !important;
}
span {
    font-size: 0.9rem;
}
.card-body {
    text-align: center;
}
</style>