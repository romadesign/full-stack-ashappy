<template>
    <div class="container">
        <div class="row content-login d-flex justify-content-center align-items-center text-center">
            <div class="">
                <div class="col-md-12" v-if="mensaje != ''">
                <p>{{mensaje}}</p>
                </div>
                <img src="@/assets/img-admin/login-img.svg" alt="">
                <h1>TaskHappy</h1>
                <form @submit.prevent="login">
                <input placeholder="Email" type="email" class="form-control my-2 text-center" v-model="usuario.email">
                <input placeholder="Contraseña" type="password" class="form-control my-2 text-center" v-model="usuario.pass">
                <button type="submit" class="style-button btn btn-primary">Acceder &#10141;</button>
            </form>
            
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data(){
        return {
            usuario: {email: 'usuario5@gmail.com', pass: '123123'},
            mensaje: ''
        }
    },
    methods: {
        ...mapActions(['guardarUsuario']),
        login(){
          this.axios.post('/login', this.usuario)
            .then(res => {
              console.log(res.data);
              const token = res.data.token;
              this.guardarUsuario(token)
            })
            .catch(err => {
              console.log(err.response.data.mensaje);
              this.mensaje = err.response.data.mensaje;
            })
        }
    }
}
</script>

<style scoped>
.content-login{
    height: 90vh;
}
h1{
    color: #7868E6;
    font-weight: 700;
    margin: 20px 0;
    font-size: 3.5rem;
}
p{
    color: rgb(246, 238, 238);
    font-weight: 600;
}
button{
    width: 100%;
}
input {
    border-radius: 20rem !important;
    height: 56px !important;
    font-weight: 700;
    color: #A4A4A4;
}
.style-button{
    border-radius: 20rem !important;
    height: 56px !important;
    background: #7868E6;
    border-style: none;
    font-weight: 800;
}
</style>>
