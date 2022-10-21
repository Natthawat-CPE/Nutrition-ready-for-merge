package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Natthawat-CPE/Nutrition-System/entity"
)

// GET/doctor
//List all Doctor
func ListDoctor (c * gin.Context){
	var doctor []entity.Doctor
	if err := entity.DB().Raw("SELECT * FROM doctor").Find(&doctor).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error:":err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":doctor})
}

// GET/doctor/:id
//Get doctor by id
func GetDoctor (c * gin.Context){
	var doctor entity.Doctor
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&doctor); tx.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error":"Doctor not found"})
		return 
	}

	c.JSON(http.StatusOK, gin.H{"data":doctor})
	
}
