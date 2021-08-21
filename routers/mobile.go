package routers

import (
	"example.com/m/v2/app/mobile"
	"github.com/gin-gonic/gin"
)

func Mobile() *gin.Engine {
	r := gin.Default()
	r.GET("/", mobile.Index)

	return r
}
