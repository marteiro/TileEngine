class TextDrawer{
  constructor(sketch, fontPath){
    this.sketch=sketch;

    this.position=sketch.createVector(0, 0);
    this.myFont = sketch.loadFont(fontPath, ()=>{this.ready=true;});
    this.hasText=false;
  }
  
  setText(textArray){
    if(textArray.length>0){
       this.hasText=true;
       this.text=textArray;
    }
  }
  
  draw(){
    if(this.hasText && this.ready){
      this.sketch.fill(0);
      this.sketch.textSize(12);
      this.sketch.textFont(this.myFont);
      this.text.forEach((text, i) => {
        this.sketch.text(text, this.position.x, this.position.y+(12*(i+1)));
      });
    }
  }
}