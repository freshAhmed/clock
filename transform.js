class createArc{
    constructor(x,y,r,widthline,ctx,anleStarte,anleEnd,angle){
        this.x=x;
        this.y=y;
        this.r=r;
        this.widthline=widthline;
        this.ctx=ctx;
        this.anleStarte=anleStarte;
        this.anleEnd=anleEnd;
        this.path=new Path2D();
        this.color="white"
   this.angle=angle
    }
    update(fun){
       fun();
        this.draw();
    }
    draw(){
        this.ctx.save();
        this.ctx.translate(canvas.width/2,canvas.height/2);
        this.ctx.transform(0.12/Math.cos(this.angle),Math.sin(this.angle/2),Math.sin(this.angle/2),0.12/Math.cos(this.angle),0,0)

        this.ctx.beginPath()
        this.ctx.lineWidth=this.widthline;
        this.ctx.moveTo(this.x,this.y)
        this.ctx.lineTo(this.x+this.r,this.y+this.r)
        this.ctx.stroke();
        this.ctx.beginPath()
        this.ctx.moveTo(this.x+this.r,this.y+this.r)

        this.ctx.lineTo(this.x+this.r,this.y)
        this.ctx.stroke();
        this.ctx.beginPath()
        this.ctx.moveTo(this.x+this.r,this.y+this.r)

        this.ctx.lineTo(this.x,this.y+this.r)
        this.ctx.stroke();
        this.ctx.beginPath()

        this.ctx.arc(this.x,this.y,this.r,this.anleStarte,this.anleEnd,false);
        this.ctx.fillStyle=this.color;
        
        this.ctx.stroke();
        this.ctx.lineWidth=this.widthline;
     
        this.path.arc(this.x,this.y,this.r*20,this.anleStarte,this.anleEnd,true);
        this.ctx.fillStyle=this.color;
        // this.ctx.fill(this.path)
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
let circle=undefined;
let canvas = new createcanvas(document.getElementById("canvas"));
// canvas.canvas.addEventListener("mousedown",(e)=>{
//     canvas.context.save();
// canvas.context.translate(canvas.width/12,canvas.height/2);
//     circle=new createArc(0,0,15,0.1,canvas.context,0,Math.PI*2,);
//      circle.draw()
//     canvas.context.restore()
// });
canvas.canvas.addEventListener("mousedown",(e)=>{


    circle=new createArc(0,100,100,2.1,canvas.context,0,Math.PI*2,);
   
});
function render(){
if(circle!==undefined){

canvas.canvas.addEventListener("mousemove",(e)=>{
    let random=Math.floor(Math.random()*2);

    setTimeout(()=>{
        random=random==0?random+Math.PI*2:Math.PI*random;
     circle.update(()=>{
     let angle=Math.sin(random+(e.offsetY/2));

         circle.angle=angle;
     })

    },100/10)
     
})
circle.draw()
}
setTimeout(()=>{
    canvas.claercanvas()

    requestAnimationFrame(render)

},3000/10)


}

render()