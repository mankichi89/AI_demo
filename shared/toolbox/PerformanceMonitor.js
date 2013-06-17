;(function (window) {
	function PerformanceMonitor () {
		this.initialize ();
	    this.dataList = { };
	    this.countData = 0;
	}
	var p = PerformanceMonitor.prototype = new createjs.Container ();

    p.registerDatas;

	p.showFPS = function () {
		if ( !this.fpsTf ) {
			this.fpsTf = new createjs.Text ( "", "24px Arial", "#000000" );
			this.fpsTf.x = this.fpsTf.y = 10;
			this.fpsTf.textAlign = "left";
		}
		this.addChild ( this.fpsTf );
	}
	
	p.hideFPS = function () {
		if ( this.fpsTf ) {
			this.removeChild ( this.fpsTf );
		}
	}
	
	p.onTick = function () {
		if ( this.fpsTf ) {
			this.fpsTf.text = "FPS: " + ((createjs.Ticker.getMeasuredFPS() * 100)|0) / 100;
		}
	}
    
    p.showData = function (typeData, value) {
        if (!this.dataList[typeData]) {
            this.countData++;
            this.dataList[typeData] = new createjs.Text ("", "21px Arial", "#009900");
            this.dataList[typeData].x = 10;
            this.dataList[typeData].y = 10 + 30 * this.countData;
            this.addChild (this.dataList[typeData]);
        }
        this.dataList[typeData].text = typeData + ": " + value.toString ();
    }
	
	
	window.PerformanceMonitor = PerformanceMonitor;
}) (window);
