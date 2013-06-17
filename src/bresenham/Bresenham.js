;(function (ns) {
    ns.Bresenham = function () {
        this.timeStep = 100;    
    }
    ns.Bresenham.prototype = {
        setMap: function (map) {
            this.map = map;
        },
        
        setStartNode: function (pos) {
            this.startNode = {x: pos.x, y: pos.y};
        },
        
        setEndNode: function (pos) {
            this.endNode = {x: pos.x, y: pos.y};
        },
        
        loop: function () {
            
        },
        
        start: function () {
            var dx = Math.abs(this.endNode.x - this.startNode.x);
            var dy = Math.abs(this.endNode.y - this.startNode.y);
            var sx = this.endNode.x > this.startNode.x ? 1 : -1;
            var sy = this.endNode.y > this.startNode.y ? 1 : -1;
            var currrentStep = 0;
            var nextCol = this.startNode.x;
            var nextRow = this.startNode.y;
            
            this.path = [this.startNode];            
            var fraction;                        
            if (dx > dy) {
                fraction = 2*dy - dx;
                while (nextCol != this.endNode.x) {
                    if (fraction > 0) {
                        nextRow += sy;
                        fraction = fraction - 2*dx;
                    }
                    fraction = fraction + 2*dy;
                    nextCol += sx;
                    this.path[currrentStep] = {x: nextCol, y: nextRow};
                    currrentStep++;
                }
            }
            else {
                fraction = 2*dx - dy;
                while (nextRow != this.endNode.y) {
                    if (fraction > 0) {
                        nextCol += sx;
                        fraction = fraction - 2*dy;
                    }
                    fraction = fraction + 2*dx;
                    nextRow += sy;
                    this.path[currrentStep] = {x: nextCol, y: nextRow};
                    currrentStep++;
                }
            }
            this.path.pop();
        },
        
        stop: function () {
            
        },
        
        setTimeStep: function (time) {
            this.timeStep = time;
        },
        
        togglePlay: function () {
            
        }
    }
}) (window);
