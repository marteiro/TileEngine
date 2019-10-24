class TileMap {
    constructor(size, tileSize, screenOffset, sketch) {
        this.sets = {};

        this.size = size;
        this.tileSize = tileSize;
        this.screenOffset = screenOffset;
        this.sketch = sketch;

        this.mouseScreenTile=new p5.Vector(0, 0);
        this.mouseInTile    =new p5.Vector(0, 0);
        this.selectedTile   =new p5.Vector(0, 0);
        this.mouseMapTile   =new p5.Vector(0, 0);
        this.cornerOut=0;

        this.tileMatrix= Array.from(Array(this.size.x), () => Array(this.size.y).fill(0))

        this.update();
    }
    

    loadSet(name, path) {
        this.sets[name] = new TileSet(this.tileSize, path, name, this.sketch);
    }

    fill(name, tx, ty) {
        this.sketch.noStroke();
        this.sketch.fill(255, 0, 0);
        this.sketch.strokeWeight(2);

        let set = this.sets[name];
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                let sPos = this.mapToScreen(x, y);
                set.draw(tx, ty, sPos.x, sPos.y);
            }
        }

        this.sketch.ellipse(
            this.screenOffset.x * this.tileSize.x,
            this.screenOffset.y * this.tileSize.y,
            5, 5
        );
    }

    drawTile(name, tx, ty) {
        this.sets[name].draw(tx, ty, this.mouseMapTile.x,this.mouseMapTile.y);
    }

    update() {
        this.mouseScreenTile.set(
            Math.floor(this.sketch.mouseX / this.tileSize.x),
            Math.floor(this.sketch.mouseY / this.tileSize.y)
        )
        this.selectedTile = this.screenToMap(this.mouseScreenTile.x, this.mouseScreenTile.y);

        this.mouseInTile.set(
            Math.round((this.sketch.mouseX%this.tileSize.x)/this.tileSize.x*1000)/1000,
            Math.round((this.sketch.mouseY%this.tileSize.y)/this.tileSize.y*1000)/1000,
        );

        let inverter={
            x:this.mouseInTile.x>.5 ? 1 : 0,
            y:this.mouseInTile.y>.5 ? 1 : 0,
        }
        
        this.cornerNormal={
            x:Math.abs((this.mouseInTile.x%.5)/.5-inverter.x),
            y:Math.abs((this.mouseInTile.y%.5)/.5-inverter.y),
        }

        this.cornerOut=this.cornerNormal.x*this.cornerNormal.y;

        let dist=(new p5.Vector(.5, .5)).dist(this.mouseInTile)

        if(this.cornerOut <= 0.25 && (dist>.2)){
            if(inverter.x && inverter.y){
                this.selectedTile.x++
            }else if(!inverter.x && !inverter.y){
                this.selectedTile.x--
            }else if(inverter.x && !inverter.y){
                this.selectedTile.y--
            } else if(!inverter.x && inverter.y){
                this.selectedTile.y++
            }
        }

        this.mouseMapTile = this.mapToScreen(this.selectedTile.x, this.selectedTile.y);
    }

    drawMouseScreenTile() {
        this.sketch.stroke(255, 0, 0);
        this.sketch.noFill();
        this.sketch.strokeWeight(2);
        this.sketch.rect(
            this.mouseScreenTile.x * this.tileSize.x,
            this.mouseScreenTile.y * this.tileSize.y,
            this.tileSize.x,
            this.tileSize.y
        );
    }

    drawMouseMapTile() {
        this.sketch.stroke(0, 0, 255);
        this.sketch.noFill();
        this.sketch.strokeWeight(2);

        this.sketch.rect(
            this.mouseMapTile.x,
            this.mouseMapTile.y,
            this.tileSize.x,
            this.tileSize.y
        );
    }

    mapToScreen(x, y) {
        let ox = this.screenOffset.x
        let oy = this.screenOffset.y
        let w = this.tileSize.x
        let h = this.tileSize.y

        return new p5.Vector(
            (ox * w) + (x - y) * (w / 2),
            (oy * h) + (y + x) * (h / 2)
        )
    }

    screenToMap(x, y) {
        let ox = this.screenOffset.x
        let oy = this.screenOffset.y
        let w = this.tileSize.x
        let h = this.tileSize.y
        return {
            x: (y - oy) + (x - ox),
            y: (y - oy) - (x - ox)
        }
    }
}