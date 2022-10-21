package controller

import (
	"net/http"

	"github.com/Natthawat-CPE/Nutrition-System/entity"
	"github.com/gin-gonic/gin"
)

// GET /nutritions
func ListNutritions (c *gin.Context){
	var nutrition []entity.Nutrition
	if err := entity.DB().Raw("SELECT * FROM nutrition").Scan(&nutrition).Error; err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":nutrition})
}

// GET /nutrition/:id
func GetNutrition (c *gin.Context){
	var nutrition []entity.Nutrition
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&nutrition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"Nutrition not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":nutrition})

}