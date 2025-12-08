package controllers

import (
	"net/http"
	"time"

	"pmis-backend/config"
	"pmis-backend/models"

	"github.com/gin-gonic/gin"
)

func GetProjects(c *gin.Context) {
	var projects []models.Project
	if err := config.DB.Order("created_at desc").Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func CreateProject(c *gin.Context) {
	var payload models.Project
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// set default values
	if payload.Status == "" {
		payload.Status = "active"
	}
	payload.CreatedAt = time.Now()

	if err := config.DB.Create(&payload).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, payload)
}
