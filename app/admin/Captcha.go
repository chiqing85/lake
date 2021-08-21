package admin

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"
)

func Captcha(c *gin.Context) {
	rand.Seed(time.Now().UnixNano())
	fs := rands(10)
	st := rands( 12)
	// 背景
	img_file, _ := os.Open("./public/img/f"+ fs + ".jpg")
	defer img_file.Close()
	img, _ := jpeg.Decode(img_file)

	// img := imgf.(*image.YCbCr).SubImage(image.Rect(-20, -50, 285, 175)).(*image.YCbCr) //图片裁剪x0 y0 x1 y1

	//水印
	wmb_file, _ := os.Open("./public/img/b" + st + ".png")
	defer wmb_file.Close()
	wmb_img, _ := png.Decode(wmb_file)
	// 位置

	b := image.Rect(0, 0, 285, 125)
	m := image.NewRGBA( b )
	fx := - rand.Intn( img.Bounds().Dx() - m.Bounds().Dx()  ) + 1
	fy := - rand.Intn( img.Bounds().Dy() - m.Bounds().Dy()  ) + 1
	cr := Bounds(fx, fy, img.Bounds().Size())
	draw.Draw(m, cr, img, image.ZP, draw.Src)
	// rand.Intn(in ) + 1
	ox := rand.Intn( m.Bounds().Dx() - 60  ) + 1
	oy := rand.Intn( m.Bounds().Dy() - 60  ) + 1
	offset := image.Pt( ox, oy)
	draw.Draw(m, wmb_img.Bounds().Add( offset), wmb_img, wmb_img.Bounds().Min, draw.Over)

	//生成新图片new.jpg,并设置图片质量
	imgw, _ := os.Create("./public/img/captcha.jpg")
	jpeg.Encode(imgw, m, &jpeg.Options{80})

	img_c, _ := os.Open("./public/img/c"+ st + ".png")
	defer wmb_file.Close()
	wmb_c, _ := png.Decode(img_c)

	s := image.Rect(0, 0, 60, 60)
	//根据b画布的大小新建一个新图像
	hs := image.NewRGBA( s)
	r := Bounds(-ox + fx, -oy + fy, m.Bounds().Size())

	draw.Draw(hs, r, img , wmb_c.Bounds().Min,draw.Over)
	h := image.NewRGBA( s )
	draw.DrawMask(h, Bounds(0, 0, hs.Bounds().Size() ), hs,image.ZP, wmb_c, wmb_c.Bounds().Min, draw.Over)
	hycdn, _ := os.Create("./public/img/hycdn.png")

	png.Encode(hycdn, h)

	defer imgw.Close()
	defer hycdn.Close()

	fmt.Println("添加水印图片结束请查看")
	c.JSON(http.StatusOK,gin.H{
		"oy":oy + 5,
	})
}

func Bounds(x int, y int, size image.Point) image.Rectangle {
	d := image.Point{x, y}
	r := image.Rectangle{d, d.Add( size )}
	return r
}

func rands( in int) string {
	rand.Seed(time.Now().UnixNano())
	i := rand.Intn(in ) + 1
	st := ""
	if i < 10 {
		st = "0" + strconv.Itoa( i)
	} else {
		st = strconv.Itoa( i )
	}
	return st
}
