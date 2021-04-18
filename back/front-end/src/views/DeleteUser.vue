<template>
  <div>
    <h1>Edit Delete user</h1>
    <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
      {{ mensaje.texto }} 
    </b-alert>
    <form @submit.prevent="editarUsuario(usuarioEditar)" v-if="editar">
      <input type="text" class="form-control my-2" placeholder="Nombre de usuario" v-model="usuarioEditar.nombre">
      <input type="text" class="form-control my-2" placeholder="Correo" v-model="usuarioEditar.email">
      <input type="text" class="form-control my-2" placeholder="contraseña" v-model="usuarioEditar.pass">
      <input type="text" class="form-control my-2" placeholder="Rol User" v-model="usuarioEditar.role">
      <b-button class="btn-warning my-2 btn-block" type="@submit"> Editar </b-button>
      <b-button class="my-2 btn-block" type="@submit" @click="editar = false"> cancelar </b-button>
    </form>

    <form @submit.prevent="agregarUsuario()" v-if="!editar">
      <input type="text" class="form-control my-2" placeholder="Nombre de usuario" v-model="usuario.nombre">
      <input type="text" class="form-control my-2" placeholder="Correo" v-model="usuario.email">
      <input type="text" class="form-control my-2" placeholder="contraseña" v-model="usuario.pass">
      <input type="text" class="form-control my-2" placeholder="Rol User" v-model="usuario.role">
      <b-button class="btn-success my-2 btn-block" type="@submit"> Agregar </b-button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row">{{item._id}}</th>
          <td>{{item.nombre}}</td>
          <td>{{item.email}}</td>
          <td>{{item.date}}</td>
          <td>
            <form @submit.prevent="deletet">
              <b-button 
              @click="eliminarUsuario(item._id)" 
              class="btn-danger btn-sm mx-2">Eliminar
            </b-button>
            <b-button 
              @click="activarTarea(item._id)" 
              class="btn-warning btn-sm">Editar
          </b-button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
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
            editar: false,
            usuarioEditar: {}

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
      agregarUsuario(){
        this.axios.post('/nuevo-usuario', this.usuario)
         .then(res => {
            console.log(res.data);
            this.usuarios.push = (res.data);
            this.usuario.nombre = '';
            this.usuario.email = '';
            this.usuario.pass = '';
            this.usuario.role = '';
            this.mensaje.color = 'success';
            this.mensaje.texto = 'Nuevo usuario agregado';
            this.showAlert();
         })
         .catch(e => {
            console.log(e.response);
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
      activarTarea(id){
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