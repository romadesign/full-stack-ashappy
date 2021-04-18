(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69803f2a"],{"0569":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("tareas")]),a("b-alert",{attrs:{show:t.dismissCountDown,dismissible:"",variant:t.mensaje.color},on:{dismissed:function(e){t.dismissCountDown=0},"dismiss-count-down":t.countDownChanged}},[t._v(" "+t._s(t.mensaje.texto)+" ")]),t.editar?a("form",{on:{submit:function(e){return e.preventDefault(),t.editarTarea(t.tareaEditar)}}},[a("h3",[t._v("Editar nueva tarea")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tareaEditar.nombre,expression:"tareaEditar.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Tarea"},domProps:{value:t.tareaEditar.nombre},on:{input:function(e){e.target.composing||t.$set(t.tareaEditar,"nombre",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tareaEditar.descripcion,expression:"tareaEditar.descripcion"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"descripción"},domProps:{value:t.tareaEditar.descripcion},on:{input:function(e){e.target.composing||t.$set(t.tareaEditar,"descripcion",e.target.value)}}}),a("b-button",{staticClass:"btn-warning my-2 btn-block",attrs:{type:"@submit"}},[t._v(" Editar ")]),a("b-button",{staticClass:"my-2 ",attrs:{type:"@submit"},on:{click:function(e){t.editar=!1}}},[t._v(" Cancelar ")])],1):t._e(),t.editar?t._e():a("form",{on:{submit:function(e){return e.preventDefault(),t.agregaTarea()}}},[a("h3",[t._v("Agregar nueva tarea")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tarea.nombre,expression:"tarea.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Tarea"},domProps:{value:t.tarea.nombre},on:{input:function(e){e.target.composing||t.$set(t.tarea,"nombre",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tarea.descripcion,expression:"tarea.descripcion"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"descripción"},domProps:{value:t.tarea.descripcion},on:{input:function(e){e.target.composing||t.$set(t.tarea,"descripcion",e.target.value)}}}),a("b-button",{staticClass:"btn-success my-2 btn-block",attrs:{type:"@submit"}},[t._v(" Agregar ")])],1),a("table",{staticClass:"table"},[t._m(0),a("tbody",t._l(t.tareas,(function(e,r){return a("tr",{key:r},[a("th",{attrs:{scope:"row"}},[t._v(t._s(e._id))]),a("td",[t._v(t._s(e.nombre))]),a("td",[t._v(t._s(e.descripcion))]),a("td",[a("b-button",{staticClass:"btn-danger btn-sm mx-2",on:{click:function(a){return t.eliminarTarea(e._id)}}},[t._v("Eliminar ")]),a("b-button",{staticClass:"btn-warning btn-sm",on:{click:function(a){return t.activarTarea(e._id)}}},[t._v("Editar ")])],1)])})),0)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("id")]),a("th",{attrs:{scope:"col"}},[t._v("Tarea")]),a("th",{attrs:{scope:"col"}},[t._v("Descripcion")]),a("th",{attrs:{scope:"col"}},[t._v("Acciones")])])])}],o=(a("c740"),a("a434"),{data:function(){return{tareas:[],mensaje:{color:"",texto:""},dismissSecs:5,dismissCountDown:0,tarea:{nombre:"",descripcion:""},editar:!1,tareaEditar:{}}},created:function(){this.listarTareas()},methods:{alerta:function(){this.mensaje.color="success",this.mensaje.texto="Probando alerta",this.showAlert()},listarTareas:function(){var t=this;this.axios.get("/tareas").then((function(e){console.log(e),t.tareas=e.data})).catch((function(t){console.log(t.response)}))},agregaTarea:function(){var t=this;this.axios.post("/nueva-tarea",this.tarea).then((function(e){t.tareas.push(e.data),t.tarea.nombre="",t.tarea.descripcion="",t.mensaje.color="success",t.mensaje.texto="Tarea agregada",t.showAlert()})).catch((function(e){console.log(e.response),t.mensaje.color="danger",t.mensaje.texto="PRUEBA",t.showAlert(),e.response.data.error.errors.nombre.message?t.mensaje.texto=e.response.data.error.errors.nombre.message:(t.mensaje.texto="error del sistema",t.mensaje.color="danger")}))},eliminarTarea:function(t){var e=this;console.log(t),this.axios.delete("/tarea/".concat(t)).then((function(t){var a=e.tareas.findIndex((function(e){return e._id===t.data._id}));e.tareas.splice(a,1),e.mensaje.color="success",e.mensaje.texto="Tarea eliminada",e.showAlert()})).catch((function(t){console.log(t.response)}))},activarTarea:function(t){var e=this;this.editar=!0,console.log(t),this.axios.get("/tarea/".concat(t)).then((function(t){e.tareaEditar=t.data})).catch((function(t){console.log(t.response)}))},editarTarea:function(t){var e=this;this.axios.put("/tarea/".concat(t._id),t).then((function(t){var a=e.tareas.findIndex((function(e){return e._id===t.data._id}));e.tareas[a].nombre=t.data.nombre,e.tareas[a].descripcion=t.data.descripcion,e.mensaje.color="success",e.mensaje.texto="Tarea editada",e.showAlert(),e.editar=!1})).catch((function(t){console.log(t.response)}))},countDownChanged:function(t){this.dismissCountDown=t},showAlert:function(){this.dismissCountDown=this.dismissSecs}}}),s=o,i=a("2877"),c=Object(i["a"])(s,r,n,!1,null,null,null);e["default"]=c.exports},"1dde":function(t,e,a){var r=a("d039"),n=a("b622"),o=a("2d00"),s=n("species");t.exports=function(t){return o>=51||!r((function(){var e=[],a=e.constructor={};return a[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,a){var r=a("861d"),n=a("e8b5"),o=a("b622"),s=o("species");t.exports=function(t,e){var a;return n(t)&&(a=t.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?r(a)&&(a=a[s],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===e?0:e)}},8418:function(t,e,a){"use strict";var r=a("c04e"),n=a("9bf2"),o=a("5c6c");t.exports=function(t,e,a){var s=r(e);s in t?n.f(t,s,o(0,a)):t[s]=a}},a434:function(t,e,a){"use strict";var r=a("23e7"),n=a("23cb"),o=a("a691"),s=a("50c4"),i=a("7b0b"),c=a("65f0"),d=a("8418"),u=a("1dde"),l=u("splice"),m=Math.max,f=Math.min,p=9007199254740991,v="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!l},{splice:function(t,e){var a,r,u,l,h,b,g=i(this),x=s(g.length),_=n(t,x),w=arguments.length;if(0===w?a=r=0:1===w?(a=0,r=x-_):(a=w-2,r=f(m(o(e),0),x-_)),x+a-r>p)throw TypeError(v);for(u=c(g,r),l=0;l<r;l++)h=_+l,h in g&&d(u,l,g[h]);if(u.length=r,a<r){for(l=_;l<x-r;l++)h=l+r,b=l+a,h in g?g[b]=g[h]:delete g[b];for(l=x;l>x-r+a;l--)delete g[l-1]}else if(a>r)for(l=x-r;l>_;l--)h=l+r-1,b=l+a-1,h in g?g[b]=g[h]:delete g[b];for(l=0;l<a;l++)g[l+_]=arguments[l+2];return g.length=x-r+a,u}})},b727:function(t,e,a){var r=a("0366"),n=a("44ad"),o=a("7b0b"),s=a("50c4"),i=a("65f0"),c=[].push,d=function(t){var e=1==t,a=2==t,d=3==t,u=4==t,l=6==t,m=7==t,f=5==t||l;return function(p,v,h,b){for(var g,x,_=o(p),w=n(_),y=r(v,h,3),E=s(w.length),C=0,A=b||i,j=e?A(p,E):a||m?A(p,0):void 0;E>C;C++)if((f||C in w)&&(g=w[C],x=y(g,C,_),t))if(e)j[C]=x;else if(x)switch(t){case 3:return!0;case 5:return g;case 6:return C;case 2:c.call(j,g)}else switch(t){case 4:return!1;case 7:c.call(j,g)}return l?-1:d||u?u:j}};t.exports={forEach:d(0),map:d(1),filter:d(2),some:d(3),every:d(4),find:d(5),findIndex:d(6),filterOut:d(7)}},c740:function(t,e,a){"use strict";var r=a("23e7"),n=a("b727").findIndex,o=a("44d2"),s="findIndex",i=!0;s in[]&&Array(1)[s]((function(){i=!1})),r({target:"Array",proto:!0,forced:i},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),o(s)},e8b5:function(t,e,a){var r=a("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}}}]);
//# sourceMappingURL=chunk-69803f2a.dd9a8c2f.js.map