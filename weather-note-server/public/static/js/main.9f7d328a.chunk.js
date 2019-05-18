(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},107:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),o=n.n(c),i=n(23),s=n(46),l=n(16),u=n(10),d=n(8),p=n(13),m=n(11),h=n(12),f=n(3),E=(n(63),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"weather-display ".concat(this.props.masking?"masking":"")},r.a.createElement("img",{src:"images/w-".concat(this.props.group,".png"),alt:""}),r.a.createElement("p",{className:"description"},"".concat(this.props.day,": ").concat(this.props.description)),r.a.createElement("h1",{className:"temp"},r.a.createElement("span",{className:"display-3"},this.props.temp.toFixed(0),"\xba"),"\xa0","metric"===this.props.unit?"C":"F"))}}]),t}(r.a.Component)),g=(n(64),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,n=e.masking,a=e.list;return r.a.createElement("div",{className:"weather-table ".concat(n?"masking":"")},r.a.createElement("div",{className:"d-flex justify-content-around"},a.map(function(e,n){return r.a.createElement("div",{key:e.ts,className:n>2?"hidden-xs-down":""},r.a.createElement("div",{className:"day"},t.weekDays[new Date(1e3*e.ts).getDay()]),r.a.createElement("i",{className:"owf owf-".concat(e.code)}),r.a.createElement("span",{className:"weather"},r.a.createElement("span",{className:"max-temp"},e.maxTemp.toFixed(0),"\xba"),r.a.createElement("span",{className:"min-temp"},e.minTemp.toFixed(0),"\xba")))})))}}]),t}(r.a.Component));g.weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];var T=n(112),O=n(113),v=n(121),j=n(114),b=n(115),R=n(116),N=n(52),y=n(14),C=n.n(y),_="36978c6550efee0e27e50850cc57adda",A=function(e){var t="na";return 200<=e&&e<300?t="thunderstorm":300<=e&&e<400?t="drizzle":500<=e&&e<600?t="rain":600<=e&&e<700?t="snow":700<=e&&e<800?t="atmosphere":800===e?t="clear":801<=e&&e<900&&(t="clouds"),t},w="http://api.openweathermap.org/data/2.5/weather?appid=".concat(_),S=C.a.CancelToken.source();var D="http://api.openweathermap.org/data/2.5/forecast/daily?appid=".concat(_,"&cnt=6"),k=C.a.CancelToken.source(),P="https://maps.googleapis.com/maps/api/geocode/json?key=".concat("AIzaSyDrQpacyuBhAAB5TFobrhKWyk7rugcEOfw"),L=C.a.CancelToken.source(),G=function(){return{type:"@WEATHER_FORM/TOGGLE_FORM"}},I=function(e){return{type:"@WEATHER_FORM/INPUT",value:e}},M=function(){return{type:"@WEATHER_FORM/TOGGLE_TEMP"}},F=function(e){return{type:"@WEATHER_FORM/SELECT_UNIT",unit:e}},U=function(e,t){return function(n,a){n({type:"@MASKING/MASK_BG"});var r=x(e,a).then(function(e){return function(e){var t="".concat(P,"&address=").concat(e);return console.log("Making request to ".concat(t)),C.a.get(t,{cancelToken:L.token}).then(function(t){if(t.data.error_message)throw new Error(t.data.error_message);if("ZERO_RESULTS"===t.data.status)throw new Error("There's no result for ".concat(e));return{pos:{lat:t.data.results[0].geometry.location.lat,lon:t.data.results[0].geometry.location.lng},address:t.data.results[0].formatted_address}}).catch(function(e){if(!C.a.isCancel(e))throw e;console.error(e.message,e)})}(e)}).then(function(e){var t=e.pos,a=e.address;return n(function(e){return{type:"@ADDRESS/SET_ADDRESS",address:e}}(a)),n({type:"@LOACTION/SET_LOCATION",location:t}),t}),c=r.then(function(e){return n({type:"@CURRENT_WEATHER/START_GET_CURRENT_WEATHER"}),function(e,t){var n="".concat(w,"&lat=").concat(e.lat,"&lon=").concat(e.lon,"&units=").concat(t);return console.log("Making request to: ".concat(n)),C.a.get(n,{cancelToken:S.token}).then(function(e){if(e.data.cod&&e.data.message)throw new Error(e.data.message);return{code:e.data.weather[0].id,group:A(e.data.weather[0].id),description:e.data.weather[0].description,temp:e.data.main.temp,unit:t}}).catch(function(e){if(!C.a.isCancel(e))throw e;console.error(e.message,e)})}(e,t)}).then(function(e){var t=e.code,a=e.group,r=e.description,c=e.temp;n(function(e,t,n,a){return{type:"@CURRENT_WEATHER/END_GET_CURRENT_WEATHER",code:e,group:t,description:n,temp:a}}(t,a,r,c))}).catch(function(e){console.error("Error getting current weather",e),n({type:"@CURRENT_WEATHER/RESET_CURRENT_WEATHER"}),n({type:"@MASKING/UNMASK_BG"})}),o=r.then(function(e){return n({type:"@FORECAST/START_GET_FORECAST"}),function(e,t){var n="".concat(D,"&lat=").concat(e.lat,"&lon=").concat(e.lon,"&units=").concat(t);return console.log("Making request to: ".concat(n)),C.a.get(n,{cancelToken:k.token}).then(function(e){if(200!==Number(e.data.cod))throw new Error(e.data.message);var n=e.data.list.map(function(e){return{ts:e.dt,code:e.weather[0].id,group:A(e.weather[0].id),description:e.weather[0].main,maxTemp:e.temp.max,minTemp:e.temp.min}});return n.shift(),{unit:t,list:n}}).catch(function(e){if(!C.a.isCancel(e))throw e;console.error(e.message,e)})}(e,t)}).then(function(e){var t=e.list;n(function(e){return{type:"@FORECAST/END_GET_FORECAST",list:e}}(t))}).catch(function(e){console.error("Error getting forecast",e),n({type:"@FORECAST/RESET_FORECAST"}),n({type:"@MASKING/UNMASK_BG"})});return Promise.all([c,o]).then(function(){n(function(e){return{type:"@UNIT/SET_UNIT",unit:e}}(t)),n({type:"@MASKING/UNMASK_BG"})})}},x=function(e,t){return new Promise(function(n,a){""!==e?n(e):function(e){return new Promise(function(t,n){navigator.geolocation.getCurrentPosition(function(e){var n={lat:e.coords.latitude,lon:e.coords.longitude};t(n)},function(){t(e().location)})})}(t).then(function(e){return function(e){var t="".concat(P,"&latlng=").concat(e.lat,",").concat(e.lon,"&result_type=administrative_area_level_3");return console.log("Making request to ".concat(t)),C.a.get(t,{cancelToken:L.token}).then(function(e){if(e.data.error_message)throw new Error(e.data.error_message);return e.data.results[0].formatted_address}).catch(function(e){if(!C.a.isCancel(e))throw e;console.error(e.message,e)})}(e)}).then(function(e){n(e)})})},J=(n(84),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleFormToggle=function(){n.props.dispatch(G())},n.handleInputChange=function(e){n.props.dispatch(I(e.target.value))},n.handleMetricUnit=function(e){n.props.dispatch(F("metric"))},n.handleImperialUnit=function(e){n.props.dispatch(F("imperial"))},n.handleSubmit=function(e){e.preventDefault(),n.inputEl.blur();var t=n.props,a=t.inputValue,r=t.address,c=t.unit,o=t.dispatch;a&&a.trim()?(o(n.props.submitAction(a,c)),n.handleFormToggle()):o(I(r))},n.handleTempToggle=function(e){n.props.dispatch(M())},n.inputEl=null,n}return Object(h.a)(t,e),Object(d.a)(t,null,[{key:"getUnitString",value:function(e){return"metric"===e?"C":"F"}}]),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch(F(this.props.defaultUnit))}},{key:"render",value:function(){var e=this,n=this.props,a=n.inputValue,c=n.formToggle,o=n.tempToggle,i=n.unit,s=n.address,l=c?"form":"";return r.a.createElement("div",{className:"weather-form ".concat(l)},c?r.a.createElement(T.a,{className:"form-inline justify-content-center",onSubmit:this.handleSubmit},r.a.createElement(O.a,{type:"text",name:"address",innerRef:function(t){e.inputEl=t},value:a,onChange:this.handleInputChange}),"\xa0",r.a.createElement(v.a,{type:"buttom",isOpen:o,toggle:this.handleTempToggle},r.a.createElement(j.a,{type:"button",caret:!0,color:"secondary"},"\xba ",t.getUnitString(i)),r.a.createElement(b.a,null,r.a.createElement(R.a,{type:"button",onClick:this.handleMetricUnit},"\xba C"),r.a.createElement(R.a,{type:"button",onClick:this.handleImperialUnit},"\xba F"))),"\xa0",r.a.createElement(N.a,{color:"info"},"Check")):r.a.createElement(N.a,{className:"btn-form",outline:!0,color:"light",onClick:this.handleFormToggle},r.a.createElement("i",{className:"fa fa-map-marker","aria-hidden":"true"}),"\xa0\xa0",s))}}]),t}(r.a.Component)),W=Object(l.b)(function(e){return e.weatherForm})(J),H=(n(89),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch(U(this.props.inputValue,this.props.unit))}},{key:"componentWillUnmount",value:function(){this.props.currentWeatherLoading&&S.cancel("Current weather request canceled"),this.props.forecastLoading&&k.cancel("Forecast request canceled")}},{key:"render",value:function(){var e=this.props,t=e.address,n=e.group,a=e.description,c=e.temp,o=e.list,i=e.unit,s=e.masking,l=o;return document.body.className="weather-bg ".concat(n),document.querySelector(".weather-bg .mask").className="mask ".concat(s?"masking":""),r.a.createElement("div",{className:"weather"},r.a.createElement("div",{className:"current"},r.a.createElement(W,{address:t,defaultUnit:i,submitAction:U}),r.a.createElement(E,Object.assign({group:n,description:a,temp:c,unit:i,masking:s},{day:"today"}))),r.a.createElement("div",{className:"forecast"},r.a.createElement(g,{list:l,unit:i,masking:s})))}}]),t}(r.a.Component)),V=Object(l.b)(function(e){return Object(f.a)({},e.currentWeather,e.forecast,{inputValue:e.weatherForm.inputValue,unit:e.unit,address:e.address,masking:e.masking})})(H),q=n(119),K="http://weathernote-env.yf2p9krem3.us-east-1.elasticbeanstalk.com/",B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",t=arguments.length>1?arguments[1]:void 0,n="".concat(K,"?");return n+="active"===e?"mode=active":"completed"===e?"mode=completed":"mode=all",n+="&project=".concat(t),console.log("Making GET request to: ".concat(n)),C.a.get(n).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})},z=function(e,t,n){var a=K;return console.log("Making POST request to: ".concat(a)),C.a.post(a,{text:e,date:t,project:n}).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})},X=function(e){var t="".concat(K,"/").concat(e);return console.log("Making POST request to: ".concat(t)),C.a.post(t).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})},Y="http://weathernote-env.yf2p9krem3.us-east-1.elasticbeanstalk.com/",Q=function(){var e="".concat(Y);return console.log("Making GET request to: ".concat(e)),C.a.get(e).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})},Z=function(e){var t=Y;return console.log("Making POST request to: ".concat(t)),C.a.post(t,{name:e}).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})},$=function(e){var t="".concat(Y,"/").concat(e);return console.log("Making DELETE request to: ".concat(t)),C.a.delete(t).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})};function ee(e){return{type:"@TODO_FORM/INPUT",value:e}}function te(e){return{type:"@TODO_FORM/INPUT_DANGER",danger:e}}function ne(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(t,n){return e||t({type:"@TODO/START_LOADING"}),(!1===n().project.hasGotProjects?Q().then(function(e){t(oe(e)),0!==e.length?t(re(e[0].name)):t(re("")),t({type:"@PROJECT/HAS_GOT_PROJECTS"})}):new Promise(function(e,t){e()})).then(function(){return B(n().filterMode,n().project.name)}).then(function(e){t(function(e){return{type:"@TODO/END_LIST_TODOS",todos:e}}(e))}).catch(function(e){console.error("Error listing todos",e)}).then(function(){t({type:"@TODO/END_LOADING"})})}}var ae=function(e){return function(t){return t({type:"@TODO/START_LOADING"}),function(e){var t="".concat(K,"/").concat(e);return console.log("Making DELETE request to: ".concat(t)),C.a.delete(t).then(function(e){if(200!==e.status)throw new Error("Unexpected response code: ".concat(e.status));return e.data})}(e).then(function(){t(ne(!0))}).catch(function(e){console.error("Error removing todos",e),t(ne(!0))})}};function re(e){return{type:"@PROJECT/SELECT_PROJECT",project:e}}function ce(e){return function(t){return t(re(e)),t({type:"@PROJECT/TOGGLE_PROJECT"}),t(ne())}}function oe(e){return{type:"@PROJECT/END_LIST_PROJECTS",projectList:e}}function ie(e){return{type:"@PROJECT/INPUT",value:e}}function se(e){return{type:"@PROJECT/INPUT_DANGER",danger:e}}n(90);var le=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleDropdownSelect=function(e){n.props.dispatch(ce(e))},n.handleRemove=function(){var e;n.props.dispatch((e=n.props.name,function(t,n){return t({type:"@TODO/START_LOADING"}),$(e).then(function(){return Q()}).then(function(a){var r;t(oe(a)),r=n().project.name===e||0===a.length?"":n().project.name,t(ce(r))}).catch(function(e){console.error("Error adding project",e),t(ce(""))})}))},n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props.name;return r.a.createElement("div",{className:"project-item d-flex flex-row"},r.a.createElement("div",{className:"project-name flex-grow-1",onClick:function(){e.handleDropdownSelect(t)}},r.a.createElement("i",{className:"fas fa-circle"}),t),r.a.createElement("div",{className:"remove align-self-center"},r.a.createElement("i",{className:"far fa-trash-alt",onClick:this.handleRemove})))}}]),t}(r.a.Component),ue=Object(l.b)()(le),de=(n(91),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleProjectToggle=function(e){var t=n.props,a=t.addingProject,r=t.dispatch;a&&n.handleCancelAddProject(),r({type:"@PROJECT/TOGGLE_PROJECT"})},n.handleInputChange=function(e){var t=e.target.value;n.props.dispatch(ie(t)),t&&n.props.inputDanger&&n.props.dispatch(se(!1))},n.handleNewProjectToggle=function(){n.props.dispatch({type:"@PROJECT/START_ADD_PROJECT"})},n.handleAddProject=function(){var e=n.props,t=e.inputValue,a=e.dispatch,r=e.projectList;if(t){for(var c=0;c<r.length;c++)if(r[c].name===t)return void alert("".concat(t," has been created."));a(function(e){return function(t,n){return t({type:"@TODO/START_LOADING"}),Z(e).then(function(){return Q()}).then(function(n){t(oe(n)),t(ce(e))}).catch(function(e){console.error("Error adding project",e),t(ce(""))})}}(t)),a(ie(""))}else a(se(!0))},n.handleCancelAddProject=function(){var e=n.props,t=e.inputValue,a=e.dispatch;""!==t&&a(ie("")),a({type:"@PROJECT/FINISH_ADD_PROJECT"})},n.inputEl=null,n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.projectToggle,a=t.projectList,c=t.name,o=t.addingProject,i=t.inputValue,s=a.map(function(e){return r.a.createElement(ue,{id:e._id,name:e.name})});return r.a.createElement("div",{className:"project align-self-start"},r.a.createElement(v.a,{type:"buttom",isOpen:n,toggle:this.handleProjectToggle},r.a.createElement(j.a,{className:"project-toggle",type:"button",caret:!0,color:"light"},""!==c?c:"Choose a project"),r.a.createElement(b.a,null,s,o?r.a.createElement("div",{className:"add-project"},r.a.createElement("input",{type:"text",className:"form-control no-border",placeholder:"Name your project",innerRef:function(t){e.inputEl=t},value:i,onChange:this.handleInputChange}),r.a.createElement("div",{className:"add-or-cancel"},r.a.createElement("button",{type:"button",class:"btn btn-info btn-sm mb-0 ml-1 mt-2",onClick:this.handleAddProject},"Add"),r.a.createElement("button",{type:"button",class:"btn btn-info btn-sm mb-0 ml-1 mt-2",onClick:this.handleCancelAddProject},"Cancel"))):r.a.createElement("div",{className:"last-item d-flex flex-row"},r.a.createElement("div",{className:"new-project flex-grow-1",onClick:this.handleNewProjectToggle},r.a.createElement("i",{className:"fas fa-plus"}),"Add project"),r.a.createElement("div",{className:"remove align-self-center"},r.a.createElement("i",{className:"far fa-times-circle"}))))))}}]),t}(r.a.Component)),pe=Object(l.b)(function(e){return Object(f.a)({},e.project)})(de),me=n(53),he=n(120),fe=(n(92),n(93),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value;n.props.dispatch(ee(t)),t&&n.props.inputDanger&&n.props.dispatch(te(!1))},n.handlePost=function(){var e=n.props,t=e.inputValue,a=e.dispatch,r=e.project,c=e.date;t?""!==r?(a(function(e,t){return function(n,a){return n({type:"@TODO/START_LOADING"}),z(e,t,a().project.name).then(function(){n(ne(!0))}).catch(function(e){console.error("Error creating todos",e),n(ne(!0))})}}(t,c)),a(ee(""))):alert("Please choose a project."):a(te(!0))},n.handleDateChange=function(e){n.props.dispatch({type:"@TODO_FORM/SET_DATE",date:e})},n.inputEl=null,n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.inputValue,a=t.date,c=this.props.inputDanger?"has-danger":"";return r.a.createElement("div",{className:"post-form"},r.a.createElement(he.a,{color:"info",className:"d-flex flex-row justify-content-center ".concat(c)},r.a.createElement(me.a,{customInput:r.a.createElement(function(e){return r.a.createElement("input",{className:"datepicker",onClick:e.onClick,value:e.value,type:"text",readOnly:!0})},null),selected:a,onChange:this.handleDateChange,minDate:new Date,dateFormat:"yyyy/MM/dd"}),r.a.createElement(O.a,{className:"input",type:"textarea",innerRef:function(t){e.inputEl=t},value:n,onChange:this.handleInputChange,placeholder:"What's next to do?"}),r.a.createElement(N.a,{className:"btn-post align-self-end mb-0 h-100",color:"info",onClick:this.handlePost},"Add")))}}]),t}(r.a.Component)),Ee=Object(l.b)(function(e){return Object(f.a)({},e.todoForm,{project:e.project.name})})(fe),ge=n(117),Te=n(118),Oe=n(34),ve=n.n(Oe),je=n(35),be=n.n(je),Re=(n(102),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleCheckboxCheck=function(e){var t;n.props.dispatch((t=n.props.id,function(e){return e({type:"@TODO/START_LOADING"}),X(t).then(function(){e(ne(!0))}).catch(function(t){console.error("Error accomplishing todos",t),e(ne(!0))})}))},n.handleRemove=function(e){n.props.dispatch(ae(n.props.id))},n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.date,a=e.ts,c=e.doneTs,o=(new Date).getFullYear(),i=new Date(n).getFullYear();return r.a.createElement("div",{className:"todo-item d-flex flex-row "+(c?"done":"undone")},r.a.createElement("div",{className:"date"},o===i?be()(n,"mmm d"):be()(n,"yyyy\nmmm d")),r.a.createElement("div",{className:"todo d-flex flex-column"},r.a.createElement("div",{className:"d-flex flex-row"},r.a.createElement("div",{className:"wrap"},r.a.createElement("div",{className:"ts"},"Created: "+ve()(1e3*a).calendar()),r.a.createElement("div",{className:"text"},t)),r.a.createElement("div",{className:"remove align-self-start",onClick:this.handleRemove},r.a.createElement("i",{class:"fas fa-trash-alt"}))),r.a.createElement("div",{className:"check d-flex justify-content-end align-items-center"},r.a.createElement("div",{className:"done-ts"},!!c&&r.a.createElement("span",null,ve()(1e3*c).calendar())),r.a.createElement("div",{className:"checkbox",onClick:this.handleCheckboxCheck},r.a.createElement("i",{className:"far "+(c?"fa-check-square":"fa-square")})))))}}]),t}(r.a.Component)),Ne=Object(l.b)()(Re),ye=(n(103),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.todos,t=r.a.createElement(ge.a,{className:"empty d-flex justify-content-center align-items-center"},r.a.createElement("div",{className:"empty-text"},"There are no other todos."));return e.length&&(t=e.map(function(e){return r.a.createElement(ge.a,{key:e.id,action:!0},r.a.createElement(Ne,e))})),r.a.createElement("div",{className:"todo-list"},r.a.createElement(Te.a,null,t))}}]),t}(r.a.Component)),Ce=Object(l.b)()(ye),_e=(n(104),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).toggleAll=function(){n.props.dispatch(function(e){return e({type:"@FILTER/TOGGLE_ALL"}),e(ne())})},n.toggleActive=function(){n.props.dispatch(function(e){return e({type:"@FILTER/TOGGLE_ACTIVE"}),e(ne())})},n.toggleComleted=function(){n.props.dispatch(function(e){return e({type:"@FILTER/TOGGLE_COMPLETED"}),e(ne())})},n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch(ne())}},{key:"render",value:function(){var e=this.props,t=e.todoLoading,n=e.todos,a=e.filterMode;return r.a.createElement("div",{className:"todos d-flex flex-column"},r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement(pe,null),r.a.createElement(q.a,{size:"sm"},r.a.createElement(N.a,{outline:"all"!==a,color:"light",onClick:this.toggleAll},"All"),r.a.createElement(N.a,{outline:"active"!==a,color:"light",onClick:this.toggleActive},"Active"),r.a.createElement(N.a,{outline:"completed"!==a,color:"light",onClick:this.toggleComleted},"Completed"))),r.a.createElement(Ee,null),r.a.createElement(Ce,{todos:n}),t&&r.a.createElement("i",{className:"fas fa-spinner fa-spin loading"}))}}]),t}(r.a.Component)),Ae=Object(l.b)(function(e){return Object(f.a)({},e.todo,{filterMode:e.filterMode})})(_e),we=(n(105),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"main"},r.a.createElement(V,null),r.a.createElement(Ae,null))}}]),t}(r.a.Component)),Se=Object(l.b)()(we),De=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"metric",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@UNIT/SET_UNIT":return t.unit;default:return e}},ke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@ADDRESS/SET_ADDRESS":return t.address;default:return e}},Pe={lat:25.0173405,lon:121.5397518},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@LOACTION/SET_LOCATION":return t.location;default:return e}},Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case"@MASKING/MASK_BG":return!0;case"@MASKING/UNMASK_BG":return!1;default:return e}},Ie={code:-1,group:"na",description:"N/A",temp:NaN,currentWeatherLoading:!1},Me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@CURRENT_WEATHER/START_GET_CURRENT_WEATHER":return Object(f.a)({},e,{currentWeatherLoading:!0});case"@CURRENT_WEATHER/END_GET_CURRENT_WEATHER":return Object(f.a)({},e,{code:t.code,group:t.group,description:t.description,temp:t.temp,currentWeatherLoading:!1});case"@CURRENT_WEATHER/RESET_CURRENT_WEATHER":return Object(f.a)({},Ie);default:return e}},Fe={inputValue:"",formToggle:!1,tempToggle:!1,unit:null},Ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@WEATHER_FORM/TOGGLE_FORM":return Object(f.a)({},e,{formToggle:!e.formToggle});case"@WEATHER_FORM/INPUT":return Object(f.a)({},e,{inputValue:t.value});case"@WEATHER_FORM/TOGGLE_TEMP":return Object(f.a)({},e,{tempToggle:!e.tempToggle});case"@WEATHER_FORM/SELECT_UNIT":return Object(f.a)({},e,{unit:t.unit});default:return e}},xe=function(){for(var e=[],t=0;t<5;t++)e[t]={ts:-t,code:-1,group:"na",description:"N/A",maxTemp:NaN,minTemp:NaN};return{list:e,forecastLoading:!1}},Je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:xe(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@FORECAST/START_GET_FORECAST":return Object(f.a)({},e,{forecastLoading:!0});case"@FORECAST/END_GET_FORECAST":return Object(f.a)({},e,{list:t.list,forecastLoading:!1});case"@FORECAST/RESET_FORECAST":return Object(f.a)({},xe());default:return e}},We={inputValue:"",inputDanger:!1,date:new Date};function He(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@TODO_FORM/INPUT":return Object(f.a)({},e,{inputValue:t.value});case"@TODO_FORM/INPUT_DANGER":return Object(f.a)({},e,{inputDanger:t.danger});case"@TODO_FORM/SET_DATE":return Object(f.a)({},e,{date:t.date});default:return e}}var Ve={todoLoading:!1,todos:[]};function qe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@TODO/START_LOADING":return Object(f.a)({},e,{todoLoading:!0});case"@TODO/END_LOADING":return Object(f.a)({},e,{todoLoading:!1});case"@TODO/END_LIST_TODOS":return Object(f.a)({},e,{todos:t.todos});default:return e}}var Ke="all";function Be(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ke;switch((arguments.length>1?arguments[1]:void 0).type){case"@FILTER/TOGGLE_ALL":return"all";case"@FILTER/TOGGLE_ACTIVE":return"active";case"@FILTER/TOGGLE_COMPLETED":return"completed";default:return e}}var ze={projectToggle:!1,name:"",projectList:[],addingProject:!1,inputValue:"",inputDanger:!1,hasGotProjects:!1};function Xe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@PROJECT/END_LIST_PROJECTS":return Object(f.a)({},e,{projectList:t.projectList});case"@PROJECT/TOGGLE_PROJECT":return Object(f.a)({},e,{projectToggle:!e.projectToggle});case"@PROJECT/SELECT_PROJECT":return Object(f.a)({},e,{name:t.project});case"@PROJECT/START_ADD_PROJECT":return Object(f.a)({},e,{addingProject:!0});case"@PROJECT/FINISH_ADD_PROJECT":return Object(f.a)({},e,{addingProject:!1});case"@PROJECT/INPUT":return Object(f.a)({},e,{inputValue:t.value});case"@PROJECT/INPUT_DANGER":return Object(f.a)({},e,{inputDanger:t.danger});case"@PROJECT/HAS_GOT_PROJECTS":return Object(f.a)({},e,{hasGotProjects:!0});default:return e}}n(106);window.onload=function(){var e=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.d,t=Object(i.e)(Object(i.c)({unit:De,address:ke,location:Le,masking:Ge,currentWeather:Me,weatherForm:Ue,forecast:Je,todoForm:He,todo:qe,filterMode:Be,project:Xe}),e(Object(i.a)(s.a)));o.a.render(r.a.createElement(l.a,{store:t},r.a.createElement(Se,null)),document.getElementById("root"))}},54:function(e,t,n){e.exports=n(107)},63:function(e,t,n){},64:function(e,t,n){},84:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){}},[[54,1,2]]]);
//# sourceMappingURL=main.9f7d328a.chunk.js.map