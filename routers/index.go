package routers

import (
	"example.com/m/v2/app/home"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index() *gin.Engine {
	r := gin.Default()
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