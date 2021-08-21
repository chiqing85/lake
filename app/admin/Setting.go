package admin

import (
	"example.com/m/v2/mode"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Setting(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H {
		"system":mode.Getsystem(),
	})
}
