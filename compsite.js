class createArc{
    constructor(x,y,r,widthline,ctx,anleStarte,anleEnd,color,composite){
        this.x=x;
        this.y=y;
        this.r=r;
        this.widthline=widthline;
        this.ctx=ctx;
        this.anleStarte=anleStarte;
        this.anleEnd=anleEnd;
        this.path=new Path2D();
        this.color=color;
   this.composite=composite;
    }
    update(fun){
       fun();
        this.draw();
    }
    draw(){
        this.ctx.save()
        this.ctx.globalCompositeOperation=this.composite;
        this.ctx.beginPath()
        this.ctx.lineWidth=this.widthline;
     
        this.ctx.arc(this.x,this.y,this.r,this.anleStarte,this.anleEnd,false);
        this.ctx.fillStyle=this.color;
        this.ctx.strokeStyle=this.color;

        this.ctx.fill()
        
        this.ctx.stroke();
        this.ctx.lineWidth=this.widthline;
     
        this.path.arc(this.x,this.y,this.r,this.anleStarte,this.anleEnd,true);
        // this.ctx.fillStyle=this.color;
        // this.ctx.stroke(this.path);
this.ctx.restore()
    }
}
class createcanvas{
    constructor(canvas){
    this.canvas=canvas;
    this.context=canvas.getContext("2d");
    this.width=canvas.width;
    this.height=canvas.height;
    }
    claercanvas(){
        this.context.clearRect(0,0,this.width,this.height);
    }
}
let canvas=new createcanvas(document.getElementById("canvas"));
let circle1=new createArc(canvas.width/2,canvas.height/2,19,2.1,canvas.context,0,Math.PI*2,"red","xor");
let circle2=new createArc(10,10,12,1.5,canvas.context,0,Math.PI*2,"black","xor");
function render(){
    canvas.claercanvas()
    canvas.canvas.addEventListener("mousemove",(e)=>{
     circle2.update(()=>{
         circle2.x=e.offsetX;
         circle2.y=e.offsetY;
     }); 
       
    })
    if(canvas.context.isPointInPath(circle1.path,circle2.x,circle2.y)){
 circle1.update(()=>{
     circle1.composite="destination-over"
    //  circle2.composite="destination-in"

 }) 

    }else{
        circle1.update(()=>{
            circle1.composite="none"
            circle2.composite="destination-over"
       
        }) 
    }
    circle1.draw();
  
    circle2.draw();

    requestAnimationFrame(render)
}
render()