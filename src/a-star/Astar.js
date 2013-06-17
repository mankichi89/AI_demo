;(function (ns) {
    ns.Astar = function () {
        
    }
    ns.Astar.prototype = {
        openList: null,
        closedList: null,
        path: null,
        
        findPath: function (startingPos, endingPos) {
            this.openList = [];
            this.closedList = [];
            this.startingNode = {x: startingPos.x, y: startingPos.y};
            this.endingNode = {x: endingPos.x, y: endingPos.y};
            this.startingNode.g = 0;
            this.startingNode.h = this.calHeuristic (startingPos, endingPos);
            this.startingNode.f = this.startingNode.g + this.startingNode.h;
            
            this.openList.push (this.startingNode);
            
            // value of this.path will be calculated in exploreNode()
            this.exploreNode (this.startingNode);
            
            return this.path;
        },
        
        exploreNode: function (node) {
            // Ignore temporary node
            this.closedList.push (node);
            for (var i = this.openList.length - 1; i >= 0; i--) {
                if (this.openList[i] == node) {
                    this.openList.splice (i, 1);
                }
            }
            
            var adjacents = this.getAdjacentPos (node);
            var checkedNode;
            for (i = adjacents.length - 1; i >= 0; i--) {
                var pos = adjacents[i];
                
                // Ignore node if it's in closed list
                if (checkedNode = this.checkClosed(pos)) {
                    continue;
                }
                // Add to open list if it's not
                if (!(checkedNode = this.checkOpen(pos))) {
                    checkedNode = {
                        x: pos.x,
                        y: pos.y,
                        g: node.g + this.calGoal(node, pos),
                        h: this.calHeuristic (pos, this.endingNode),
                        parent: node
                    };
                    checkedNode.f = checkedNode.g + checkedNode.h;
                    this.openList.push (checkedNode);
                }
                // It's in open list then consider better path
                else {
                    var g = node.g + this.calGoal (node, pos);
                    // Better path: recalculate g and f values of checked node
                    if (g < checkedNode.g) {
                        checkedNode.parent = node;
                        checkedNode.g = g;
                        checkedNode.f = checkedNode.g + checkedNode.h;
                    }
                    // Worse path, do nothing
                }
            }
            
            // found goal node -> stop
            for (i = this.openList.length - 1; i >= 0; i--) {
                if (this.openList[i].x == this.endingNode.x && this.openList[i].y == this.endingNode.y) {
                    // trace and return found path
                    var traceNode = this.openList[i];
                    this.path = [traceNode];
                    while (traceNode.parent) {
                        traceNode = traceNode.parent;
                        this.path.unshift (traceNode);
                    }
                    return;
                }
            }
            
            // open list is empty -> stop
            if (this.openList.length == 0) {
                // return failed result
                this.path = null;
                return;
            }
            
            // continue from best node
            var bestNode;
            for (i = this.openList.length - 1; i >= 0; i--) {
                if (!bestNode || bestNode.f > this.openList[i].f) {
                    bestNode = this.openList[i];
                }
            }
            this.exploreNode (bestNode)
        },
        
        checkOpen: function (pos) {
            for (var i = this.openList.length - 1; i >= 0; i--) {
                if (this.openList[i].x == pos.x && this.openList[i].y == pos.y) {
                    return this.openList[i];
                }
            }
            return false;
        },
        
        checkClosed: function (pos) {
            for (var i = this.closedList.length - 1; i >= 0; i--) {
                if (this.closedList[i].x == pos.x && this.closedList[i].y == pos.y) {
                    return this.closedList[i];
                }
            }
            return false;
        },
        
        checkValid: function (pos) {
            return (this.mapData[pos.x][pos.y] != -1);
        },
        
        calGoal: function (startPos, endingPos) {
            var dis;
            if (startPos.x == endingPos.x || startPos.y == endingPos.y) dis = 10;
            else dis = 14;
            return dis;
        },
        
        calHeuristic: function (curPos, targetPos) {
            var disX = Math.abs(curPos.x - targetPos.x);
            var disY = Math.abs(curPos.y - targetPos.y);
            var dx1 = curPos.x - this.endingNode.x;
            var dy1 = curPos.y - this.endingNode.y;
            var dx2 = this.startingNode.x - this.endingNode.x;
            var dy2 = this.startingNode.y - this.endingNode.y;
            var cross = Math.abs(dx1*dy2 - dx2*dy1);
            var heuristic = 10*Math.sqrt(disX*disX + disY*disY);
            // heuristic += cross * 0.001;
            heuristic *= (1.0 - 0.001);
            return heuristic;
            
            // return (10*(disX > disY ? disX : disY));
            // return (10 * (disX + disY));
        },
        
        setMapData: function (mapData) {
            this.mapData = mapData;  
        },
        
        /**
         * Return nodes connected to passed position 
         * @param {Object} pos
         */
        getAdjacentPos: function (pos) {
            var adjacents = [];
            // Return adjacent positions from 8 direction
            var x = pos.x;
            var y = pos.y;
            var noCol = this.mapData[0].length;
            var noRow = this.mapData.length;
            // top left
            if (x > 0 && y > 0 && this.mapData[y-1][x-1] != -1) {
                // adjacents.push ({x: x-1, y: y-1});
            }
            // top mid
            if (y > 0 && this.mapData[y-1][x] != -1) {
                adjacents.push ({x: x, y: y-1});
            }
            // top right
            if (x < noCol-1 && y > 0 && this.mapData[y-1][x+1] != -1) {
                // adjacents.push ({x: x+1, y: y-1});
            }
            // mid right
            if (x < noCol-1 && this.mapData[y][x+1] != -1) {
                adjacents.push ({x: x+1, y: y});
            }
            // bot right
            if (x < noCol-1 && y < noRow-1 && this.mapData[y+1][x+1] != -1) {
                // adjacents.push ({x: x+1, y: y+1});
            }
            // bot mid
            if (y < noRow-1 && this.mapData[y+1][x] != -1) {
                adjacents.push ({x: x, y: y+1});
            }
            // bot left
            if (x > 0 && y < noRow-1 && this.mapData[y+1][x-1] != -1) {
                // adjacents.push ({x: x-1, y: y+1});
            }
            // mid left
            if (x > 0 && this.mapData[y][x-1] != -1) {
                adjacents.push ({x: x-1, y: y});
            }
            return adjacents;
        }
    }
}) (window);
