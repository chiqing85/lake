(function() {
	$.fn.init(function() {
		$(window).on("load", async function(){
			let model = await import( "./config.js ")
			// 默认加载模板
			new template( "header", "/header.html", model.path).init();
			new template( "view.sidebar", "/left.html", model.path).init()
			// 添加路由文件
			// 前端视图路径
			new route( "view.container", model.routes,  model.path).init();
			// 统计
			$(this)
			.tongji()
			.menu()
			.checkbox()
			.update()
			.history()
			.isload()
		});
		$(document).ready(function() {
			$(this).token();
		})
	})

	$.fn.extend( {
		// 统计
		"tongji":function() {
			console.log( "tongji")
			return this;
		},
		// 左侧菜单
		"menu":function(){
			$(document).on("click", ".menu_item", function () {
				$(".menu>ul>li").removeClass("active")
				$(this).parent().addClass("active")
			})
			return this;
		},
		// 后退
		"history":function() {
			$(document).on("click", "a.history" ,() => {
				history.go(-1)
			})
			return this;
		},
		// input file 点击触发
		"update":function() {
			$(document).on( "click", "#upload", ()=> {
				return $(".dz-hidden-input").click()
			})
			return this;
		},
		// meu 切换
		"checkbox":function() {
			$(document).on("click", ".checkbox-switch", function( e) {
				var i = $(this).parent("label").find("input");
				i.prop("checked") ? $(this).removeClass("switch-open") : $(this).addClass("switch-open");
				i.attr("checked", !i.prop("checked") )
			})
			return this;
		},
		// 验证是否登录
		"token":function() {
			// 判断是否存在 token

			if( !true )  self.location = "/admin/login";
			return this;
		},
		"isload":function() {
			$("img.load").remove();
			$("body").removeClass("load");
			$("header,main,footer").css("visibility","visible");
			return this;
		},
	})

	$.setting = function() {
		$.post("/setting", e => {
			console.log( e.system)
		})
	}
	$.link = function() {
		console.log( "link" )
	}
})(jQuery)
