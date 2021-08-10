package lake

import (
	"github.com/gin-gonic/gin"
	"io"
	"os"
)
func init()  {

	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f)
}
