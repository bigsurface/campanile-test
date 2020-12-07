class Heart {
    constructor(imgPath){
        this.imgPath = imgPath;
        this.x = Math.random() * 600;
        this.y = Math.random() * 600;
        this.z = Math.random() * 100;
        this.angleinc = Math.random() * 0.2;
        this.theta = 0;
        this.img = null;
        this.imgLoaded = false;
        this.loadImageBuffer = this.createImagePromise(this.imgPath);
    }


    createImagePromise(imgPath){
        return new Promise((resolve) => {
            this.img = loadImage(imgPath, resolve);
        })
    }

    display(){
        if(this.imgLoaded){
        push();
            translate(-400, -400, 0);
            translate(this.x, this.y, this.z);
            rotateX(this.theta / 2);
            rotateY(this.theta / 2);
            rotateZ(this.theta / 2);
            texture(this.img);
            // model(heart);
            sphere();
            
        pop();
        }
    }


    update(){
        this.theta += this.angleinc;
        if(this.imgPath){
            if(!this.imgLoaded){
                this.loadImageBuffer.then(() =>{
                    this.imgLoaded = true;
                });
            }
        }
    }
}

