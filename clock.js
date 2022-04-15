

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

class createcircle{
constructor(x,y,r,ctx,typecircle){
    this.x=x;
    this.y=y;
    this.r=r;
    this.ctx=ctx;
    this.typecircle=typecircle;
}
update(x,y){
    this.x=x;
    this.y=y;
    this.draw();
}
draw(){
if(this.typecircle=="stroke"){
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    this.ctx.stroke()
}else{
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    this.ctx.fill()
}
}
}

class Line{
   constructor(x,y,x1,y1,ctx){
       this.x=x;
       this.y=y;
       this.ctx=ctx;
       this.x1=x1;
       this.y1=y1;
       this.angle=0;

    } 
   draw(loc,isHour){
       
this.ctx.beginPath();
   
       this.ctx.moveTo(canvas.width/2,canvas.height/2)
       this.ctx.lineTo(this.x1+Math.cos(this.angle)*this.ishors,this.y1+Math.sin(this.angle)*this.ishors )
       this.ctx.stroke()
      }
update(loc,isHour){
   
    this.angle=(Math.PI*2)*(loc/60)-Math.PI/2;
    this.ishors=isHour? radius-hand_truncation-Hour_hand_truncation:radius-hand_truncation;
this.draw()

}
    }

let canvas= new createcanvas(document.getElementById("canvas"));
let margin=90;
let radius=canvas.width/2-margin;
let hand_truncation=canvas.width/115;
let Hour_hand_truncation=canvas.width/110;   
let number_spacing=20;
let fontheight=1;
let minutes =80;
console.log(canvas.canvas.getBoundingClientRect().width,canvas.width)

let hand_redious=radius-number_spacing;
let circle= new createcircle(canvas.width/2,canvas.height/2,radius,canvas.context,"stroke");
let centercircle= new createcircle(canvas.width/2,canvas.height/2,12,canvas.context,"fill");
console.log(hand_redious)
function drawhands(){
    let date=new Date();
    let hour=date.getHours();
    hour=hour>12?hour-12:hour;
    let handhour=new Line(centercircle.x,centercircle.y,circle.x,circle.y,canvas.context);
    let handminutes=new Line(centercircle.x,centercircle.y,circle.x,circle.y,canvas.context);
    let handsecound=new Line(centercircle.x,centercircle.y,circle.x,circle.y,canvas.context);


    handhour.update(hour*5+(date.getMinutes()/10)*5,true);
    handminutes.update(date.getMinutes(),false);
    handsecound.update(date.getSeconds(),false);









    handhour.draw()
    handminutes.draw()
    handsecound.draw()

}
function drawnumber(){
    let numbers=[1,2,3,4,5,6,7,8,9,10,11,12]
let angle=0;
let numberwidth=0;
    numbers.forEach((number)=>{
 angle= (Math.PI/6)*(number-3);

numberwidth=canvas.context.measureText(number).width;

canvas.context.fillText(number,canvas.width/2+Math.cos(angle)*hand_redious-numberwidth/2,
                               canvas.height/2+Math.sin(angle)*hand_redious+fontheight/3)
})

let px=0,py=0,px1=0,py1=0;

for(let n=0;n<Math.PI*2;n+=Math.PI/90){
px=canvas.width+Math.cos(n*0.002)*radius/2
py=canvas.height+Math.sin(n*0.002)*radius/12
px1=canvas.width+Math.cos(n*2.5)*(radius)
py1=canvas.height+Math.sin(n*2.5)*(radius)
for(let i= 0; i <12 ;i++){
 
    canvas.context.beginPath();
    canvas.context.moveTo(px/12,py/2)
    canvas.context.lineTo(px1/2,py1/2)
    canvas.context.stroke();

}
}

}

function render(){
canvas.claercanvas() 
// canvas.context.translate(canvas.width/12,canvas.height/12)
// canvas.context.rotate(0.001,0.001)

circle.draw();
centercircle.draw();
drawhands()
drawnumber()
// canvas.context.setTransform(1,0,0,1,0,0)
// line.draw(Math.random()*Math.PI,false)
requestAnimationFrame(render)

}
render()