/**
 * Purpose: Simulate A* (A star) algorithim.
 * 
 * Guide: Select starting and ending point, the map will auto generate the path from
 * starting point to ending point (simulated A* algorithim)
 * 
 * Interactive:
 *      1. Click first cell as starting point
 *      2. Click second cell as ending point
 *      (continue click to repeat step 1)
 * 
 * Components:
 *      1. TiledMap2D
 *      2. Cell2D
 *       
 */
;(function (ns) {
    ns.AstarScene = function () {
        
    }
    ns.AstarScene.prototype = {
        firstSelectedCell: null,
        secondSelectedCell: null,
        astarMod: null,
        
        
        begin: function () {
            var self = this;
            
            // Build map
            var map = this.buildMap ();
            this.addChild (map);
            this.astarMod = new aisim.AstarMod ();
            this.astarMod.setMap (map.getMapData());
            
            
            // Register in-need events
            this.onClick = function (evt) {
                // Get col/row and cell 
                var position = map.getPosition (evt.stageX, evt.stageY);
                var cell = map.getCellAt (position.x, position.y);
                
                // Deselected first cell
                if (cell == self.firstSelectedCell) {
                                    
                } 
                // It's the first selected cell
                else if (!self.firstSelectedCell) {
                    self.firstSelectedCell = cell;    
                }        
                
                // It's the second selected cell
                else {
                    self.secondSelectedCell = cell;
                    var startingNode = self.convertCellToNode (self.firstSelectedCell);
                    var endingNode = self.convertCellToNode (self.secondSelectedCell);
                    // finding path
                    var paths = self.astarMod.findPath (startingNode, endingNode);
                    // if found path
                    if (paths) {
                        // highlight all cells in found path
                    }
                    // else
                    else {
                        // alert "path cannot be found"                        
                    }
                }
                // build path and highlight all cells in path
            }
        },
        
        buildMap: function () {
            // Set mapdata for tile map 
            var map = new aisim.TileMap2D ([]);
            return map;
        },
        
        convertCellToNode: function (cell) {
            return {x: cell.col, y: cell.row};
        }    
    }
    
}) (window);
