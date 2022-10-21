package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Doctor{},
		&Nutrition{},
		&Map_Bed{},
		&Manage{},
	)

	db = database

	// ทดลอง ใส่ข้อมูลแบบ Hard  code ในส่วนนี้จะถูกลบทั้งหมด

	//Entity: User => ได้มาจากตาราง Login ความจริงแล้วควรมีแค่ 1 Row เพราะตาราง login จะส่งมาแต่ข้อมูลผู้ login เข้ามา
	db. Model(&Doctor{}).Create(&Doctor{
		Name: "Natthawat Salangsing",
	})
	
	db.Model(&Doctor{}).Create(&Doctor{
		Name: "Test-Doctor",
	})

	//Entity: Nutrition
	Empty := Nutrition{
		Type: "กำหนดเอง",
		Receive:  0,
		Detail: "มีการจัดโภชนาการตามแพทย์เห็นสมควร",
	}
	db.Model(&Nutrition{}).Create(&Empty)

	Soft := Nutrition{
		Type: "อาหารอ่อน, นิ่ม",
		Receive: 2000,
		Detail: "ข้าวต้ม, นม, มะม่าง",
	}
	db.Model(&Nutrition{}).Create(Soft)

	Normal := Nutrition{
		Type: "อาหารที่มีการเคี๊ยวหน่อย",
		Receive: 2200,
		Detail: "ไข่ต้ม, แตงกวา, ข้าวผัด, นม, มะม่วง",
	}
	db.Model(&Nutrition{}).Create(&Normal)

	//Entity: Map_Bed : อยากได้แค่ชื่อของคนไข้
	db.Model(&Map_Bed{}).Create(&Map_Bed{
		Name: "นางสมหญิง ดีเด่น",
	})
	db.Model(&Map_Bed{}).Create(&Map_Bed{
		Name: "นายสมชาย ดีเด่น",
	})
	db.Model(&Map_Bed{}).Create(&Map_Bed{
		Name: "เด็กชายสมหวัง จรืงจริง",
	})




}