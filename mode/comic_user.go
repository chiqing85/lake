package mode

import (
	"example.com/m/v2/lake"
)

type ComicUser struct {
	Id int
	Uname string
	Password string
}
func Login(uname string) (*ComicUser, bool) {
	var user ComicUser
	lake.DB.Where("Uname = ?", uname).Take( &user)
	if user.Id != 0 {
		return &user, true
	} else {
		return nil, false
	}
}