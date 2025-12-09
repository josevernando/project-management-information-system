package controllers

import (
	"net/http"
	"pmis-backend/config"
	"pmis-backend/models"

	"github.com/gin-gonic/gin"
)

func GetActivities(c *gin.Context) {
	var activities []models.Activity
	config.DB.Find(&activities)
	c.JSON(http.StatusOK, activities)
}

func CreateActivity(c *gin.Context) {
    userID := c.GetUint("user_id")

    var activity models.Activity
    if err := c.ShouldBindJSON(&activity); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    activity.EmployeeID = userID

    if err := config.DB.Create(&activity).Error; err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(200, activity)
}
