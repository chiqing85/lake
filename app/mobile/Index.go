package mobile

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func Index(c *gin.Context) {
	host := os.Getenv("DBHOST")

	c.HTML(http.StatusOK,"index.html",gin.H{
		"host": host,
	})
}