package entity

import (
	"time"

	"gorm.io/gorm"
)

type Doctor struct { // ที่คิดไว้ตารางนี้จะโดนตัดแล้วแทนที่ด้วย DB ของ System: login
	gorm.Model
	Name	string `gorm:"uniqueIndex"` 
	// User_name string
	// User_password string

	Manages  []Manage `gorm:"foreignKey:DoctorID"`
	
}

type Nutrition struct{
	gorm.Model
	Type	string 
	Receive int
	Detail	string

	Manages []Manage `gorm:"foreignKey:NutritionID"`
}

type Map_Bed struct{ // จำลองตาราง ARM
	gorm.Model
	Name	string

	Manages []Manage `gorm:"foreignKey:Map_BedID"`
}

type Manage struct{
	gorm.Model
	
	DoctorID 	*uint
	Doctor Doctor	`gorm:"references:id"`
	// Doctor Doctor `gorm:"references:id"`
	
	NutritionID 	*uint
	Nutrition	Nutrition `gorm:"references:id"`
	
	Map_BedID 	*uint
	Map_Bed	Map_Bed `gorm:"references:id"`
	
	Date	time.Time
	Comment string

}