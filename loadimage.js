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
            this.imageData=ctx.getImageData(100,100,canvas.width/2,canvas.height/2);
        }
        }
    }   else{
        ctx.putImageData(this.imageData,canvas.width,canvas.height)

        
    }

   }
}
let canvas =new createcanvas(document.getElementById("canvas"))
let imga=new loadimga("1.png");
let imageData=undefined;
let arraypixels=[];
let pixels=undefined;
let nx=undefined
let ny=undefined;
let position=undefined;
function start(e){


        nx=((e.offsetX-canvas.left)/(canvas.right-canvas.left))*canvas.width;
       ny=((e.offsetY-canvas.top)/(canvas.bottom-canvas.top))*canvas.height;
     position=ny*(canvas.width*4)+nx*4;
    
}
canvas.canvas.addEventListener("mousedown",(e)=>{

    canvas.canvas.addEventListener("mousemove",start);
});
canvas.canvas.addEventListener("mouseup",()=>{
    canvas.canvas.removeEventListener("mousemove",start)
})
function render(){
canvas.claercanvas()
// canvas.context.save()
// canvas.context.translate(canvas.width/2,canvas.height/2)
    
imga.drawimage(canvas.context,undefined)

if(imga.imageData==undefined){

}else{
if(position!==undefined){

    imga.drawimage(canvas.context,imga.imageData);

        if(imga.imageData!==undefined){
        let pixelbefore=[];
        pixelbefore.push(imga.imageData.data[position],imga.imageData.data[position+1],imga.imageData.data[position+2],imga.imageData.data[position+3])
       
        arraypixels.push({pixels:pixelbefore,position:position})
      pixelbefore=[];
     pixels=imga.imageData.data;
        pixels[position]=0;
        pixels[position+1]=0;
        pixels[position+2]=0;
        pixels[position+3]=0;
        pixels[position+4]=0;
        pixels[position+4+1]=0;
        pixels[position+4+2]=0;
        pixels[position+4+3]=0;
       
        imga.imageData.data=pixels;
        // canvas.claercanvas()
        // console.log(imga.imageData.data)
 
        imga.drawimage(canvas.context,imga.imageData)

    }
        
      


  if(pixels!==undefined&&arraypixels.length>0){
setTimeout(() => {
    reset(arraypixels,pixels)  
    
},10);
      

  }
    }
}



// canvas.context.restore()
    requestAnimationFrame(render)
}
render()
function reset(arraypixels,pixels){
    arraypixels.forEach(pixel => {
        

        pixels[pixel.position]=pixel.pixels[0];

        pixels[pixel.position+1]=pixel.pixels[1];
        pixels[pixel.position+2]=pixel.pixels[2];
        pixels[pixel.position+3]=pixel.pixels[3];
        pixels[pixel.position+4]=pixel.pixels[0];

        pixels[pixel.position+4+1]=pixel.pixels[1];
        pixels[pixel.position+4+2]=pixel.pixels[2];
        pixels[pixel.position+4+3]=pixel.pixels[3];
     
    });
    imga.imageData.data=pixels;


}