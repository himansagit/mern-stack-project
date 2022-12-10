(()=>{var e={417:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});const n=require("axios");var o=a.n(n),s=a(689),i=a.n(s);const r=function(e){const[t,a]=(0,s.useState)(!1),[n,r]=(0,s.useState)(""),[l,c]=(0,s.useState)(),[d,m]=(0,s.useState)("");return i().createElement("div",{className:"card"},i().createElement("div",{className:"our-card-top"},t&&i().createElement("div",{className:"our-custom-input"},i().createElement("div",{className:"our-custom-input-interior"},i().createElement("input",{onChange:e=>c(e.target.files[0]),className:"form-control form-control-sm",type:"file"}))),i().createElement("img",{src:e.photo?`/uploaded-photos/${e.photo}`:"/fallback.png",className:"card-img-top",alt:`${e.species} named ${e.name}`})),i().createElement("div",{className:"card-body"},!t&&i().createElement(i().Fragment,null,i().createElement("h2",null,e.name),i().createElement("p",{className:"text-muted small"},e.species),!e.readOnly&&i().createElement(i().Fragment,null,i().createElement("button",{onClick:()=>{a(!0),r(e.name),m(e.species),c("")},className:"btn btn-sm btn-primary"},"Edit")," ",i().createElement("button",{onClick:async()=>{o().delete(`/animal/${e.id}`),e.setAnimals((t=>t.filter((t=>t._id!=e.id))))},className:"btn btn-sm btn-outline-danger"},"Delete"))),t&&i().createElement("form",{onSubmit:async function(t){t.preventDefault(),a(!1),e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,name:n,species:d}:t}))));const s=new FormData;l&&s.append("photo",l),s.append("_id",e.id),s.append("name",n),s.append("species",d);const i=await o().post("/update-animal",s,{headers:{"Content-Type":"multipart/form-data"}});i.data&&e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,photo:i.data}:t}))))}},i().createElement("div",{className:"mb-1"},i().createElement("input",{autoFocus:!0,onChange:e=>r(e.target.value),type:"text",className:"form-control form-control-sm",value:n})),i().createElement("div",{className:"mb-2"},i().createElement("input",{onChange:e=>m(e.target.value),type:"text",className:"form-control form-control-sm",value:d})),i().createElement("button",{className:"btn btn-sm btn-success"},"Save")," ",i().createElement("button",{onClick:()=>a(!1),className:"btn btn-sm btn-outline-secondary"},"Cancel"))))}},860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},689:e=>{"use strict";e.exports=require("react")},684:e=>{"use strict";e.exports=require("react-dom/server")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,a),s.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const{MongoClient:e,ObjectId:t}=a(13),n=a(860),o=a(738),s=a(109),i=a(470),r=a(441),l=a(17),c=a(689),d=a(684),m=a(417).Z,p=o();let u;i.ensureDirSync(l.join("public","uploaded-photos"));const b=n();function f(e,t,a){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.species&&(e.body.species=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:s(e.body.name.trim(),{allowedTags:[],allowedAttributes:[]}),species:s(e.body.species.trim(),{allowedTags:[],allowedAttributes:[]})},a()}b.set("view engine","ejs"),b.set("views","./views"),b.use(n.static("public")),b.use(n.json()),b.use(n.urlencoded({extended:!1})),b.get("/",(async(e,t)=>{const a=await u.collection("animals").find().toArray(),n=d.renderToString(c.createElement("div",{className:"container"},!a.length&&c.createElement("p",null," No animal!, Admin needs to add few animals"),c.createElement("div",{className:"animal-grid mb-3"},a.map((e=>c.createElement(m,{key:e._id,name:e.name,species:e.species,photo:e.photo,id:e.id,readOnly:!0})))),c.createElement("p",null," ",c.createElement("a",{href:"/admin"},"Login"))));t.render("home",{generatedHTML:n})})),b.use((function(e,t,a){t.set("WWW-Authenticate","Basic realm='Our MERN App"),"Basic YWRtaW46YWRtaW4="==e.headers.authorization?a():(console.log(e.headers.authorization),t.status(401).send("TryAgain"))})),b.get("/admin",((e,t)=>{t.render("admin")})),b.delete("/animal/:id",(async(e,a)=>{"string"!=typeof e.params.id&&(e.params.id="");const n=await u.collection("animals").findOne({_id:new t(e.params.id)});n.photo&&i.remove(l.join("public","uploaded-photos",n.photo)),u.collection("animals").deleteOne({_id:new t(e.params.id)}),a.send("Deleted")})),b.get("/api/animals",(async(e,t)=>{const a=await u.collection("animals").find().toArray();t.json(a)})),b.post("/create-animal",p.single("photo"),f,(async(e,a)=>{if(e.file){const t=`${Date.now()}.jpg`;await r(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(l.join("public","uploaded-photos",t)),e.cleanData.photo=t}console.log(e.body);const n=await u.collection("animals").insertOne(e.cleanData),o=await u.collection("animals").findOne({_id:new t(n.insertedId)});a.send(o)})),b.post("/update-animal",p.single("photo"),f,(async(e,a)=>{if(e.file){const n=`${Date.now()}.jpg`;await r(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(l.join("public","uploaded-photos",n)),e.cleanData.photo=n;const o=await u.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData});o.value.photo&&i.remove(l.join("public","uploaded-photos",o.value.photo)),a.send(n)}else u.collection("animals").findOneAndUpdate({_id:new t(e.body._id)},{$set:e.cleanData}),a.send(!1)})),async function(){const t=new e("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin");await t.connect(),u=t.db(),b.listen(3e3)}()})()})();