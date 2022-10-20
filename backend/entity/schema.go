package entity

import (
	"time"

	"gorm.io/gorm"
)

type Doctor struct {
	gorm.Model
	Name	string
	User_name string
	User_password string

	Manages  []Manage `gorm:"foreignKey:DoctorID"`
}

type Nutrition struct{
	gorm.Model
	Type	string
	Receive *uint
	Detail	string

	Manages []Manage `gorm:"foreignKey:NutritionID"`
}

type Map_Bed struct{ // จำลองตารางเพื่อน
	gorm.Model
	Name	string

	Manages []Manage `gorm:"foreignKey:Map_BedID"`
}

type Manage struct{
	gorm.Model
	Comment string
	Date	time.Time
	
	DoctorID *uint
	Doctor Doctor

	NutritionID *uint
	Nutrition	Nutrition

	Map_BedID *uint
	Map_Bed	Map_Bed

}