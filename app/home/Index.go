package home

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index( c *gin.Context)  {
	c.HTML( http.StatusOK, "index/m_index_s.html", gin.H{
		"m_sitename":"喵喵漫画",
	})
}