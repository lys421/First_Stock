const app=new Vue({
        el:"#app",
        data(){
          return{
            i:0,
            flag:false,
            words:[]
          }
        },
        methods:{
          setId(id){
            localStorage.setItem("id",id)
          },
          subWord(){
            if (this.i<=0){
              this.i=this.words.length-1
              return this.words[this.words.length-1]
            }
            this.flag=false
            this.i--
            this.setId(this.i)
            return this.words[this.i]
          },
          addWord(){
            if (this.i>=this.words.length-1){
              this.i=0
              return this.words[0]
            }
            this.flag=false
            this.i++
            this.setId(this.i)
            return this.words[this.i]
          },
          getMean(){ 
            this.flag=!this.flag
          },
          loadJSON() {
           const promise=new Promise((res,rej)=>{
             const xhr=new XMLHttpRequest();
             xhr.open("GET","http://localhost:3000/words");
             xhr.onload=function(){
               if (xhr.status>=200&&xhr.status<300){
                 res(JSON.parse(xhr.responseText))
               }else{
                 rej(xhr.statusText)
               }
             }
             xhr.send()
           })
           promise.then(data=>{
             this.words=data
             console.log(this.words);
             this.i=localStorage.getItem("id")||0
           }).catch(err=>{
             console.log(err);
           })
          }
        },
        created(){
          this.loadJSON();
        }
      })
