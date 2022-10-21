package main

import (
	"github.com/Natthawat-CPE/Nutrition-System/controller"
	"github.com/Natthawat-CPE/Nutrition-System/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8888"

func main(){
	entity.SetupDatabase()
	
	r := gin.Default()
	r.Use(CORSMiddleware())

	//Doctor Router
	r.GET("/doctors",controller.ListDoctors)
	r.GET("/doctor/:id", controller.GetDoctor)

	//Nutrition Router
	r.GET("/nutritions", controller.ListNutritions)
	r.GET("/nutrition/:id", controller.GetNutrition)

	//Map-Bed Router
	r.GET("/map_beds", controller.ListMap_Beds)
	r.GET("/map_bed/:id", controller.GetMap_bed)

	//Manage Router
	r.POST("/manage", controller.CreateManage)
	r.GET("/manages", controller.ListManage)

	r.Run("localhost: " + PORT)

	
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}