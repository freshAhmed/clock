class createcanvas{
    constructor(canvas){
    this.canvas=canvas;
    this.context=canvas.getContext("2d");
    this.width=canvas.width;
    this.height=canvas.height;
    this.left=0;
    this.right=canvas.width;
    this.top=0;
    this.bottom=canvas.height;

    }
    claercanvas(){
  
        this.context.clearRect(0,0,this.width,this.height);
    }
}
class createNewimage{
    constructor(width,height,pixelarray,position,offscreenContext){
        this.w=width;
        this.h=height;
        this.pixels=new Uint8ClampedArray(pixelarray);
      this.ctx=offscreenContext;
        this.x=position.x;
        this.y=position.y;
        this.image=new Image(this.w,this.h);
        this.newImageData=undefined;
    }
    manipulateData(){
        this.newImageData=this.ctx.getImageData(this.x,this.y,this.w,this.h)
      
         let newPixels=this.newImageData.data;
        for(let i = 0; i<this.pixels.length;i++){
            this.newImageData.data[i]=this.pixels[i];
            
    }
    this.ctx.putImageData(this.newImageData,0,0,0,0,this.w,this.h);
// this.ctx.clearRect(0,0,this.w,this.h)
    // this.ctx.drawImage(this.ctx.canvas,0,0,this.w,this.h);
   
return this.ctx.canvas;
    }

}
class loadimga{
    constructor(src){
        this.image=new Image();
        this.image.src=src;
       this.imageData=undefined
 } 
 draw(ctx,cliparre,arre,offscreenContext){

if(cliparre==false){
    ctx.drawImage(this.image,0,0,canvas.width,canvas.height);
if(arre.w>1){
this.imageData=ctx.getImageData(arre.x,arre.y,arre.w,arre.h)

}
}else{
ctx.drawImage(this.image,0,0,canvas.width,canvas.height);
// this.imageData=ctx.getImageData(arre.x,arre.y,arre.w,arre.h)
if(arre.w>1){
    this.imageData=ctx.getImageData(arre.x,arre.y,arre.w,arre.h)
    
    }
if(this.imageData!==undefined){
if(offscreenContext!==undefined){
    let newimage=new createNewimage(arre.w,arre.h,this.imageData.data,{x:arre.x,y:arre.y},offscreenContext);
    newimage=newimage.manipulateData();
    let w=arre.w;
    let h=arre.h;

    let sw=w*20.99;
    let sh=h*20.99;
    arre.update(()=>{
        arre.w=sw/20;
        arre.h=sh/20;
    
    })
    // console.log(newimage)
ctx.save()
ctx.translate(arre.x,arre.y);

    ctx.drawImage(newimage,0,0,w,h,-sw/2+w,-sh/2+h,sw,sh);
ctx.restore()
}




}


}
 }

 }


class createRect{
    constructor(width,height,position,context){
        this.w=width;
        this.h=height;
        this.x=position.x;
        this.y=position.y;
        this.ctx=context;
        this.type="rect";
        this.moving=false;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.x,this.y,this.w,this.h);
        this.ctx.strokeStyle="green"
        this.ctx.stroke();

    }
    update(f){
        f();
    }

}
let canvas=new createcanvas(document.getElementById("canvas"));
let rect=new createRect(0,0,{x:0,y:0},canvas.context);
let dataRect={};
let image=new loadimga("1.png")
let offscreenContext=undefined;
canvas.canvas.addEventListener("mousedown",initposition)
function initposition(e){
  
        dataRect.x=e.offsetX;
        dataRect.y=e.offsetY;
        canvas.canvas.addEventListener("mousemove",incresedwidth)
        canvas.canvas.removeEventListener("mousedown",initposition);
        canvas.canvas.addEventListener("dblclick",(e)=>{
        canvas.canvas.addEventListener("mousemove",moverect)
 offscreenContext= createofscreenCanvas(rect.w,rect.h);
         
            canvas.canvas.removeEventListener("mousemove",incresedwidth)

// createclippingarea(rect,rect.ctx)
rect.ctx.restore()
cliparra=true;
        })
}
function incresedwidth(e){
   
    dataRect.width=e.offsetX;
    dataRect.height=e.offsetY;

}
function moverect(e){
   
    dataRect.x=((e.offsetX-canvas.left)/(canvas.right-canvas.left))*canvas.width;
    dataRect.y=((e.offsetY-canvas.top)/(canvas.bottom-canvas.top))*canvas.height;
   
    rect.moving=true;
}
let cliparra=false;
function render(){
canvas.claercanvas()

    if(dataRect.width!==undefined){
   
    rect.update(()=>{
        rect.w=dataRect.width;
        rect.h=dataRect.height;
        rect.x=dataRect.x;
        rect.y=dataRect.y;


})

}
image.draw(canvas.context,cliparra,rect,offscreenContext)

rect.draw();


    requestAnimationFrame(render)
}
render()
function createclippingarea(arre,ctx){
    ctx.save()
if(arre.type=="rect"){
ctx.beginPath();
ctx.rect(arre.x,arre.y,arre.width,arre.height);
ctx.clip();

}
return arre;
}
function createofscreenCanvas(width,height){
    let offscreen=document.createElement("canvas");
    offscreen.style.display="none";
     offscreen.width= width;
     offscreen.height= height;
    //  document.body.appendChild(offscreen);
    let ctx=offscreen.getContext("2d");
return ctx;
}