package controller

import (
	"net/http"
	"time"

	"github.com/Natthawat-CPE/Nutrition-System/entity"
	"github.com/gin-gonic/gin"
)

// POST/ manage
func CreateManage (c *gin.Context){
	var manage entity.Manage //สังเกตว่า ไม่มี [] เพราะอะไรไปหาคำตอบมา => []index ไม่มีก็แปลว่าไม่ใช่ index
	var doctor entity.Doctor
	var nutrition entity.Nutrition
	var map_bed entity.Map_Bed

	// bind into manage
	if err := c.ShouldBindJSON(&manage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	// ค้นหา doctor ด้วย id เวลาทำจริงตรงนี้ต้องคิดใหม่เพราะว่า Doctor ระบบเราไม่ต้องค้น
	if tx := entity.DB().Where("id = ?", manage.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"doctor not found"})
		return
	}
	// ค้นหา nutrition ด้วย id
	if tx := entity.DB().Where("id = ?", manage.NutritionID).First(&nutrition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"nutrition not found"})
		return
	}
	// ค้นหา map_bed ด้วย id
	if tx := entity.DB().Where("id = ?", manage.Map_BedID).First(&map_bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"map_bed not found"})
		return
	}

	//สร้าง Manage
	m := entity.Manage{
		Doctor: doctor,
		Nutrition: nutrition,
		Map_Bed: map_bed,
		Date: time.Now(),
		Comment: "", //ไปหาวิธีใส่ Comment มาด้วย
	}

	//บันทึก
	if err := entity.DB().Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":manage})
}

// GET/ manages
func ListManage (c *gin.Context){
	var manages []entity.Manage 
	
	if err := entity.DB().Raw("SELECT * FROM manages").Find(&manages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":manages})
	
}