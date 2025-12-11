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

type UpdateProjectStatusInput struct {
    Status string `json:"status" binding:"required"`
}

func UpdateProjectStatus(c *gin.Context) {
    id := c.Param("id")

    var input UpdateProjectStatusInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var project models.Project
    if err := config.DB.First(&project, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
        return
    }

    project.Status = input.Status
    config.DB.Save(&project)

    c.JSON(http.StatusOK, gin.H{
        "message": "Status updated successfully",
        "project": project,
    })
}
