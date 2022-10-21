package controller

import (
	"net/http"

	"github.com/Natthawat-CPE/Nutrition-System/entity"
	"github.com/gin-gonic/gin"
)

// GET /nutritions
func ListNutritions (c *gin.Context){
	var nutritions []entity.Nutrition
	if err := entity.DB().Raw("SELECT * FROM nutritions").Scan(&nutritions).Error; err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":nutritions})
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