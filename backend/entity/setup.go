package entity

import (
	"time"

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

	//สร้างตัวแปรที่อ้างถึง data ได้
	var natthawat Doctor
	var test Doctor
	db.Raw("SELECT * FROM doctors WHERE name = ?", "Natthawat Salangsing").Scan(&natthawat)
	db.Raw("SELECT * FROM doctors WHERE name = ?", "Test-Doctor").Scan(&test)

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
	db.Model(&Nutrition{}).Create(&Soft)

	Normal := Nutrition{
		Type: "อาหารที่มีการเคี๊ยวหน่อย",
		Receive: 2200,
		Detail: "ไข่ต้ม, แตงกวา, ข้าวผัด, นม, มะม่วง",
	}
	db.Model(&Nutrition{}).Create(&Normal)

	//Entity: Map_Bed : อยากได้แค่ชื่อของคนไข้

	n1 := Map_Bed{
		Name: "นางสมหญิง ดีเด่น",
	}
	db.Model(&Map_Bed{}).Create(&n1)
	n2 := Map_Bed{
		Name: "นายสมชาย ดีเด่น",
	}
	db.Model(&Map_Bed{}).Create(&n2)
	n3 := Map_Bed{
		Name: "เด็กชายสมหวัง จรืงจริง",
	}
	db.Model(&Map_Bed{}).Create(&n3)

	//Entity: Manage : ทดลองสร้างข้อมูล
	db.Model(&Manage{}).Create(&Manage{
		Doctor: natthawat,
		Nutrition: Soft,
		Map_Bed: n1,
		Date: time.Now(),
		Comment: "",
	})
	db.Model(&Manage{}).Create(&Manage{
		Doctor: natthawat,
		Nutrition: Empty,
		Map_Bed: n2,
		Date: time.Now(),
		Comment: "",

	})
	db.Model(&Manage{}).Create(&Manage{
		Doctor: natthawat,
		Nutrition: Normal,
		Map_Bed: n3,
		Date: time.Now(),
		Comment: "",
	})





}