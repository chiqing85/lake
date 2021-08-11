package lake

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"log"
	"os"
)

func Mysqli() *gorm.DB {
	dsn := os.Getenv("DBNAME") + ":" + os.Getenv("DBPASS") + "@tcp(" + os.Getenv("DBHOST") +
		":" + os.Getenv("DBPORT") + ")/" + os.Getenv("DBDATABASE") + "?charset=" + os.Getenv("DBCHARSET") +
		"&parseTime=True&loc=Local"
	if db, err := gorm.Open( mysql.Open( dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix: os.Getenv("DBPREFIX"),
			SingularTable: true,
		},
	}); err != nil {
		log.Fatal("数据库连接失败……")
		return nil
	} else {
		return db
	}
}