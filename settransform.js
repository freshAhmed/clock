    class createArc{
        constructor(x,y,r,widthline,ctx,anleStarte,anleEnd,moveing){
            this.x=x;
            this.y=y;
            this.r=r;
            this.widthline=widthline;
            this.ctx=ctx;
            this.anleStarte=anleStarte;
            this.anleEnd=anleEnd;
            this.path=new Path2D();
            this.color="white"
    this.moveing=moveing;
        }
        update(fun){
        fun();
            this.draw();
        }
        draw(){


            this.ctx.fillStyle="red"
            this.ctx.save();
            this.ctx.translate(canvas.width/2,canvas.height/2)

            this.ctx.lineWidth=this.widthline;
            this.ctx.beginPath()
        
            this.ctx.arc(this.x,this.y,this.r,this.anleStarte,this.anleEnd,false);
            this.ctx.fillStyle=this.color;
            this.ctx.fill ()
            this.ctx.stroke();
            this.ctx.beginPath()

            this.ctx.lineWidth=this.widthline;
        
            this.path.arc(this.x,this.y,this.r*10,this.anleStarte,this.anleEnd,true);
            this.ctx.fillStyle=this.color;
            // this.ctx.stroke();

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
    let canvas= new createcanvas(document.getElementById("canvas"));
    
    let angle=0;
    let circles=[]
    canvas.canvas.addEventListener("mousedown",(e)=>{
        circles.push(new createArc(0,0,5,0.1,canvas.context,0,Math.PI*2,true))
        circles.push(new createArc(0,0,5,0.1,canvas.context,0,Math.PI*2,true))

        circles.push(new createArc(0,0,5,0.1,canvas.context,0,Math.PI*2,true))
        circles.push(new createArc(0,0,5,0.1,canvas.context,0,Math.PI*2,true))
        circles.push(new createArc(0,0,5,0.1,canvas.context,0,Math.PI*2,true))

    })

    setTimeout(()=>{
        
        // canvas.context.save()
    createclippingarea(canvas.context,"circle");
    // canvas.context.stroke()
    // canvas.context.restore()
    
    },150/60)
    function render(){

    

        let random=Math.floor(Math.random()*2);
         let random1=random==0?random-20:random+60;
        if(angle<Math.PI*12){
            angle+=0.0009
        }else{
            canvas.claercanvas()
            angle=0;
        }
if(circles.length>0){
    circles.forEach((circle,index)=>{
        setInterval(()=>{
        if(index>5){
     

    if(circle.moveing==true){
        circle.update(()=>{
            circle.x=(canvas.width/2-(random1*index))*Math.cos(angle/(0.200));
            circle.y=(canvas.height/2-(random1*index))*Math.sin(angle/(0.5));
        })


    }


        }else{
            if(circle.moveing==true){
                circle.update(()=>{
                    circle.x=(canvas.width/2-100)*Math.cos(angle/(0.200));
                    circle.y=(canvas.height/2-100)*Math.sin(angle/(0.5));
            
                })

            }
        }
       
      

    },200)

    circle.draw()

    })

}

    requestAnimationFrame(render)


    }
    function createclippingarea(ctx,typeofpath){
       if(typeofpath=="circle"){
        ctx.beginPath();
        // ctx.translate(canvas.width/2,canvas.height/2);
        ctx.arc(canvas.width/2,canvas.height/2,150,0,Math.PI*2,false);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.clip()

       }
    }
    render()