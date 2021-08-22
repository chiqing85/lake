(function(){
	$.cookie = function( option) {
		var n = option + "=";
		var ca = document.cookie.split(";");
		for(var i=0; i<ca.length; i++) {
	        var c = ca[i].trim();
	        if (c.indexOf(option)==0) {
	         return c.substring(option.length,c.length);
	        }
	    }
    	return undefined;
	};
	$.setcookie = function ( n, v, i ) {
		if( v != null ) {
			var j = { e:0, p:"/"}
			j = $.extend({}, j, i)
			var d = new Date();
		    d.setTime(d.getTime()+(j.e*24*60*60*1000));
		    var expires = "expires="+d.toGMTString() + "path=" + j.p
		    document.cookie = n+"="+v+"; "+ expires;
		}
	};

	$.delcookie = function( n ) {
		if( n != null ) {
			document.cookie = n + "=;expires = " + new Date().toGMTString()
		}
	};

	$.reader = function( option ) {
		$(window).scroll( function(e) {
			var t = $(window).scrollTop();
			if( $(window).scrollTop() > 70 ) {
				$("body").addClass("fullscreen")
			} else {
				$("body").removeClass("fullscreen")
			}
		})
	};

	$.fn.extend({
		// 加载验证
		"Captcha":function(options) {
			var $this = this;
			$.get("/chptcha", function(c) {
				$this.parent().append(c)
			})
		}
	});


	// 滑块插件
	var slider  = function( e, s) {
		this.e = e;
		this.isok = false;
		this.StartLeft = 0;

		if( $("div").is( this.e) ) {
			this.MaxLeft = $(this.e).siblings().width() - $(this.e).width() * 0.38;
		}
	}

	slider.prototype = {
		init:function() {
			this.Getcapt()
			var $this = this;
			// 点击按下
			$(this.e).on("mousedown",function(event) {
				var e = event || window.event;
				$this.StartLeft = e.clientX - this.offsetLeft;
				if( !this.isok ) this.isok = true;
			}).on("mousemove", function(event) {	// 拖动鼠标
				if( this.isok ) $this.Move( event);
			}).on("mouseup", function(event) { // 松开鼠标
				$this.Postcapt( event);
				if( this.isok ) this.isok = false;
			}).on("mouseout", function() {
				if( this.isok ) this.isok = false;
			}).on("touchstart", function(event) { // 移动端，触摸屏幕时触发
				console.log( "touchstart")
			}).on("touchmove",function(event) {	// 屏幕上移动
				console.log( "touchmove")
			}).on("touchend", function(event) {	//离开屏幕时
				console.log( "touchend")
			})
		},

		Move:function( e) {
			if( e.clientX - this.StartLeft > -1 && e.clientX - this.StartLeft < this.MaxLeft) {
				let l = e.clientX - this.StartLeft
				$(this.e).css({ "left": l})
				$(".tc-jpp>img").css( { "left": l})
			}
		},
		Getcapt:function() {
			$.get("http://admin.mmiao.com/captcha", function( e) {
				$(".tc-jpp>img").css({"top":e.oy, "left":0})
				r = Math.random();
				$(".captcha-img>img").attr("src", "/public/img/captcha.jpg?"+ r)
				$(".tc-jpp>img").attr("src", "/public/img/hycdn.png?" + r)
			})
		},
		Postcapt:function(e) {
			/*$.post("/captcha",function(e) {
				// true
				// false
			})*/

			if( e.clientY) {

				if( false ) {
					$(".tc-jpp>img").addClass("lake-jpp-img")
					$("p.errno").css("opacity", 1);
					setTimeout(function(){$(".tc-jpp>img").removeClass("lake-jpp-img");$("p.errno").css("opacity", 0)},600);
					this.Getcapt()
				} else {
					// $(".captcha-img").append("<div class='success'>验证成功！！！</div>")
				}
				

				/*if( e.clientX - this.StartLeft ) {
					console.log( 11)
				} else {
					$(".bt-slider").css( "left",0)
					this.Getcapt()
				}*/
			}

		}
	}
	window.slider = slider;
})(jQuery)


