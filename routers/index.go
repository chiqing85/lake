package routers

import (
	"example.com/m/v2/app/home"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index() *gin.Engine {
	r := gin.Default()
	r.Use(Cors())//默认跨域

	r.GET("/", home.Index)
	r.GET("/comic/:id", home.Comic)
	r.GET("/comic/:id/:pid", home.Reader)

	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK,"index/login.html", gin.H{})
	})
	r.GET("/chptcha", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index/chptcha.html",gin.H{})
	})


	return r
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Set("content-type", "application/json")
		}
		if method == "OPTIONS" {	//放行所有OPTIONS方法
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}