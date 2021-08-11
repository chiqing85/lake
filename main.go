package main

import (
	_ "example.com/m/v2/lake"
	"example.com/m/v2/routers"
	"github.com/gin-gonic/gin"
)

func  static(c *gin.Engine) *gin.Engine {
	c.Static("/public", "./public")
	c.LoadHTMLGlob("views/**/*")
	return c
}
func init()  {
	// lake.Mysqli()
}
func main() {
	// 前端
	 i := static( routers.Index() )
	// 后台
	 a := static( routers.Admin())
	// 移动
	 m := static( routers.Mobile())

	go i.Run(":8080")
	go a.Run(":8081")
	go m.Run(":8082")
	select {}
}