package main

import (
	"pmis-backend/config"
	"pmis-backend/models"
	"pmis-backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	// Table Migration
	config.DB.AutoMigrate(
		&models.Project{},
		&models.Task{},
		&models.Activity{},
		&models.Employee{},
	)

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
        })

	routes.SetupRoutes(r)

	r.Run(":8080")
}
