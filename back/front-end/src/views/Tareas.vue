<template>
  <div class="container">
  <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
    {{ mensaje.texto }} 
  </b-alert>

  <div class="container">
    <div class="row justify-content-center" >
      <div class="content-edit" @submit.prevent="editarTarea(tareaEditar)" v-if="editar">
        <form class="style col-12 col-md-5">
          <h1 class="text-center">Editar nueva tarea</h1>
          <input type="text" class="form-control my-2" placeholder="Tarea" v-model="tareaEditar.nombre">
          <textarea name="textarea" rows="5"  placeholder="Descripción" v-model="tareaEditar.descripcion"></textarea>
          <div class="style-button">
            <b-button class="button-style btn-warning my-2 btn-block" type="@submit"> Editar </b-button>
            <b-button class="button-style my-2 btn-block " type="@submit" @click="editar = false"> Cancelar </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row content-login d-flex justify-content-center align-items-center text-center">
      <div class="col-md-6">
        <form @submit.prevent="agregaTarea()" v-if="!editar">
          <h1 class="text-center">Agrega una tarea</h1>
          <input type="text" class="form-control my-2" placeholder="Tarea" v-model="tarea.nombre">
          <textarea name="textarea" rows="5"  placeholder="Descripción" v-model="tarea.descripcion"></textarea>
          <b-button class="btn-success my-2 btn-block" type="@submit"> Agregar </b-button>
        </form>
      </div>
    </div>
  </div>

  <!--
  <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Tarea</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in tareas" :key="index">
      <th scope="row">{{item._id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.descripcion}}</td>
      <td>
        <b-button 
          @click="eliminarTarea(item._id)" 
          class="btn-danger btn-sm mx-2">Eliminar
        </b-button>
        <b-button 
          @click="activarTarea(item._id)" 
          class="btn-warning btn-sm">Editar
        </b-button>
      </td>
    </tr>
    </tbody>
  </table>
  -->

  <div class="card-deck" v-for="(item, index) in tareas" :key="index">
  <div class="card">
    <img src="" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">{{item.nombre}}</h5>
      <p class="card-text">{{item.descripcion}}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted mx-4">Tarea creada el: {{item.date}}</small>
      <i class="fas fa-trash mx-2 float-right"  @click="eliminarTarea(item._id)"></i>
      <i class="fas fa-edit float-right" @click="activarTarea(item._id)" ></i>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tareas: [],
      mensaje: { color: '', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,
      tarea: { nombre: "", descripcion: ""},
      editar: false,
      tareaEditar: {}
    };
  },
  computed:{
    ...mapState(['token'])
  },
  created(){
    this.listarTareas();
  },
  methods: {
    alerta(){
      this.mensaje.color = 'success';
      this.mensaje.texto = 'Probando alerta';
      this.showAlert();
    },
    listarTareas(){
      //Traer tareas a un solo usuario
      let config = {
        headers: {
          token: this.token
        }
      }

      this.axios.get('/tareas', config)
       .then(res => {
         console.log(res);
         this.tareas = res.data;
       })
       .catch(e => {
         console.log(e.response);
       })
    },
    agregaTarea(){
      //Agregar tarea por ID
      let config = {
        headers: {
          token: this.token
        }
      }
      //console.log(this.tarea)
      this.axios.post('/nueva-tarea', this.tarea,config)
        .then( res => {
          this.tareas.push(res.data)
          this.tarea.nombre = "";
          this.tarea.descripcion = "";
          this.mensaje.color = 'success';
          this.mensaje.texto = 'Tarea agregada';
          this.showAlert();
        })
        .catch( e => {
          console.log(e.response)
          this.mensaje.color = 'danger';
          this.mensaje.texto = 'No tienes permisos para crear una tarea, consulta con un Admin';
          this.showAlert();
          if(e.response.data.error.errors.nombre.message){
            this.mensaje.texto = e.response.data.error.errors.nombre.message
          } else {
            this.mensaje.texto = "error del sistema"; 
            this.mensaje.color = 'danger';
          }
        })
    },
    eliminarTarea(id){
      console.log(id)
      this.axios.delete(`/tarea/${id}`)
        .then( res => {
          const index = this.tareas.findIndex(item => item._id === res.data._id);
          this.tareas.splice(index, 1);
          this.mensaje.color = 'success';
          this.mensaje.texto = 'Tarea eliminada';
          this.showAlert();
        })
        .catch(e => {
          console.log(e.response)
        })
    },
    activarTarea(id){
      this.editar = true;
      console.log(id);
      this.axios.get(`/tarea/${id}`)
       .then(res=> {
         this.tareaEditar = res.data;
       })
       .catch(e => {
          console.log(e.response)
       })
    },
    editarTarea(item){
      this.axios.put(`/tarea/${item._id }`, item)
       .then( res=> {
         const index = this.tareas.findIndex( t => t._id === res.data._id)
         this.tareas[index].nombre = res.data.nombre
         this.tareas[index].descripcion = res.data.descripcion
         this.mensaje.color = 'success';
         this.mensaje.texto = 'Tarea editada';
         this.showAlert();
         this.editar = false
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
  }
};

</script>

<style scoped>
h1 {
  color: #7868E6;
  font-weight: 600;
}
.card-deck{
  padding: 10px 0;
}
textarea{
  width: 100%;
  border-radius: 2rem !important;
  text-align: center;
  font-weight: 700;
  outline:none;
  color: #989898;
  background: #f7f7f7;
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
}
form.style{
  margin: 0 auto;
}
.style-button{
  margin: 0 auto;
}
i {
    font-size: 1.2rem;
    color: #1e1842;
}
.card-footer:last-child {
    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
    border-radius: 0rem 0rem 2rem 2rem;
}
.text-muted {
    color: #232323 !important;
    font-weight: 600;
}
input {
    height: 56px !important;
    border-radius: 2rem !important;
    text-align: center;
    font-weight: 700;
    color: #A4A4A4;
    background: #f7f7f7;
}
button.btn.btn-success {
    font-weight: 700;
    height: 56px;
    border-radius: 2rem !important;
    background: #7868E6 !important;
}
.card {
    border-radius: 2rem;
}
h5 {
    font-weight: 700;
    background: #ececec;
    font-size: 1.2rem;
    border-radius: 2rem;
    padding: 0.6rem;
    text-align: center;
}
p.card-text {
    font-style: italic;
}
button.btn.button-style.btn-warning.my-2.btn-block.btn-secondary {
    background: #7868e6;
    height: 56px;
    border-style: none;
    border-radius: 2rem;
    color: white;
    font-weight: 700;
}
button.btn.button-style.my-2.btn-block.btn-secondary {
    background: #6b6b6b;
    height: 56px;
    border-style: none;
    border-radius: 2rem;
    color: white;
    font-weight: 700;
}
</style>