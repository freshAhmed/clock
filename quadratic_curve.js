class createcanvas{
    constructor(canvas){
        this.canvas=canvas;
        this.width=canvas.width;
        this.height=canvas.height;
        this.context=canvas.getContext("2d");
this.color="white";
this.random=0;

    }
    claercanvas(){
        this.context.clearRect(0,0,this.width,this.height);
    }
}
 class Quadratic{
constructor(movep,p1,p2,widthline,width ,ctx,angle,dir){
    this.mp=movep;
    this.p1=p1;
    this.p2=p2;
    this.linewidth=widthline;
this.width=width;
this.dir=dir;
this.ctx=ctx;
this.angle=angle;
}
update(fun){
    fun()
    this.draw();
}
draw(){
this.ctx.lineWidth=this.linewidth;


this.ctx.beginPath();
this.ctx.moveTo(this.mp.x,this.mp.y);
this.ctx.bezierCurveTo(this.p1.x,this.p1.y,1000,1000, this.p2.x,this.p2.y);
// this.ctx.quadraticCurveTo(this.p1.x,this.p1.y,this.p2.x,this.p2.y);
// this.ctx.quadraticCurveTo(this.p1.x+150,this.p1.y-150,this.p2.x/1.5,this.p2.y/1.5);

this.ctx.stroke()
}
 }
 class createArc{
    constructor(x,y,r,startanle,endabgle,linewidth,ctx,radous,dir){
this.x=x;
this.position={x:x,y:y}
this.y=y;
this.r=r;
this.radous=radous
this.startanle=startanle;
this.endabgle=endabgle;
this.linewidth=linewidth;
this.ctx=ctx;
this.angle=0;
this.dir=dir;
this.colores=["red","white"]
this.move="false"
}
    update(update){
        update()
        this.draw()
       }
       draw(){
           
     
this.ctx.lineWidth=this.linewidth;
  this.path=new Path2D();
this.path.arc(this.x ,this.y,this.r,this.startanle,this.endabgle)

this.ctx.strokeStyle=this.colores[this.random]

this.ctx.stroke(this.path)
       }

}
let canvas=new createcanvas(document.getElementById("canvas"))
let quadratices=[];
let circles=[];
let randomsize=Math.floor(Math.random()*2)+15;
let round=50;
canvas.canvas.addEventListener("mousedown",(e)=>{
    randomsize=randomsize==0?12:randomsize;
    let loc=windowtocanvas(canvas,e.offsetX,e.offsetY);
    

    quadratices.push(new Quadratic({x:e.offsetX,y:e.offsetY}//m1
        ,{x:loc.x,y:loc.y}//p1
        ,{x:e.offsetX,y:e.offsetY},0.5,0.4,canvas.context,0,"-"))

// quadratices.push(new Quadratic({x:e.offsetX,y:e.offsetY}//m1
//                                ,{x:loc.x,y:loc.y}//p1
//                                ,{x:e.offsetX,y:e.offsetY},0.5,0.4,canvas.context,0,"+"))
})

let circle=new createArc(canvas.width/2,canvas.height/2,10,0,Math.PI*2,0.5,canvas.context,0,"x++");
 function render(){
     canvas.claercanvas()
     
if(quadratices.length>0){
  quadratices.forEach((quadratic,index)=>{
      if(quadratic.dir=="+"){
        quadratic.update(()=>{
            canvas.canvas.addEventListener("mousemove",(e)=>{
  if(quadratic.angle<=Math.PI*2){
          quadratic.angle+=0.1;
  }else{
  quadratic.angle=0
  quadratic.p1.y=0;
  quadratic.p1.x=0;
  }
              quadratic.p2.x=e.offsetX;
  quadratic.p1.y=Math.sin(quadratic.angle)*2.5;
  quadratic.p1.x=Math.cos(quadratic.angle)*2.5;
  
  quadratic.mp.y=circle.y-(circle.r/2)*Math.PI/2;
  quadratic.mp.x=circle.x-(circle.r/2)*Math.PI/2;
  
  ;
  
  quadratic.draw()
            })
        })
      }else if(quadratic.dir=="-"){
        quadratic.update(()=>{
            canvas.canvas.addEventListener("mousemove",(e)=>{
  if(quadratic.angle<=Math.PI*2){
          quadratic.angle+=2;
  }else{
  quadratic.angle=0;
  quadratic.p1.y=0;
  quadratic.p1.x=0;
  }
//   quadratic.p2.y=e.offsetY;

//   quadratic.p2.x=e.offsetX;
  quadratic.p2.y=500;
  quadratic.p2.x=100;

for(let i =0;i<Math.PI*2;i+=Math.PI){

    quadratic.mp.y=circle.y+Math.sin(i)-circle.r;
    quadratic.mp.x=circle.x+Math.cos(i);

    
};
canvas.canvas.addEventListener("mousemove",(e)=>{
    if(canvas.context.isPointInPath(circle.path,e.offsetX,e.offsetY,)){
circle.move="true"

    }  
    
})
if(circle.move){
    canvas.canvas.addEventListener("mousemove",(e)=>{

    circle.update(()=>{
        circle.x=e.offsetX;
        circle.y=e.offsetY;

    })
        
    })
}
  
  quadratic.draw()
            })
        })
      }
  
  })   

}
circle.draw()
    requestAnimationFrame(render)

}
 render()


function windowtocanvas(canvas,x,y){
let box=canvas.canvas.getBoundingClientRect();
return {
    x:x-box.left*(canvas.width/box.width),
    y:y-box.top*(canvas.height/box.height),
}
}
function getangle( ){

}