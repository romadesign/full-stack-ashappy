<template>
      <div class="container">
       <h1 class="text-center">Información personal</h1>
        <div class="row justify-content-center  ">
          <div class="col-12 col-md-6 card-deck">
            <div class="card">
              <img src="" class="card-img-top" alt="">
              <div class="card-body">
                <p>nombre:</p> 
                <h5 class="card-title">{{usuarioId.nombre}}</h5>
                <p>Email:</p>
                <h5 class="card-text">{{usuarioId.email}}</h5>
                <p>Rol:</p>
                <h5 class="card-text">{{usuarioId.role}}</h5>
                <p>Registrado desde:</p>
                <h5 class="card-text">{{usuarioId.date}}</h5>
                <p>Id:</p>
                <h5 class="card-text">{{usuarioId._id}}</h5>
              </div>
            </div>
          </div>
        </div>
       <!---
        <h5>this.$route.params</h5>
        <pre>{{ JSON.stringify($route.params, null, 2) }}</pre>
        <h5>data</h5>
        <pre>{{ JSON.stringify($data, null, 2) }}</pre> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      usuarioId: []
    }
  },
  methods: {
    datoUsuario(){
      this.usuarioId  = this.$route.params.id
      console.log(this.usuarioId)
      this.axios.get(`/usuario/` + this.usuarioId)
        .then(res => {
          this.usuarioId = res.data
          })
        .catch(err => {
          console.log(err.response);
          })
        }
  },
  created(){
    this.datoUsuario();
  },
}

</script>

<style scoped>
h1.text-center {
  color: #7868E6;
  font-weight: 600;
}
h5.card-title {
    font-weight: 700;
    background: #ececec;
    border-radius: 3px;
    font-size: 1rem !important;
    padding: 0.8rem !important;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.3rem !important;
    color: #2E1D5F;
}
h5.card-text {
    font-weight: 700;
    background: #ececec;
    border-radius: 3px;
    padding: 0.8rem !important;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.3rem !important;
    color: #2E1D5F;
}
p{
  color: #6c757d;
  margin: 0.3rem 0;
  font-weight: 700;
  text-align: center;
}

.card {
  background: #ffffff;
  border-style: none;
}
</style>>
