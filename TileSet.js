class TileSet{
    constructor(tileSize, imagePath, name, sketch){

        this.tileSize=tileSize;
        this.imagePath=imagePath;
        this.name=name;
        this.sketch=sketch;

        this.art = sketch.loadImage(imagePath, this.loaded.bind(this));
    }

    loaded(){
        if(this.art.width%this.tileSize.x==0 && this.art.height%this.tileSize.y==0){
            let y=0;
            let camadas=0;
            while(y<this.art.height){
                y=this.tileSize.y*(camadas+camadas+1);
                if(y<=this.art.height){
                    camadas++
                }
            }
            this.setSize=new p5.Vector(this.art.width/this.tileSize.x, camadas);

            this.processTiles();
        }else{
            console.error("Tile Imcompatível")
        }
    }

    processTiles(){
        // cria array 2d
        this.matrix= Array.from(Array(this.setSize.x), () => Array(this.setSize.y).fill(0))

        let altura=this.tileSize.y;
        let topo=0;
        for(let y=0; y<this.setSize.y; y++){
            for(let x=0; x<this.setSize.x; x++){
                this.matrix[x][y]={
                    anchor:new p5.Vector(x*this.tileSize.x, topo),
                    size:new p5.Vector(this.tileSize.x, altura)
                }
            }
            topo+=altura;
            altura+=this.tileSize.y;            
        }
    }

    draw(srcX, srcY, x, y){
        let data=this.matrix[srcX][srcY];
        this.sketch.image(
            this.art,
            x,y-(data.size.y-this.tileSize.y),
            data.size.x,data.size.y,
            data.anchor.x,data.anchor.y,
            data.size.x,data.size.y
        );
    }
}