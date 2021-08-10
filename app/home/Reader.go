package home

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Reader(c *gin.Context)  {

	c.HTML( http.StatusOK, "index/reader.html", gin.H{
	})
}