package home

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Comic(c *gin.Context)  {
	id := c.Param("id")
	c.HTML( http.StatusOK, "index/info.html", gin.H{
		"c_title":"武炼巅峰",
		"id":id,
	})
}
