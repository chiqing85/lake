package mode

import "example.com/m/v2/lake"

type SystemConfigs struct {
	Cid int `gorm:"AUTO_INCREMENT unsigned type:int(11)"`
	Modename string `gorm:"type:varchar(50)"`
	Cname string `gorm:"type:varchar(50)"`
	Ctitle string
	Cvalue string
	Cdescription string
	Cdefine bool
	Ctype int
	Catorder int
	Catnaem string
}
func Getsystem() []SystemConfigs {
	db := lake.Mysqli()
	sqlDB, _ := db.DB()
	defer sqlDB.Close()
	var system []SystemConfigs
	db.Where( "cdefine = 1 and modename = 'system'").Order("catorder").Find( &system)
	return system
}