;(function (ns) {
    ns.QuadCell2D = function (x, y, width, height) {
        this.initialize ();
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.background = new createjs.Shape ();
        this.addChild (this.background);
    };
    ns.QuadCell2D.prototype = new createjs.Container ();
    
    ns.QuadCell2D.prototype.setColor = function (color) {
        this.color = color;
        return;
        this.background.graphics.clear ();
        this.background.graphics.beginFill (color);
        this.background.graphics.drawRect (1, 1, this.width-1, this.height-1);
        this.background.graphics.endFill ();
    };
    ns.QuadCell2D.prototype.getColor = function () {
        return this.color;
    };
    ns.QuadCell2D.prototype.setType = function (type) {
        this.type = type;    
    };
    ns.QuadCell2D.prototype.getType = function () {
        return this.type;
    };
}) (window);
