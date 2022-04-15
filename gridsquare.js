class Createcanvas{
    constructor(canvas){
        this.canvas=canvas;
        this.width=canvas.width;
        this.height=canvas.height;

this.color="white";

    }
    claercanvas(){
        this.context.clearRect(0,0,this.width,this.height);
    }
}

let canvas=new Createcanvas(document.getElementById("canvas"));

class loadimga{
    constructor(src){
        this.image=new Image();
        this.image.src=src;
 this.imageData=undefined
 

 
 } 
    drawimage(ctx,data){
     if(data==undefined){
        
         ctx.drawImage(this.image,0,0,canvas.width,canvas.height)
        
         if(this.imageData==undefined){
     
         if(ctx.getImageData(0,0,canvas.width,canvas.height).data[0]!==0){
      
             this.imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
          
         }
         }
     }  
    }

 }


let worker=undefined;
let pixels=[];
let image=new loadimga("1.png")
let sendnewimage=false;
function draenter(e){
 
        e.preventDefault();
        e.dataTransfer.effectAllowed="copy";
    
        
}
function dragover(e){

        e.preventDefault()
        
}
function drop(e){

        sendnewimage=true;
                e.preventDefault()
            let file=e.dataTransfer.files[0]
            if(validateImage(file)){
            
             
        setInterval(() => {
            image=previewAnduploodImage(file)
        
            if(image!==undefined){
                
                init(image)
            
            }else{
            image=previewAnduploodImage(file)
            
            }
            
        }, 500/60);
         if(worker!==undefined){
             worker.postMessage(JSON.stringify("stop"))
         }
        
            }
            
}

canvas.canvas.addEventListener("mousedown",init(image));
function init(image){
    canvas.canvas.addEventListener("dragenter",draenter,false)
    canvas.canvas.addEventListener("dragover",dragover,false)
    canvas.canvas.addEventListener("drop",drop,false)
        getImageData(image)
sendmessage(image)

        document.removeEventListener("mousedown",init)
       
}
function createoffscreen(withContext){
    if(withContext==true){
        let offscreen=document.createElement("canvas");

    offscreen.height= canvas.height
    offscreen.width= canvas.width

        let ctx=offscreen.getContext("2d");
      
    return ctx;
    }else{
        let offscreen=document.createElement("canvas");
     
    offscreen.width= canvas.width
    offscreen.height= canvas.height
   
    return offscreen.transferControlToOffscreen();;
    }

}


function getImageData(image){
let ctx=createoffscreen(true);
function render(){

    image.drawimage(ctx,undefined)
    requestAnimationFrame(render)
}
render()

}


function validateImage(image){
    let validtypes=["image/jpeg,image/png"];
  

if(validtypes.indexOf(image.type)!==-1){
    alert("invalid file Type");
    return false;
}
let maxSizeInBytes=10e6;
if(image.size>maxSizeInBytes){
    alert("file to large ")
    return false;
}
return true
}
let imge=undefined
function previewAnduploodImage(file,){


let reader=new FileReader()

reader.onload=function (e){
    imge=new loadimga(e.target.result)

    
    }
reader.readAsDataURL(file)


    if(imge!==undefined&&imge.image.src!==undefined){
        return imge
    }



}
function sendmessage(image){
worker=worker!==undefined?undefined:worker;
try{

  let Firstoffscreen=canvas.canvas.transferControlToOffscreen();

    setTimeout(()=>{
        if(image.imageData!==undefined){
            if(window.Worker){
                worker=new window.Worker("worker_square.js");
                let Secondoffscreen=createoffscreen(false)
                worker.postMessage({offscreen:Firstoffscreen,type:"Firstcanvas"},[Firstoffscreen]);
                worker.postMessage({offscreen:Secondoffscreen,type:"Secondcanvas"},[Secondoffscreen]);
                worker.postMessage(JSON.stringify({width:canvas.width,height:canvas.height,distence:100,type:"grid"}));
        

            worker.postMessage(JSON.stringify({image:image,type:"image",width:canvas.width,height:canvas.height}));
        
        
        
            }
        }
                },200)
}catch(e){

if(sendnewimage==true){
    replacecanvas(canvas.canvas)
   canvas=new Createcanvas(document.getElementById("canvas"));
  let Firstoffscreen=canvas.canvas.transferControlToOffscreen();

    let Secondoffscreen=createoffscreen(false)
    if(worker==undefined){
        if(window.Worker){
            worker=new window.Worker("worker_square.js");   
            worker.postMessage({offscreen:Firstoffscreen,type:"Firstcanvas"},[Firstoffscreen]);
     

            worker.postMessage(JSON.stringify({width:canvas.width,height:canvas.height,distence:100,type:"grid"}));
            worker.postMessage({offscreen:Secondoffscreen,type:"Secondcanvas"},[Secondoffscreen]);

        worker.postMessage(JSON.stringify({image:image,type:"image",width:canvas.width,height:canvas.height}));
           
    
        }

    }else{
        worker.postMessage({offscreen:Firstoffscreen,type:"Firstcanvas"},[Firstoffscreen]);
       
        worker.postMessage(JSON.stringify({image:image,type:"image",width:canvas.width,height:canvas.height}));
        worker.postMessage(JSON.stringify({width:canvas.width,height:canvas.height,distence:100,type:"grid"}));
            worker.postMessage({offscreen:Secondoffscreen,type:"Secondcanvas"},[Secondoffscreen]);
    
    }
     sendnewimage=false  
} 
}
}
function replacecanvas(canvas){
    let newcanvas=document.createElement("canvas");
    let container= document.getElementById("container")
    newcanvas.setAttribute("id","canvas");
    newcanvas.setAttribute("width",`${canvas.width}px`);
    newcanvas.setAttribute("height",`${canvas.height}px`);
newcanvas.style.border=canvas.style.border;
newcanvas.style.margin=canvas.style.margin;
newcanvas.addEventListener("dragenter",draenter,false)
newcanvas.addEventListener("dragover",dragover,false)
newcanvas.addEventListener("drop",drop,false)
container.replaceChild(newcanvas,canvas)
}