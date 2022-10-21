package controller

import (
	"net/http"

	"github.com/Natthawat-CPE/Nutrition-System/entity"
	"github.com/gin-gonic/gin"
)

// GET/ map_beds
func ListMap_Beds (c * gin.Context){
	var map_beds []entity.Map_Bed
	if err := entity.DB().Raw("SELECT * FROM map_beds").Scan(&map_beds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data":map_beds})
}

// GET/ map_bed/:id
func GetMap_bed (c *gin.Context){
	var map_bed []entity.Map_Bed
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&map_bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"map_bed not found"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data":map_bed})
}