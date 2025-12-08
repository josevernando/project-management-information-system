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
	var activity models.Activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&activity)
	c.JSON(http.StatusOK, activity)
}

