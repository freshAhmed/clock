  class createcanvas{
      constructor(canvas){
          this.canvas=canvas;
          this.width=canvas.width;
          this.height=canvas.height;
          this.context=canvas.getContext("2d");


      }
      claercanvas(){
          this.context.clearRect(0,0,this.width,this.height);
      }
  }
class Line{
  constructor(px1,py1,px2,py2,ctx,width,dir){
this.px1=px1;
this.py1=py1;
this.px2=px2;
this.py2=py2;
this.deltaY=this.py2-this.py1;
this.deltaX=this.px2-this.px1;
this.ctx=ctx;
this.magnitude=width;
this.direction=dir;
this.origanldirection=dir;
this.directions=["x++","y++","y--","x--"]; 
this.colores=["#26FCC5","#E6CD2E","#FAB36B","#FAE96B"]
this.corner=["bevel","miter","round"]
}

  draw(){

let random=Math.floor(Math.random()*this.colores.length)

this.ctx.beginPath();
this.ctx.lineWidth=22;  
// this.ctx.lineJoin=this.corner[Math.floor(this.corner.length-1)];
this.ctx.miterLimit= 111.5;
    this.ctx.moveTo(this.px1/2,this.py1);
    this.ctx.lineTo(this.px2/2,this.py2);
  
    this.ctx.strokeStyle=this.colores[random];
    this.ctx.stroke();
    
  }
  update(random1,random2){
    // this.ctx.stroke();

    if(this.origanldirection==this.direction){

  if(this.direction=="y++"){
    this.deltaY=Math.sqrt((this.magnitude*this.magnitude));
    this.py1=this.deltaY+this.py2;
    let newdir=this.directions.filter(i=>i!=="y--"||i!=="y++");
  let random=Math.floor(Math.random()*newdir.length);
     
  
  
      this.direction=newdir[random];
  
    this.py1=this.py2;
    this.px1=this.px2
    
  
  
  
  }else if(this.direction=="x++") {
    this.deltaX=Math.sqrt((this.magnitude*this.magnitude));
    this.px1=this.px2+this.deltaX
    let newdir=this.directions.filter(i=>i!=="x++"||i!=="x--");
  let random=Math.floor(Math.random()*newdir.length);
    
      
  
        this.direction=newdir[random];
        this.px1=this.px2;
    this.py1=this.py2;
  
  
  
  
  }else if(this.direction=="y--"){
    this.deltaY=Math.sqrt((this.magnitude*this.magnitude));
    this.py1=this.deltaY+this.py2;
    let newdir=this.directions.filter(i=>i!=="y++"||i!=="y--");
    let random=Math.floor(Math.random()*newdir.length);
      
  
    this.direction=newdir[random];
    this.px1=this.px2;
    this.py1=this.py2;
  
  
  }else if(this.direction=="x--"){
    this.deltaX=Math.sqrt((this.magnitude*this.magnitude));
    // this.px1=this.px2+this.deltaX
    let newdir=this.directions.filter(i=>i!=="x++"||i!=="x--");
    let random=Math.floor(Math.random()*newdir.length);
    
  
        this.direction=newdir[random];
        this.px1=this.px2;
        this.py1=this.py2; 
        
    
  
    // this.magnitude=Math.sin(Math.random()*this.px1);
  
  
   
  }

}else{
  this.direction=this.origanldirection;
}


// this.draw(  )
}
}
let x=0;
let y=0;
let canvas=new createcanvas(document.getElementById("canvas"));

let line=[];

canvas.canvas.addEventListener("mousemove",(e)=>{
  // line=[];
canvas.claercanvas();
let bandingbox=canvas.canvas.getBoundingClientRect();

  x=e.offsetX
  y=e.offsetY
// for(let i=0; i<=41;i++){
//   if(i==0){

//   }else{
//   line.push(new Line(e.offsetX,e.offsetY,e.offsetX,e.offsetY,canvas.context,Math.random()*20))

//   }
// }
if(line.length<40){
  line.push(new Line(e.offsetX,e.offsetY-105,e.offsetX,e.offsetY-105,canvas.context,10.0001,"x++",))
  line.push(new Line(e.offsetX,e.offsetY+105,e.offsetX,e.offsetY+105,canvas.context,0.0001,"x--",))
  line.push(new Line(e.offsetX,e.offsetY,e.offsetX,e.offsetY,canvas.context,11,"y--",))
  line.push(new Line(e.offsetX,e.offsetY,e.offsetX,e.offsetY,canvas.context,0.0001,"y++",))

}


} )
let x1=0,y1=0;

let frame=undefined;

function render(){
setTimeout(()=>{
if(x1<=100){
  x1+=0.02;
y1+=0.02;
}else{
canvas.claercanvas();

  x1=0;
y1=0;
}

},500/60)
if(line!==undefined&&line.length>0){
let random1=0,random2=0;
line.forEach((element,index) => {
 

  setTimeout(()=>{
  if(element.direction=="x++"){
    // random1=Math.floor(Math.random()*4)<1?2:1
    // element.direction=element.directions[random1*2]

    element.px2+=x1/12


      }else if(element.direction=="x--"){

        // random1=Math.floor(Math.random()*4)<1?2:random1
        // element.direction=element.directions[random1*2]

    element.px2-=x1/12
  }else if(element.direction=="y++"){

    // random1=Math.floor(Math.random()*4)<1?2:random1
    // element.direction=element.directions[random1*2]
    element.py2+=y1/12;

  }else if(element.direction=="y--"){

  

    element.py2-=y1/12;
    // random1=Math.floor(Math.random()*4)<1?2:random1
    // element.direction=element.directions[random1]

  }


},500/60)
element.update()


 
  element.draw()
  if(element.px2>canvas.width||element.py2>canvas.height || (element.px2<0||element.py2<0)){
    let random=Math.floor(Math.random()*x)
    element.px2=x*Math.floor(Math.random()*3)+1;
    element.py2=y*Math.floor(Math.random()*3)+1;
    element.update()
 
      }
});  



}

 frame= requestAnimationFrame(render)

}
render()
function createmap(){
 let map=[];
 let directions=["x++","x--","y++","y--"];
for(let i= 0; i<=canvas.width;i++){
  map[i]=[];
  for(let y=0;y<=canvas.height;y++){

  
  let random=Math.floor(Math.random()*directions.length);
  if((map[i][y-1]=="x++"&&(directions[random]=="y++"||directions[random]=="y--"))){
    map[i][y]=directions[random];

  }else if((map[i][y-1]=="x--"&&(directions[random]=="y++"||directions[random]=="y--"))){
    map[i][y]=directions[random];

  }else if((map[i][y-1]=="y--"&&(directions[random]=="x++"||directions[random]=="x--"))){
    map[i][y]=directions[random];

  }else if((map[i][y-1]=="y++"&&(directions[random]=="x++"||directions[random]=="x--"))){
    map[i][y]=directions[random];

  }else if(map[i][y-1]==undefined){
    map[i][y]=directions[random];

  }else{
   y-=1; 
  }
}
}

  return map
}
  