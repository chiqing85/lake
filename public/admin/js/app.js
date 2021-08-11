// 路由
class route {
	constructor(e, r, p) {
		this.routes = r;
		this.e = e;
		this.templateCache = new templateCache( p)
	}
	init() {
		window.addEventListener('load', this.refresh(), false);
		window.addEventListener('hashchange', this.refresh.bind(this), false);
	}
	refresh() {
		let hash = location.hash.slice(1) || '/';
		let tmlp = this.routes[hash];
		if( tmlp == undefined ) tmlp = this.exeu( hash);
		
		this.templateCache.put( tmlp ).then( v => {
			$(this.e).html(v)
			// 中间件
			var f = hash.substring(1);
			try {
				if( $.isFunction( window.$[f] )) {
					window.$[f]()
				}
			} catch (e) {}
			return false
		});
	}

	exeu(hash) {
		var reg = /^[0-9]+$/;
		var tmlp;
		let h = hash.substr(1, hash.length).split("/")
		if( h.length >= 2  ) {
			h.map( (s, i) => {
				if( reg.test( s )) {
					var keys = Object.keys( this.routes )
					var _this = this;
					keys.map( function(k) {
						if( k.indexOf( h[0]) != -1 ) {
							tmlp = _this.routes [ k];
    						var i = k.lastIndexOf(":");
    						k = k.substring( i+1, k.length );
    						$.param( {k, s});
    						return false;
						}
					})
					return false;
				}
			})
			if( tmlp != undefined ) return tmlp;
		}
	}
}
// 加载模板
class template {
	constructor(e, t, p) {
		this.e = e;
		this.p = p;
		Array.isArray(t) ? t.forEach( t => { this.t = t; this.init()}): this.t = t;
	}
	init(){
		new templateCache( this.p).put( this.t ).then( v => {
			$(this.e).html(v)
		});
	}
}
// 缓存模板
class templateCache {
	constructor( p) {
		this.template = {};
		this.path = p;
	}
	async put( t) {
		var $this = this;
		if( $.data( $this.template, t) ) {
			return $.data( $this.template, t)
		} else {
			if( t != undefined ) {
				await $.get( $this.path + t )
					.then( res => {
						$.data($this.template, t, res ); 
					})
				return $.data( $this.template, t);
			} else {
				return "路由加载错误…"
			}
		}
	}
}
// 数据绑定
class app {

}


// 加载菜单
class menu {
	// 加载
	async add( m) {
		return await import( m )
	}
}
// 编辑 - 保存 - 删除 - 取消
class edit {
	constructor( t ) {
		this.t = t;
	}
	init() {
		let $this = this;
		$(document).on("click", this.t, function() {
			if( $(this).is(".edit-link")) {
				$this.edit( $(this) );
			} else if( $(this).is(".delete")) {
				$this.delete( $(this) );
			} else if( $(this).is( ".ins")) {
				$this.ins( $(this) );
			} else if( $(this).is(".save") ) {
				$this.save();
			};
		})
	}
	// 编辑
	edit( t ) {
		var tr = t.closest('tr');
		var html = '';
		tr.find('td').each( function(i) {
			if( i == tr.find('td').length -1  ) {
				html += '<td> <a href="javascript:;" class="button success small save"> <span> 保存</span> </a> <a href="javascript:;" class="button info small ins"> <span> 取消</span> </a> </td>'
			} else if( $(this).attr("class") == "radio" || $(this).attr("class") == "id") {
				html += `<td class="${$(this).attr("class")}">${$(this).html()}</td>`
			} else {
				let v = $(this).text();
				let s = $(this).attr("class");
				html += `<td class="${s}"><div class="form-group input-wrap"><input type="text" name="${s}" value="${v}"/></div></td>`;
			}
		})
		tr.html( html )
	}
	// 删除
	delete() {
		console.log( "删除" )
	}
	// 保存
	save() {
		console.log( "保存" )
	}
	// 取消
	ins( t) {
		var tr = t.closest('tr');
		var h = '';
		tr.find("td").each( function( i ) {
			if( i == tr.find("td").length -1 ) {
				h += '<td> <a href="javascript:;" class="button highlight small edit-link"> <span> 编辑</span> </a> <a href="javascript:;" class="button danger small delete"> <span> 删除</span> </a> </td>'
			} else if( $(this).attr("class") == "radio" || $(this).attr("class") == "id") {
				h += `<td class="${$(this).attr("class")}">${$(this).html()}</td>`
			} else {
				let v = $(this).find("input").val();
				let s = $(this).attr("class")
				h += `<td class="${s}">${v}</td>`
			}
		})
		tr.html( h )
	}
}

!(function() {
	$.param = function ( option ) {
		if( option != undefined && typeof( option ) == "object") {
			if( typeof params !== undefined)  window.params = [];
			params.push( option)
		} else {
			let p = params.map( s => {
				if( s["k"] == option ) {
					return s["s"];
				}
			})
			return p[0];
		}
	}
})(jQuery)