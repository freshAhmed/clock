class createcanvas{
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

let canvas=new createcanvas(document.getElementById("canvas"));



let worker=undefined;

document.addEventListener("mousedown",init());
function init(){

        let offscreen=canvas.canvas.transferControlToOffscreen();
        
        if(window.Worker){
            worker=new window.Worker("worker.js");
            worker.postMessage({canvas:offscreen,type:"canvas"},[offscreen]);
        worker.postMessage(JSON.stringify({r:4,startangle:0,endangle:Math.PI*2,widthline:0.4,type:"circle"}));
            canvas.canvas.addEventListener("mousemove",(e)=>{
        let box={x:e.offsetX,y:e.offsetY,type:"mousecoordients"}
      
        worker.postMessage(JSON.stringify(box));
        
        })
        }
        document.removeEventListener("mousedown",init)
}
function windowtocanvas(canvas,x,y){
    let box=canvas.canvas.getBoundingClientRect();
    return {
        x:x-box.left*(canvas.width/box.width),
        y:y-box.top*(canvas.height/box.height),
    }
    }
    document.addEventListener("load",(e)=>{
console.log(e)
    })