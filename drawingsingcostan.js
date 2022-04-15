
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
        this.ctx.shadowColor=this.color;
        this.ctx.shadowOffsetX=-2
        this.ctx.shadowOffsetY=2
        this.ctx.shadowBlur=Math.floor(Math.random()*4);  


        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        // this.ctx.fillStyle=this.color;
        this.ctx.stroke()
    }else{
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        this.ctx.fillStyle=this.color;

        this.ctx.fill()
    }
    }
    }
    let canvas =new createcanvas(document.getElementById("canvas"));
    let reduos=canvas.width/4;

    let circle= new createcircle(canvas.width/2,canvas.height/2,reduos,canvas.context,"stroke");
    let line={px1:0,py1:0,px2:0,py2:0};
let randoum=Math.random()*500;
circle.color="black"
// gradient.addColorStop(0.50,"green")
// gradient.addColorStop(1,"black")


    function render(){
     canvas.claercanvas()
     circle.draw();
 

   
        requestAnimationFrame(render)
    }
    render()