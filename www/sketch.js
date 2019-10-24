const s = ( s ) => {
  let tile;
  let text;
  let map;

  s.preload= () => {
    text= new TextDrawer(s, 'assets/fonte.otf');
    map=new TileMap(
      new p5.Vector(15, 15),
      new p5.Vector(48, 24),
      new p5.Vector(7, 4),
      s
    );
    
    map.loadSet('basic', 'assets/Tile.png');
  }

  s.setup= () => {
    s.createCanvas(720, 480, s.WEBGL);
    s.noSmooth() 
    s.rectMode(s.CORNERS);
  }

  s.draw= () => {
    s.translate(-s.width/2,-s.height/2,0);
    s.background(200);


    // map.sets['basic'].draw(1,0,0,0)
    map.fill('basic',0,1);
    // map.drawMouseScreenTile();
    // map.drawMouseMapTile();
    map.drawTile('basic',1,0)
    
    text.setText([
      `tilesize=[${map.tileSize.x},${map.tileSize.y}]`,
      `mouse=[${s.mouseX},${s.mouseY}]`,
      `screenTile=[${map.mouseScreenTile.x},${map.mouseScreenTile.y}]`,
      `normal=[${map.mouseInTile.x},${map.mouseInTile.y}]`,
      `mapTile=[${map.selectedTile.x},${map.selectedTile.y}]`
    ]);

    text.draw();
    
  }

  s.mouseMoved= () => {
    map.update();
  }
};

let myp5 = new p5(s);
