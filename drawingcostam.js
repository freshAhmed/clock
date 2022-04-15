
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
let canvas=new createcanvas(document.getElementById("canvas"));
class halfCircle{
    constructor(x,y,r,dirction,startp,endp,context){
this.r=r;
this.X=x;
this.Y=y;
this.startp=startp;
this.endp=endp;
this.context=context;
this.dir=dirction;
this.distence=endp-startp;
this.colores=["black","white"]
 }
 update(x,y,r){
this.r+=r;
this.X=x;
this.Y=y
if(this.r<=0){
    let random=Math.floor(Math.random()*canvas.width-2020)
    this.r=random<=0?0:random ;

}       

this.draw()
 }
 draw(){

     let randomcolor=this.colores[Math.floor(Math.random()*this.colores.length)];
     this.context.lineWidth=0.5;
    this.context.beginPath()

this.context.arc(this.X,this.Y,this.r,this.startp,this.endp,Math.PI,true) 
this.context.strokeStyle=randomcolor==undefined?"black":randomcolor;
this.context.stroke()
}
}

let halfcircles=undefined;
let x=0,y=0;
canvas.canvas.addEventListener("mousemove",(e)=>{
    x=canvas.width/2
    y=canvas.height/2
    halfcircles=[];
 
if(halfcircles.length<14){
    halfcircles.push(new halfCircle(x,y,150,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x+150,y+150,50,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x,y,150,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x+120,y+120,350,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x,y,20,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x+150,y+150,250,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x,y,10,"x++",0,0,canvas.context));
    halfcircles.push(new halfCircle(x+10,y+150,250,"x++",0,0,canvas.context));

}

})
let x1=0,y1=0;

function render(){



if(halfcircles!==undefined){
    halfcircles.forEach(Element=>{
   if(Element.dir=="x++"){

       if(Element.endp<Math.PI*2){
   
        Element.endp+=0.0001;
           Element.startp-=0.01
        //    Element.update(x,y)
  
        }else{
            Element.endp=-Math.PI
            // Element.startp=-0.12
   

           
         
        }
   }else if(Element.dir=="x--"){
    if(Element.endp<=Element.startp){
        Element.endp+=0.0001   ;
        Element.startp-=0.00001;
    }
}
Element.update(x,y,-0.11)

Element.draw()       

} )
canvas.claercanvas()

halfcircles[0].draw()     
halfcircles[1].draw()     
halfcircles[2].draw()     
halfcircles[3].draw() 
}
    

setTimeout(()=>{

    requestAnimationFrame(render)

},600/60)

}
render()