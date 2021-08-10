package routers

import (
	"example.com/m/v2/app/admin"
	"github.com/gin-gonic/gin"
)

func Admin() *gin.Engine {
	r := gin.Default()
	// 后台
	r.GET("/", admin.Index)
	r.GET("/login", admin.Login)
	r.POST("/login", admin.Login)
	r.GET("/setting", admin.Setting)
	return r
}