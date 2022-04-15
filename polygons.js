class createcanvas{
    constructor(canvas){
        this.canvas=canvas;
        this.width=canvas.width;
        this.height=canvas.height;
        this.context=canvas.getContext("2d");
this.color="white";

    }
    claercanvas(){
        this.context.clearRect(0,0,this.width,this.height);
    }
}
class Polygons{
constructor(startpoint,endpoints,sides,radius ,widthline,position,startangle,context){
this.startp=startpoint;
this.x=position.x;
this.y=position.y;
this.endp=endpoints;
this.r=radius;
this.startangle=startangle;
this.ctx=context;
this.sides=sides;
this.lineWidth=widthline;
this.points=[];
this.previousPolygons=undefined;
this.path=new Path2D();
    }
createpoints(){
    this.points=[];
    let angle=this.startangle||0;
  
            for(let i=0;i<=this.sides;i++){

                this.points.push({x:this.x+this.r*Math.cos(angle),y:this.y-this.r*Math.sin(angle) })
            angle+=(2*Math.PI)/this.sides;
            
            
            
         
    }


    }
connectpointsPolygons(){
this.ctx.save()
this.ctx.translate(this.x+this.r,this.y+this.r+5)
this.path.rect(this.x,this.y,this.r+5,this.r+5)
        
// this.ctx.fill(this.path)
this.ctx.restore()
    this.ctx.beginPath();
this.ctx.save()
// this.ctx.translate(canvas.width/2,canvas.height/2)

// this.ctx.transform(1,0,4,-1,-440,820)

this.ctx.lineWidth=this.lineWidth;
this.ctx.moveTo(this.points[0].x,this.points[0].y)
for(let i=1;i<=this.sides;i++){
this.ctx.lineTo(this.points[i].x,this.points[i].y)
}
this.ctx.stroke()
if(this.previousPolygons!==undefined){
    for(let i=0;i<this.points.length-1;i++){
    if(i>2||i<1){
        this.ctx.beginPath();
    
        this.ctx.lineWidth=0.2;
        this.ctx.moveTo(this.points[i].x,this.points[i].y);
        this.ctx.lineTo(this.previousPolygons.points[this.sides-i].x,this.previousPolygons.points[this.sides-i].y);
    
        this.ctx.stroke()
  
    }
    }
    }   
this.ctx.closePath();


this.ctx.restore(   )



}
update(f){ 
    f()

}
drawconnectionOfPolygons(){
 
}

}
let Polygones=[];
let x=0;
let canvas=new createcanvas(document.getElementById("canvas"));
canvas.canvas.addEventListener("mousedown",(e)=>{

    Polygones.forEach(row=>{
        row.forEach(element=>{
    //    console.log(canvas.context.isPointInPath(element.path,e.OffsetX,e.OffsetY),e,e.OffsetY)
            // if(ce.offsetX,e.offsetY)){
        element.update(()=>{
        if(element.r==0){
            element.sides+=1
        if(element.previousPolygons!==undefined){
            element.previousPolygons.sides+=1
        }
        }else{
            element.sides+=1
            if(element.previousPolygons!==undefined){
                element.previousPolygons.sides+=1
            }
        }

        })
    //    } 
        
        
        } )
        } )
})
function creategrid(Polygones){

    for(let y=0; y< canvas.height/2;y+=10){
        Polygones[y]=[]
    for(let x=0;x<canvas.width/2;x+=20){
    Polygones[y][x]=new Polygons(0,5,1,5,0.5,{x:x,y:y},(Math.PI),canvas.context)


}  
    }
    

 return Polygones 
}
function connectpolygons(Polygones){  
     for(let x=0;x<canvas.width;x+=20){
for(let y=0;y<canvas.height;y+=10){
 


if( Polygones[y-20]!==undefined &&Polygones[y-20][x]!==undefined){
   if(Polygones[y-20][x].previousPolygons==undefined){
Polygones[y][x].previousPolygons=Polygones[y-20][x];
       
   } 

}
    }
}
return Polygones
}
function render(){
    x=6;

    canvas.claercanvas()


 if(Polygones.length>0){

    Polygones.forEach(row=>{
      row.forEach(element=>{
        // element.update(()=>{
        //     element.r=5
        // })
        // element.sides=x
        element.createpoints();  

     element.connectpointsPolygons()
     element.drawconnectionOfPolygons()
      })
    })
         
}else{
Polygones= creategrid(Polygones);
Polygones=connectpolygons(Polygones)
}
    requestAnimationFrame(render)   
}
render()