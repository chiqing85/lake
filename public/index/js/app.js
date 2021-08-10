// 共同函数
(function() {
	$.fn.init(function() {
		// 判断模式
		if( $.cookie("moon") ) {
			$("body").addClass("moon")
		}
		// 加载完成后执行
		$(window).on("load", function(){
			// 图像延迟加载
			$("img.lazyload").lazyload();
			// 调用统计代码->登录->关闭-> 验证
			$(this).tongji()
			.login()
			.LoginClose()
			.captcha();
		});
	});
	// 加载登录框
	function loadlogin() {
		$.get("/login", function(n , s) {
			$("body").append(n)
			if( s == "success") { 
				setTimeout(function() {
					$(".login-wrap").addClass("active");
				}, 50)
			}
		})
	};

	$.fn.extend({
		// 统计
		"tongji":function() {
			console.log( "tongji")
			return this;
		},
		// 点击 -> 登录
		"login":function() {
			$(".header_login_btn").on("click", loadlogin)
			return this;
		},
			// 关闭登录框
		"LoginClose":function() {
			$(document).on("click", "i.login-close", function() {
				$(".login-wrap, .layer-shade").remove()});
			return this;
		},
		// 加载验证模块
		"captcha":function() {
			$(document).on("click",".tcaptcha-icon", function() {
				// 加载验证块
				$(this).Captcha();
			})
			return this;
		}
	});

})(jQuery)






$(window).on("load", function(){
   var p=0,t=0;
   $(window).scroll(function(e){
      p = $(this).scrollTop();
      if(t< p){
      	//向下滚
      	if( p > 70) {
      		if( $("body").is(".moon") == true ) {
      			$("header").css({"background":"rgb(29, 31, 32, "+ (p/90) +")",
	      		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
	      		});
      		} else {
      			$("header").css({"background":"rgb(255, 255, 255, "+ (p/90) +")",
	      		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
	      		});
      		}
      		
      	 	$(".header .header-search").show();
      	 	$( ".header .header-search").css("opacity",p/170)
      	}
      	/*if (p > 99) $(".full-class").css({"position":"fixed","top":"60px","background":"#fff",
      		"z-index": "11", "width":"100%","box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"});*/
      }else{

      	//向上滚
  		if( p < 50) {
	  		$("header, .header .header-search").removeAttr("style");
	  		$(".header .header-search").fadeOut();
  		}
  		if( p < 100 ) $(".full-class").removeAttr("style");
      }
      setTimeout(function(){t = p;},1000);
   });
   $("li.hover").hover(
		function() {
			if( false ) {
				$(".hover-list>.block:first").css({"display":"block","position":"fixed"})
			} else {
				
				$(".hover-list>.block:last").css({"display":"block","position":"fixed"})
			}

		},function() {
			console.log(222)
		}
	)
	$(".c6 .box-item").hover(function(e) {
		$(this).children(".tip-wrap").addClass("active")
	},function() {
		$(".c6 .tip-wrap").removeClass("active")
	})
	up();

	$("#moon").on("click",function() {
		if( $.cookie("moon") ) {
			// 改变css
			$.delcookie("moon")
			$("body").removeClass("moon")
			if( $(window).scrollTop() > 70 ) { 
				$("header").css({"background":"rgb(255, 255, 255)",
	      		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
	      		});
			}
		} else {
			$("body").addClass("moon")
			if( $(window).scrollTop() > 70 ) { 
				$("header").css({"background":"rgb(29, 31, 32)",
	      		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
	      		});
			}
			// 添加 cookie
			$.setcookie("moon", 0, {e:30, p:"/"})
		}
	})

	$(".reader-header, .read_tool_bottom").hover(function() {
		$("body").addClass("toolbar")
	},function() {
		$("body").removeClass("toolbar")
	})

	$(".comic-new .item").hover(function() {
		$(this).siblings(".item").removeClass("active")
		$(this).addClass("active")
	})


	if( $("body").is("#reader")) {
		$.reader()
	}
});

function up() {
	var t = $(window).scrollTop();
	if( $(window).scrollTop() > 70 ) {
		if( $("body").is(".moon") == true ) {
			$("header").css({"background":"rgb(29, 31, 32, "+ (t/90) +")",
   		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
   		});
		} else {
			$("header").css({"background":"rgb(255, 255, 255, "+ (t/90) +")",
   		"box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"
   		});
		}

	 	$(".header .header-search").show();
	 	$( ".header .header-search").css("opacity",t/170)
	}
	/*if (t > 99) $(".full-class").css( {"position":"fixed","top":"60px","background":"#fff",
      		"z-index": "11", "width":"100%","box-shadow":"rgb(0 0 0 / 10%) 0 2px 4px 0"}
      		);*/
}




