package mode

import (
	"example.com/m/v2/lake"
)

type ComicUser struct {
	Id int
	Uname string
	Pass string
}
func Login(uname string) (*ComicUser, bool) {
	db := lake.Mysqli()
	sqlDB, _ := db.DB()
	defer sqlDB.Close()
	var user ComicUser
	db.Where("Uname = ?", uname).Take( &user)
	if user.Id != 0 {
		return &user, true
	} else {
		return nil, false
	}
}