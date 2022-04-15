let data_of_grid = undefined;
let onscreencanvas = undefined;
let offscreencanvas = undefined;
let grid = undefined;
let image = undefined;
let stoprender=false;

class creategrid {
    constructor(data) {
        this.width = data.width;

        this.height = data.height;
        this.distence = data.distence;
        this.grid = this.createpoint();
    }
    createpoint() {
        let grid = []
          let positionx=Math.floor(Math.random()*2)

            let positiony=Math.floor(Math.random()*2)
        for (let x = 1; x < this.width ; x+= this.distence) {

            for (let y = 1; y < this.height; y+= this.distence) {
            positionx=positionx==0?positionx=onscreencanvas.width/2:positionx=onscreencanvas.width/positiony/4;

                positiony=positiony==0?positiony=onscreencanvas.height/2:positiony=onscreencanvas.height/positionx/4;

       
                grid.push({ width: this.distence, height: this.distence, correctpx: x, correctpy: y, imageData: undefined ,x:positionx,y:positiony});
                // console.log(grid)
            }
        }
        // console.log(grid)
        return grid;
    }
    draw(ctx) {


        this.grid.forEach(point => {

            ctx.beginPath()
            ctx.lineWidth=0.3;

            ctx.rect(point.x, point.y, point.width, point.height)

            if(point.imageData!==undefined){

    ctx.putImageData(point.imageData,point.x,point.y)
}
ctx.strokeStyle="white"
            ctx.stroke()

        })

    }
    update(f){
 f()
    }
}
class createcanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.left = 0;
        this.top = 0;
        this.bottom = canvas.height;
        this.right = canvas.width;

    }
    claercanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

self.addEventListener("message", (e) => {
console.log(e.data)



    let data = e.data;
    if (data.type == undefined) {
        data = JSON.parse(data);
        if (data.type == "image") {

            image = data.image;
            image.width = data.width;
            image.height = data.height;

        } else if (data.type == "grid") {
            data_of_grid = data;
        }else if(data=="stop"){
        
self.close()

        }
    } else {
        if (data.type == "Firstcanvas") {
            onscreencanvas = new createcanvas(data.offscreen)

        } else {
            offscreencanvas = new createcanvas(data.offscreen)

        }


    }
    console.log(onscreencanvas)
    init(data_of_grid, onscreencanvas, offscreencanvas);
})

function init(data_of_grid, onscreencanvas, offscreencanvas) {
  

    if (data_of_grid != undefined && image !== undefined && offscreencanvas !== undefined) {
        grid = new creategrid(data_of_grid);
        createImage(image.width,image.height,image.imageData.data,offscreencanvas.context)
        grid.grid.forEach(point => {
point.imageData=offscreencanvas.context.getImageData(point.correctpx,point.correctpy,point.width,point.height)     
})

        render()

    }

}

function render() {
    onscreencanvas.claercanvas()  
      grid.grid.forEach(point=>{
setInterval(()=>{

        grid.update(()=>{

        point.x=point.x<point.correctpx?point.x+5:point.x;
        point.y=point.y<point.correctpy?point.y+5:point.y;

        point.y=point.y>point.correctpy?point.y-5:point.y;
        

        point.x=point.x>point.correctpx?point.x-5:point.x;
        
    
      
        })
 },160000/60)
       
     
})


    grid.draw(onscreencanvas.context)
 requestAnimationFrame(render)

}
function copyobjectToUint8ClampedArray(object) {
    let array = [];
    let keysOfobject = Object.keys(object);
    keysOfobject.forEach(key => {
        array[key] = object[key];

    })
    return array
}

function createImage(width, height, data, ctx) {
   
   let arraydata= copyobjectToUint8ClampedArray(data);

    let newImageData = ctx.createImageData((arraydata.length/height)/4,(arraydata.length/width)/4 );
    for (let i = 0; i < newImageData.data.length; i += 4) {
        newImageData.data[i] = arraydata[i];
        newImageData.data[i + 1] = arraydata[i + 1];
        newImageData.data[i + 2] = arraydata[i + 2];
        newImageData.data[i + 3] = arraydata[i + 3]/0.9;

    }
    ctx.putImageData(newImageData, 0, 0);
 
}
