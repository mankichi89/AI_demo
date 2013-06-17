;(function (ns) {
    ns.TileMap2D = function (tileWidth, tileHeight, noCol, noRow) {
        this.initialize ();
        
        this.cellEnum = {
            empty: {
                color: "#EEEEEE",
                id: 0    
            }
        };
        
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.noCol = noCol;
        this.noRow = noRow;
        this.drawMap ();
    };
    var p = ns.TileMap2D.prototype = new createjs.Container ();
    
    p.drawMap = function () {
        var self = this;
        
        var map = [];
        for (var i = 0; i < this.noRow; i++) {
            map[i] = [];
            for (var j = 0; j < this.noCol; j++) {
                map[i][j] = 1;
            }
        }
        
        var width = this.tileWidth;
        var height = this.tileHeight;
        
        // Draw grid
        var board = new createjs.Shape ();
        board.graphics.setStrokeStyle (0.2);
        board.graphics.beginStroke ("#000000");
        for (var i = 0, l = map[0].length*width; i <= l; i+=width) {
            board.graphics.moveTo (i, 0);
            board.graphics.lineTo (i, map.length*height);
        }
        for (i = 0, l = map.length*height; i <= l; i+=height) {
            board.graphics.moveTo (0, i);
            board.graphics.lineTo (map[0].length*width, i);
        }
        board.graphics.endStroke ();
        
        // Cell grid
        var cellGrid = new createjs.Shape ();
        this.cellList = [];
        for (i = map.length-1; i >= 0; i--) {
            this.cellList[i] = [];
            for (var j = map[i].length-1; j >= 0; j--) {
                var cell = new QuadCell2D (j*width, i*height, width, height);
                cell.setColor (this.cellEnum.empty.color);
                cell.setType ("empty");
                this.cellList[i][j] = cell;
                cellGrid.graphics.beginFill (this.cellEnum.empty.color);
                cellGrid.graphics.drawRect (j*width+1, i*height+1, width-2, height-2);
                cellGrid.graphics.endFill ();
            }
        }
        
        this.addChild (cellGrid);
        this.addChild (board);
        this.board = board;
        this.cellGrid = cellGrid;
        this.map = map;
    }
    
    p.clearMap = function () {
        for (var i = this.noRow - 1; i >= 0; i--) {
            for (var j = this.noCol - 1; j >= 0; j--) {
                this.cellList[i][j].setType ("empty");
                this.cellGrid.graphics.beginFill (self.cellEnum.empty.color);
                this.cellGrid.graphics.drawRect (j*width, i*height, this.tileWidth, this.tileHeight);
                this.cellGrid.graphics.endFill ();
            }
        }    
    };
    
    p.getPosAt = function (x, y) {
        var col = (x/this.tileWidth) | 0;
        var row = (y/this.tileHeight) | 0;
        return {x: col, y: row};      
    };
    
    p.getCellPosOnWin = function (col, row) {
        return {x: col*this.tileWidth, y: row*this.tileHeight};
    };
    
    p.setCellColor = function (x, y, color) {
        this.cellList[y][x].setColor (color);
        
        this.cellGrid.graphics.beginFill (color);
        this.cellGrid.graphics.drawRect (x*this.tileWidth+1, y*this.tileHeight+1, this.tileWidth-2, this.tileHeight-2);
        this.cellGrid.graphics.endFill ();
    };
    
    p.getCellColor = function (x, y) {
        return this.cellList[y][x].getColor ();    
    };
    
    p.getCellType = function (x, y) {
        return this.cellList[y][x].getType();        
    };
    
    p.setCellType = function (x, y, type) {
        this.cellList[y][x].setType (type);
        this.cellList[y][x].setColor (this.cellEnum[type].color);
        
        this.cellGrid.graphics.beginFill (this.cellEnum[type].color);
        this.cellGrid.graphics.drawRect (x*this.tileWidth+1, y*this.tileHeight+1, this.tileWidth-2, this.tileHeight-2);
        this.cellGrid.graphics.endFill ();
    };
    
    p.defineCellType = function (name, color) {
        this.cellEnum[name] = color;
    };
    
    
}) (window);
