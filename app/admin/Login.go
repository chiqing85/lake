package admin

import (
	"example.com/m/v2/mode"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login(c *gin.Context)  {
	req := c.Request
	if req.Method == "GET" {
		c.HTML(http.StatusOK, "admin/login.html",gin.H{
			"webname":"喵喵漫画",
		})
	} else if req.Method == "POST"{
		uname := c.PostForm("uname")
		pword := c.PostForm("pword")
		if u, bool := mode.Login(uname); bool {
			if u.Password == pword {
				c.JSON(http.StatusOK, gin.H{
					"msg":"登录成功…",
				})
			}
			c.JSON( http.StatusNotFound, gin.H{
				"msg":"密码错误…",
			})
		} else {
			c.JSON(http.StatusNotFound,gin.H{
				"msg": "帐户不存在…",
			})
		}
	}
}