(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-904ea69a"],{"3e2a":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",[t._v("Edit Delete user")]),o("b-alert",{attrs:{show:t.dismissCountDown,dismissible:"",variant:t.mensaje.color},on:{dismissed:function(e){t.dismissCountDown=0},"dismiss-count-down":t.countDownChanged}},[t._v(" "+t._s(t.mensaje.texto)+" ")]),t.editar?o("form",{on:{submit:function(e){return e.preventDefault(),t.editarUsuario(t.usuarioEditar)}}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuarioEditar.nombre,expression:"usuarioEditar.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Nombre de usuario"},domProps:{value:t.usuarioEditar.nombre},on:{input:function(e){e.target.composing||t.$set(t.usuarioEditar,"nombre",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuarioEditar.email,expression:"usuarioEditar.email"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Correo"},domProps:{value:t.usuarioEditar.email},on:{input:function(e){e.target.composing||t.$set(t.usuarioEditar,"email",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuarioEditar.pass,expression:"usuarioEditar.pass"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"contraseña"},domProps:{value:t.usuarioEditar.pass},on:{input:function(e){e.target.composing||t.$set(t.usuarioEditar,"pass",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuarioEditar.role,expression:"usuarioEditar.role"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Rol User"},domProps:{value:t.usuarioEditar.role},on:{input:function(e){e.target.composing||t.$set(t.usuarioEditar,"role",e.target.value)}}}),o("b-button",{staticClass:"btn-warning my-2 btn-block",attrs:{type:"@submit"}},[t._v(" Editar ")]),o("b-button",{staticClass:"my-2 btn-block",attrs:{type:"@submit"},on:{click:function(e){t.editar=!1}}},[t._v(" cancelar ")])],1):t._e(),t.editar?t._e():o("form",{on:{submit:function(e){return e.preventDefault(),t.agregarUsuario()}}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.nombre,expression:"usuario.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Nombre de usuario"},domProps:{value:t.usuario.nombre},on:{input:function(e){e.target.composing||t.$set(t.usuario,"nombre",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.email,expression:"usuario.email"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Correo"},domProps:{value:t.usuario.email},on:{input:function(e){e.target.composing||t.$set(t.usuario,"email",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.pass,expression:"usuario.pass"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"contraseña"},domProps:{value:t.usuario.pass},on:{input:function(e){e.target.composing||t.$set(t.usuario,"pass",e.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.role,expression:"usuario.role"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Rol User"},domProps:{value:t.usuario.role},on:{input:function(e){e.target.composing||t.$set(t.usuario,"role",e.target.value)}}}),o("b-button",{staticClass:"btn-success my-2 btn-block",attrs:{type:"@submit"}},[t._v(" Agregar ")])],1),o("table",{staticClass:"table"},[t._m(0),o("tbody",t._l(t.usuarios,(function(e,a){return o("tr",{key:a},[o("th",{attrs:{scope:"row"}},[t._v(t._s(e._id))]),o("td",[t._v(t._s(e.nombre))]),o("td",[t._v(t._s(e.email))]),o("td",[t._v(t._s(e.date))]),o("td",[o("b-button",{staticClass:"btn-danger btn-sm mx-2",on:{click:function(o){return t.eliminarUsuario(e._id)}}},[t._v("Eliminar ")]),o("b-button",{staticClass:"btn-warning btn-sm",on:{click:function(o){return t.activarTarea(e._id)}}},[t._v("Editar ")])],1)])})),0)])],1)},s=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("thead",[o("tr",[o("th",{attrs:{scope:"col"}},[t._v("ID")]),o("th",{attrs:{scope:"col"}},[t._v("Nombre")]),o("th",{attrs:{scope:"col"}},[t._v("Correo")]),o("th",{attrs:{scope:"col"}},[t._v("Fecha")]),o("th",{attrs:{scope:"col"}},[t._v("Acciones")])])])}],r=(o("c740"),o("a434"),{data:function(){return{usuario:{nombre:"",email:"",pass:"",role:""},usuarios:[],mensaje:{color:"",texto:""},dismissSecs:5,dismissCountDown:0,editar:!1,usuarioEditar:{}}},methods:{alerta:function(){this.mensaje.color="success",this.mensaje.texto="Probando alerta",this.showAlert()},listaUsuarios:function(){var t=this;this.axios.get("/usuarios").then((function(e){console.log(e.data),t.usuarios=e.data})).catch((function(t){console.log(t.response)}))},agregarUsuario:function(){var t=this;this.axios.post("/nuevo-usuario",this.usuario).then((function(e){console.log(e.data),t.usuarios.push=e.data,t.usuario.nombre="",t.usuario.email="",t.usuario.pass="",t.usuario.role="",t.mensaje.color="success",t.mensaje.texto="Nuevo usuario agregado",t.showAlert()})).catch((function(t){console.log(t.response)}))},eliminarUsuario:function(t){var e=this;console.log(t),this.axios.delete("/usuario/".concat(t)).then((function(t){var o=e.ususario.findIndex((function(e){return e._id===t.data._id}));e.usuario.splice(o,1)})).catch((function(t){console.log(t.response)}))},activarTarea:function(t){var e=this;this.editar=!0,console.log(t),this.axios.get("/usuario/".concat(t)).then((function(t){e.usuarioEditar=t.data})).catch((function(t){console.log(t.response)}))},editarUsuario:function(t){var e=this;this.axios.put("/usuario/".concat(t._id),t).then((function(t){var o=e.usuarios.findIndex((function(e){return e._id===t.data._id}));e.usuarios[o].nombre=t.data.nombre,e.usuarios[o].email=t.data.email,e.usuarios[o].pass=t.data.pass,e.usuarios[o].role=t.data.role,e.mensaje.color="success",e.mensaje.texto="Usuario editado",e.showAlert(),e.editar=!1})).catch((function(t){console.log(t.response)}))},countDownChanged:function(t){this.dismissCountDown=t},showAlert:function(){this.dismissCountDown=this.dismissSecs}},created:function(){this.listaUsuarios()}}),i=r,n=o("2877"),u=Object(n["a"])(i,a,s,!1,null,null,null);e["default"]=u.exports},a434:function(t,e,o){"use strict";var a=o("23e7"),s=o("23cb"),r=o("a691"),i=o("50c4"),n=o("7b0b"),u=o("65f0"),l=o("8418"),c=o("1dde"),d=c("splice"),m=Math.max,p=Math.min,v=9007199254740991,f="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d},{splice:function(t,e){var o,a,c,d,h,b,g=n(this),_=i(g.length),x=s(t,_),w=arguments.length;if(0===w?o=a=0:1===w?(o=0,a=_-x):(o=w-2,a=p(m(r(e),0),_-x)),_+o-a>v)throw TypeError(f);for(c=u(g,a),d=0;d<a;d++)h=x+d,h in g&&l(c,d,g[h]);if(c.length=a,o<a){for(d=x;d<_-a;d++)h=d+a,b=d+o,h in g?g[b]=g[h]:delete g[b];for(d=_;d>_-a+o;d--)delete g[d-1]}else if(o>a)for(d=_-a;d>x;d--)h=d+a-1,b=d+o-1,h in g?g[b]=g[h]:delete g[b];for(d=0;d<o;d++)g[d+x]=arguments[d+2];return g.length=_-a+o,c}})},c740:function(t,e,o){"use strict";var a=o("23e7"),s=o("b727").findIndex,r=o("44d2"),i="findIndex",n=!0;i in[]&&Array(1)[i]((function(){n=!1})),a({target:"Array",proto:!0,forced:n},{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),r(i)}}]);
//# sourceMappingURL=chunk-904ea69a.61bbef4c.js.map