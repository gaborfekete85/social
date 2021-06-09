(this["webpackJsonpreact-redux-hooks-jwt-auth"]=this["webpackJsonpreact-redux-hooks-jwt-auth"]||[]).push([[0],{179:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(20),c=a.n(l),o=a(11),i=a(21),s=a(66),u=a(67),m=a(5),d=JSON.parse(localStorage.getItem("user")),h=d?{isLoggedIn:!0,user:d}:{isLoggedIn:!1,user:null},p={},E=Object(i.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"REGISTER_SUCCESS":case"REGISTER_FAIL":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1});case"LOGIN_SUCCESS":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!0,user:n.user});case"LOGIN_FAIL":case"LOGOUT":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},message:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_MESSAGE":return{message:n};case"CLEAR_MESSAGE":return{message:""};default:return e}}}),v=[u.a],g=Object(i.createStore)(E,Object(s.composeWithDevTools)(i.applyMiddleware.apply(void 0,v))),f=(a(79),a(8)),b=a(6),O=a(14),y=(a(80),a(81),a(31)),N=a.n(y),j=a(24),T=a.n(j),S=a(32),k=a.n(S),C=a(9),L=a.n(C),w="http://localhost:8082/api/auth/",A=function(e,t,a){return L.a.post(w+"signup",{username:e,email:t,password:a})},I=function(e,t){return L.a.post(w+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))},x=function(){localStorage.removeItem("user")},_=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},R=function(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),l=Object(n.useState)(""),c=Object(f.a)(l,2),i=c[0],s=c[1],u=Object(n.useState)(""),m=Object(f.a)(u,2),d=m[0],h=m[1],p=Object(n.useState)(!1),E=Object(f.a)(p,2),v=E[0],g=E[1],O=Object(o.c)((function(e){return e.auth})).isLoggedIn,y=Object(o.c)((function(e){return e.message})).message,j=Object(o.b)();return O?r.a.createElement(b.a,{to:"/"}):r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),r.a.createElement(N.a,{onSubmit:function(n){n.preventDefault(),g(!0),t.current.validateAll(),0===a.current.context._errors.length?j(function(e,t){return function(a){return I(e,t).then((function(e){return a({type:"LOGIN_SUCCESS",payload:{user:e}}),Promise.resolve()}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();return a({type:"LOGIN_FAIL"}),a({type:"SET_MESSAGE",payload:t}),Promise.reject()}))}}(i,d)).then((function(){e.history.push("/"),window.location.reload()})).catch((function(){g(!1)})):g(!1)},ref:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"username",value:i,onChange:function(e){var t=e.target.value;s(t)},validations:[_]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(T.a,{type:"password",className:"form-control",name:"password",value:d,onChange:function(e){var t=e.target.value;h(t)},validations:[_]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block",disabled:v},v&&r.a.createElement("span",{className:"spinner-border spinner-border-sm"}),r.a.createElement("span",null,"Login"))),y&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"alert alert-danger",role:"alert"},y)),r.a.createElement(k.a,{style:{display:"none"},ref:a}))))},P=a(68),D=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},V=function(e){if(!Object(P.isEmail)(e))return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This is not a valid email.")},F=function(e){if(e.length<3||e.length>20)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The username must be between 3 and 20 characters.")},G=function(e){if(e.length<6||e.length>40)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The password must be between 6 and 40 characters.")},M=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useState)(""),l=Object(f.a)(a,2),c=l[0],i=l[1],s=Object(n.useState)(""),u=Object(f.a)(s,2),m=u[0],d=u[1],h=Object(n.useState)(""),p=Object(f.a)(h,2),E=p[0],v=p[1],g=Object(n.useState)(!1),b=Object(f.a)(g,2),O=b[0],y=b[1],j=Object(o.c)((function(e){return e.message})).message,S=Object(o.b)();return r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),r.a.createElement(N.a,{onSubmit:function(a){a.preventDefault(),y(!1),e.current.validateAll(),0===t.current.context._errors.length&&S(function(e,t,a){return function(n){return A(e,t,a).then((function(e){return n({type:"REGISTER_SUCCESS"}),n({type:"SET_MESSAGE",payload:e.data.message}),Promise.resolve()}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();return n({type:"REGISTER_FAIL"}),n({type:"SET_MESSAGE",payload:t}),Promise.reject()}))}}(c,m,E)).then((function(){y(!0)})).catch((function(){y(!1)}))},ref:e},!O&&r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"username",value:c,onChange:function(e){var t=e.target.value;i(t)},validations:[D,F]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement(T.a,{type:"text",className:"form-control",name:"email",value:m,onChange:function(e){var t=e.target.value;d(t)},validations:[D,V]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(T.a,{type:"password",className:"form-control",name:"password",value:E,onChange:function(e){var t=e.target.value;v(t)},validations:[D,G]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block"},"Sign Up"))),j&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:O?"alert alert-success":"alert alert-danger",role:"alert"},j)),r.a.createElement(k.a,{style:{display:"none"},ref:t}))))};function U(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}var J=function(){return L.a.get("http://localhost:8082/api/test/user",{headers:U()})},K=function(){return L.a.get("http://localhost:8082/api/test/mod",{headers:U()})},q=function(){return L.a.get("http://localhost:8082/api/test/admin",{headers:U()})},B=function(){var e=Object(o.c)((function(e){return e.auth})).user;return e?r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,r.a.createElement("strong",null,e.username)," Profile")),r.a.createElement("p",null,r.a.createElement("strong",null,"Token:")," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)),r.a.createElement("p",null,r.a.createElement("strong",null,"Id:")," ",e.id),r.a.createElement("p",null,r.a.createElement("strong",null,"Email:")," ",e.email),r.a.createElement("strong",null,"Authorities:"),r.a.createElement("ul",null,e.roles&&e.roles.map((function(e,t){return r.a.createElement("li",{key:t},e)})))):r.a.createElement(b.a,{to:"/login"})},W=function(){var e=Object(n.useState)(""),t=Object(f.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){J().then((function(e){l(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();l(t)}))}),[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,a)))},H=function(){var e=Object(n.useState)(""),t=Object(f.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){K().then((function(e){l(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();l(t)}))}),[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,a)))},z=function(){var e=Object(n.useState)(""),t=Object(f.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){q().then((function(e){l(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();l(t)}))}),[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,a)))},Z=a(18),$=a(19),Q=a(7),X=a(23),Y=a(22),ee=(L.a.create({baseURL:"http://localhost:8082/api",headers:{"Content-type":"application/json"}}),Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_URL),te=new(function(){function e(){Object(Z.a)(this,e)}return Object($.a)(e,[{key:"getAudit",value:function(){return L.a.get("".concat(ee,"/").concat("api/config","/audit"),{headers:U()})}},{key:"getAll",value:function(){return L.a.get("".concat(ee,"/").concat("api/config"),{headers:U()})}},{key:"get",value:function(e){return L.a.get("".concat(ee,"/").concat("api/config","/").concat(e),{headers:U()})}},{key:"create",value:function(e){return L.a.post("".concat(ee,"/").concat("api/config"),e,{headers:U()})}},{key:"update",value:function(e){return L.a.put("".concat(ee,"/").concat("api/config"),e,{headers:U()})}},{key:"delete",value:function(e){return L.a.delete(ee,{headers:U(),data:{id:e}})}}]),e}()),ae=function(e){Object(X.a)(a,e);var t=Object(Y.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).onChangeSearchTitle=n.onChangeSearchTitle.bind(Object(Q.a)(n)),n.retrieveTutorials=n.retrieveTutorials.bind(Object(Q.a)(n)),n.refreshList=n.refreshList.bind(Object(Q.a)(n)),n.setActiveTutorial=n.setActiveTutorial.bind(Object(Q.a)(n)),n.removeAllTutorials=n.removeAllTutorials.bind(Object(Q.a)(n)),n.searchTitle=n.searchTitle.bind(Object(Q.a)(n)),n.state={tutorials:[],currentTutorial:null,currentIndex:-1,searchTitle:"",user:{}},n}return Object($.a)(a,[{key:"componentDidMount",value:function(){this.retrieveTutorials();JSON.parse(localStorage.getItem("user"));this.setState({user:JSON.parse(localStorage.getItem("user"))}),this.setState({editorRole:JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_MODERATOR")||JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_ADMIN")})}},{key:"onChangeSearchTitle",value:function(e){var t=e.target.value;this.setState({searchTitle:t})}},{key:"retrieveTutorials",value:function(){var e=this;te.getAll().then((function(t){e.setState({tutorials:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"refreshList",value:function(){this.retrieveTutorials(),this.setState({currentTutorial:null,currentIndex:-1})}},{key:"setActiveTutorial",value:function(e,t){this.setState({currentTutorial:e,currentIndex:t})}},{key:"removeAllTutorials",value:function(){var e=this;te.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))}},{key:"searchTitle",value:function(){var e=this;this.setState({currentTutorial:null,currentIndex:-1}),te.findByTitle(this.state.searchTitle).then((function(t){e.setState({tutorials:t.data}),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.searchTitle,n=t.tutorials,l=t.currentTutorial,c=t.currentIndex;return r.a.createElement("div",{className:"list row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Search by title",value:a,onChange:this.onChangeSearchTitle}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-outline-secondary",type:"button"},"Search"),this.state.editorRole&&r.a.createElement("button",{style:{marginLeft:"20px"},onClick:function(){return e.props.history.push("/add")},className:"btn btn-success"},"New Property")))),r.a.createElement("div",{className:"col-md-8"},r.a.createElement("h4",null,"Property List"),r.a.createElement("ul",{className:"list-group"},n&&n.filter((function(e){return!a||e.key.toLowerCase().includes(a.toLowerCase())})).map((function(t,a){return r.a.createElement("li",{className:"list-group-item "+(a===c?"active":""),onClick:function(){return e.setActiveTutorial(t,a)},key:a},r.a.createElement("b",null,t.key),r.a.createElement("br",null),t.value)})))),r.a.createElement("div",{className:"col-md-2"},l?r.a.createElement("div",null,r.a.createElement("h4",null,"Property"),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Application:"))," ",l.application),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Profile:"))," ",l.profile),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Label:"))," ",l.label),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Key:"))," ",l.key),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Value:"))," ",l.value),this.state.editorRole&&r.a.createElement(O.a,{to:"/tutorials/"+l.id,className:"badge badge-warning"},"Edit")):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please select a Property to edit..."))))}}]),a}(n.Component),ne=a(25),re=function(e){Object(X.a)(a,e);var t=Object(Y.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).onChangeTitle=n.onChangeTitle.bind(Object(Q.a)(n)),n.onChangeDescription=n.onChangeDescription.bind(Object(Q.a)(n)),n.getTutorial=n.getTutorial.bind(Object(Q.a)(n)),n.updatePublished=n.updatePublished.bind(Object(Q.a)(n)),n.updateTutorial=n.updateTutorial.bind(Object(Q.a)(n)),n.deleteTutorial=n.deleteTutorial.bind(Object(Q.a)(n)),n.state={currentTutorial:{id:null,application:"",profile:"",label:"",key:"",value:""},message:""},n}return Object($.a)(a,[{key:"componentDidMount",value:function(){this.getTutorial(this.props.match.params.id)}},{key:"onChangeValue",value:function(e,t){this.setState((function(a){return{currentTutorial:Object(m.a)(Object(m.a)({},a.currentTutorial),{},Object(ne.a)({},e,t))}}))}},{key:"onChangeTitle",value:function(e){var t=e.target.value;this.setState((function(e){return{currentTutorial:Object(m.a)(Object(m.a)({},e.currentTutorial),{},{title:t})}}))}},{key:"onChangeDescription",value:function(e){var t=e.target.value;this.setState((function(e){return{currentTutorial:Object(m.a)(Object(m.a)({},e.currentTutorial),{},{description:t})}}))}},{key:"getTutorial",value:function(e){var t=this;te.get(e).then((function(e){t.setState({currentTutorial:e.data}),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"updatePublished",value:function(e){var t=this,a={id:this.state.currentTutorial.id,title:this.state.currentTutorial.title,description:this.state.currentTutorial.description,published:e};te.update(this.state.currentTutorial.id,a).then((function(a){t.setState((function(t){return{currentTutorial:Object(m.a)(Object(m.a)({},t.currentTutorial),{},{published:e})}})),console.log(a.data)})).catch((function(e){console.log(e)}))}},{key:"updateTutorial",value:function(){var e=this,t=this.state.currentTutorial;t.id=this.props.match.params.id,te.update(t).then((function(t){console.log(t.data),e.setState({message:"The configuration was updated. Check the env now."}),e.props.history.push("/")})).catch((function(e){console.log(e)}))}},{key:"deleteTutorial",value:function(){var e=this;te.delete(this.state.currentTutorial.id).then((function(t){console.log(t.data),e.props.history.push("/")})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state.currentTutorial;return r.a.createElement("div",null,t?r.a.createElement("div",{className:"edit-form"},r.a.createElement("h4",null,"Property"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Application"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",value:t.application,onChange:function(t){return e.onChangeValue("application",t.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Profile"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",value:t.profile,onChange:function(t){return e.onChangeValue("profile",t.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Label"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",value:t.label,onChange:function(t){return e.onChangeValue("label",t.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Key"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",value:t.key,onChange:function(t){return e.onChangeValue("key",t.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Value"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",value:t.value,onChange:function(t){return e.onChangeValue("value",t.target.value)}}))),r.a.createElement("button",{className:"badge badge-danger mr-2",onClick:this.deleteTutorial},"Delete"),r.a.createElement("button",{type:"submit",className:"badge badge-success",onClick:this.updateTutorial},"Update"),r.a.createElement("p",null,this.state.message)):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please select a Property to edit...")))}}]),a}(n.Component),le=function(e){Object(X.a)(a,e);var t=Object(Y.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).save=n.save.bind(Object(Q.a)(n)),n.newTutorial=n.newTutorial.bind(Object(Q.a)(n)),n.state={id:null,application:"ZOOM",profile:"DEV",label:"DB",key:"db_source",value:"jdbc"},n}return Object($.a)(a,[{key:"onChangeValue",value:function(e,t){this.setState((function(a){return Object(m.a)(Object(m.a)({},a),{},Object(ne.a)({},e,t))}))}},{key:"save",value:function(){var e=this;te.create(this.state).then((function(t){e.setState({id:t.data.id,title:t.data.title,description:t.data.description,published:t.data.published,submitted:!0}),e.props.history.push("/"),console.log(t.data)})).catch((function(e){console.log(e)}))}},{key:"newTutorial",value:function(){this.setState({id:null,title:"",description:"",published:!1,submitted:!1})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"submit-form"},this.state.submitted?r.a.createElement("div",null,r.a.createElement("h4",null,"The property added. "),r.a.createElement("button",{className:"btn btn-success",onClick:this.newTutorial},"Add a new one")):r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Application"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.application,onChange:function(t){return e.onChangeValue("application",t.target.value)},name:"title"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Profile"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.profile,onChange:function(t){return e.onChangeValue("profile",t.target.value)},name:"title"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Label"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.label,onChange:function(t){return e.onChangeValue("label",t.target.value)},name:"title"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Key"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.key,onChange:function(t){return e.onChangeValue("key",t.target.value)},name:"title"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"title"},"Value"),r.a.createElement("input",{type:"text",className:"form-control",id:"title",required:!0,value:this.state.value,onChange:function(t){return e.onChangeValue("value",t.target.value)},name:"title"})),r.a.createElement("button",{onClick:this.save,className:"btn btn-success"},"Submit")))}}]),a}(n.Component),ce=a(37),oe=function(e){Object(X.a)(a,e);var t=Object(Y.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).retrieveTutorials=n.retrieveAuditLogs.bind(Object(Q.a)(n)),n.state={tutorials:[],currentTutorial:null,currentIndex:-1,searchTitle:"",user:{},auditLogs:[]},n}return Object($.a)(a,[{key:"componentDidMount",value:function(){this.retrieveAuditLogs()}},{key:"retrieveAuditLogs",value:function(){var e=this;te.getAudit().then((function(t){e.setState({auditLogs:t.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state;e.searchTitle,e.tutorials,e.currentTutorial,e.currentIndex,e.auditLogs;return r.a.createElement(ce.a,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"Key"),r.a.createElement("th",null,"Old Value"),r.a.createElement("th",null),r.a.createElement("th",null,"New Value"),r.a.createElement("th",null,"Event"),r.a.createElement("th",null,"Changed By"),r.a.createElement("th",null,"Changed on"))),r.a.createElement("tbody",null,this.state.auditLogs.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.key),r.a.createElement("td",null,"DELETE"===e.event?e.oldKey:e.newKey),r.a.createElement("td",null,e.oldValue),r.a.createElement("td",null,"--\x3e"),r.a.createElement("td",null,e.newValue),r.a.createElement("td",null,e.event),r.a.createElement("td",null,e.userEmail),r.a.createElement("td",null,e.eventDateTime))}))))}}]),a}(n.Component),ie=a(12),se=Object(ie.a)(),ue=function(){var e=Object(n.useState)(!1),t=Object(f.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(!1),i=Object(f.a)(c,2),s=i[0],u=i[1],m=Object(o.c)((function(e){return e.auth})).user,d=Object(o.b)();Object(n.useEffect)((function(){se.listen((function(e){d({type:"CLEAR_MESSAGE"})}))}),[d]),Object(n.useEffect)((function(){m&&(l(m.roles.includes("ROLE_MODERATOR")),u(m.roles.includes("ROLE_ADMIN")))}),[m]);return r.a.createElement(b.c,{history:se},r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand navbar-dark bg-dark"},r.a.createElement(O.a,{to:"/",className:"navbar-brand"},"Trading Configuration"),r.a.createElement("div",{className:"navbar-nav mr-auto"},m&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/",className:"nav-link"},"Properties")),a&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/add",className:"nav-link"},"Add")),s&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/audit",className:"nav-link"},"Audit History"))),m?r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/profile",className:"nav-link"},m.username)),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{href:"/login",className:"nav-link",onClick:function(){d((function(e){x(),e({type:"LOGOUT"})}))}},"LogOut"))):r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/login",className:"nav-link"},"Login")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(O.a,{to:"/register",className:"nav-link"},"Sign Up")))),r.a.createElement("div",{className:"container mt-3"},r.a.createElement(b.d,null,r.a.createElement(b.b,{exact:!0,path:["/","/home"],component:ae}),r.a.createElement(b.b,{exact:!0,path:"/add",component:le}),r.a.createElement(b.b,{path:"/tutorials/:id",component:re}),r.a.createElement(b.b,{exact:!0,path:"/audit",component:oe}),r.a.createElement(b.b,{exact:!0,path:"/login",component:R}),r.a.createElement(b.b,{exact:!0,path:"/register",component:M}),r.a.createElement(b.b,{exact:!0,path:"/profile",component:B}),r.a.createElement(b.b,{path:"/user",component:W}),r.a.createElement(b.b,{path:"/mod",component:H}),r.a.createElement(b.b,{path:"/admin",component:z})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(o.a,{store:g},r.a.createElement(ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},70:function(e,t,a){e.exports=a(179)},79:function(e,t,a){},81:function(e,t,a){}},[[70,1,2]]]);
//# sourceMappingURL=main.ac67c7ff.chunk.js.map