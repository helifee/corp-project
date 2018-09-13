function createWin(winId, winTitle, iframePage) {
			
			var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : this.width,
					height : this.height,
					maximizable : true,
					modal : true,
					html : "<iframe width='100%' height='100%' frameborder='0' src='"
							+ iframePage + "'></iframe>"
				});
				
			}
			curFormWin = win;
			return win;
		}