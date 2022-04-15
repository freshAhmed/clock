
let canvas=undefined;
let mousecoordients={};
let circledata=undefined;
class createArc{
    constructor(x,y,r,widthline,ctx,anleStarte,anleEnd,){
        this.x=x;
        this.y=y;
        this.r=r;
        this.widthline=widthline;
        this.ctx=ctx;
        this.anleStarte=anleStarte;
        this.anleEnd=anleEnd;
        this.path=new Path2D();
        this.color="white"
   
    }
    update(fun){
       fun();
        this.draw();
    }
    draw(){
        this.ctx.beginPath()
        this.ctx.lineWidth=this.widthline;
     
        this.ctx.arc(this.x,this.y,this.r,this.anleStarte,this.anleEnd,false);
        this.ctx.fillStyle=this.color;
        
        this.ctx.stroke();
        this.ctx.lineWidth=this.widthline;
     
        this.path.arc(this.x,this.y,this.r*40,this.anleStarte,this.anleEnd,true);
        this.ctx.fillStyle=this.color;

        // this.ctx.stroke(this.path);

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
postMessage("true")
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
    this.ctx.quadraticCurveTo(this.p1.x,this.p1.y,this.p2.x,this.p2.y);
 
    // this.ctx.fillStyle="#F5DF44"
    this.ctx.fill()
    this.ctx.stroke()
    }
     }

self.addEventListener("message",(e)=>{
    let data=e.data;
    if(data.type==undefined){
 //circle data & mouse data
    data=JSON.parse(data);
if(data.type==="mousecoordients"){
    mousecoordients=data;
}else if(data.type==="circle"){
    circledata=data;
}
    }else{
    // canvas
  canvas=new createcanvas(data.canvas);

    }

})
try{
    if(circledata!==undefined&&canvas!==undefined){
        
           
            init(canvas,circledata)
          }else{
              throw new Error("undefined")
          }
}catch(e){
 
if(e.Error==undefined){
    setTimeout(()=>{

        if(circledata!==undefined&&canvas!==undefined){

                init(canvas,circledata)
              }
    },5/1)
}
}
let onepoint=[];

function init(canvas,circle){
    let distenceX=100;
    let distenceY=90;
let grid=creategrid(canvas.width,canvas.height,distenceX,distenceY,canvas,circle);
let angle=0;
connectpoint(grid,distenceX,distenceY)
let radous=grid[distenceY][distenceX].r;
function render(){
 
    canvas.claercanvas()

  grid.forEach((row,indexY)=>{
     
row.forEach((point,indexX)=>{
   
    point.quadratices.forEach(quadratice=>{
if(mousecoordients!==undefined){
if(canvas.context.isPointInPath(point.circle.path,mousecoordients.x+Math.random()*20    ,mousecoordients.y)){
point.circle.update(()=>{
// if(point.circle.r>10){
//     point.circle.r-=1
// }else{
//     point.circle.r=10;
// }     
})

quadratice.update(()=>{
    quadratice.p1.x=mousecoordients.x
    quadratice.p1.y=mousecoordients.y

})
}else{
    setTimeout(() => {
        quadratice.update(()=>{
            quadratice.p1.x=quadratice.mp.x
            quadratice.p1.y=quadratice.mp.y
        
        })  
    }, 500/60);

}
}

    quadratice.draw()
})
  
point.circle.draw()

})
  })   
    requestAnimationFrame(render)
}
render()
}
function creategrid(width_grid,height_grid,distenceX,distenceY,canvas,circledata){
    let grid=[];

    for(let y=distenceY;y<height_grid;y+=distenceY){
    
        grid[y]=[];
    
    for(let x=distenceX;x<width_grid;x+=distenceX){
    
        let circle=new createArc(x,y,circledata.r,circledata.widthline,canvas.context,0,Math.PI);

        grid[y][x]={x:x,y:y,circle:circle};
    
    
        
        
    
    
    
    }
    }
    
    return grid
    }
function connectpoint(grid,distenceX,distenceY){

    grid.forEach((row,indexY)=>{
    row.forEach((point,indexX)=>{
        let points_around=[];
           let quadratices=[];

if(row[indexX-distenceX]!==undefined){//previouspoint
    points_around.push({point:row[indexX-distenceX],dir:"left"});
}

if(grid[indexY-distenceY]!==undefined){//previouspointinpreviousrow
    points_around.push({point:grid[indexY-distenceY][indexX],dir:"top"});
    }
    if(row[indexX+distenceX]!==undefined){
        points_around.push({point:row[indexX+distenceX],dir:"right"})

    }
    if(grid[indexY+distenceY]!==undefined){
        points_around.push({point:grid[indexY+distenceY][indexX],dir:"down"})

    }

    if(points_around.length<=4&&points_around.length>=2){
       
    points_around.forEach(p=>{
        let result=undefined;
     
            
        for(let angle=1;angle<Math.PI; angle+=Math.PI){
         if(p.dir=="top"){
            let p2={},m={};
    
            p2.x=p.point.x+Math.cos(angle);
            p2.y=p.point.y+Math.sin(angle)+point.circle.r; //down
            m.x=point.circle.x+Math.cos(angle);
            m.y=point.circle.y+Math.sin(angle)-point.circle.r //top
           result={p2:p2,m:m,dir:p.dir};

        }else if(p.dir=="left"){
            let p2={},m={};
            p2.x=p.point.x+Math.cos(angle)+point.circle.r; //right
            p2.y=p.point.y+Math.sin(angle);
            m.x=point.circle.x+Math.cos(angle)-point.circle.r; //left
            m.y=point.circle.y+Math.sin(angle);
            result={p2:p2,m:m,dir:p.dir};
            
            
         }else if(p.dir=="right"){
            let p2={},m={};
            p2.x=p.point.x+Math.cos(angle)-point.circle.r; //left
            p2.y=p.point.y+Math.sin(angle);
            m.x=point.circle.x+Math.cos(angle)+point.circle.r; //right
            m.y=point.circle.y+Math.sin(angle);
             result={p2:p2,m:m,dir:p.dir};
         }else if(p.dir=="down"){
            let p2={},m={};
            p2.x=p.point.x+Math.cos(angle); 
            p2.y=p.point.y+Math.sin(angle)-point.circle.r; //top
            m.x=point.circle.x+Math.cos(angle);
            m.y=point.circle.y+Math.sin(angle)+point.circle.r; //down
            result={p2:p2,m:m,dir:p.dir};
         
         }
        }
      if(result!==undefined){
        quadratices.push(new Quadratic({x:result.m.x,y:result.m.y},
            {x:result.m.x,y:result.m.y},
            {x:result.p2.x,y:result.p2.y},0.3,0,canvas.context,0,point.dir))

      }
        
        }) 
}

point.quadratices=quadratices                                   

    })

})
}