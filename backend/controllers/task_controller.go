package controllers

import (
	"net/http"
	"pmis-backend/config"
	"pmis-backend/models"

	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	var tasks []models.Task
	config.DB.Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var task models.Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	config.DB.Create(&task)
	c.JSON(http.StatusOK, task)
}

type UpdateTaskStatusInput struct {
    Status string `json:"status" binding:"required"`
}

func UpdateTaskStatus(c *gin.Context) {
    id := c.Param("id")

    var input UpdateTaskStatusInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var task models.Task
    if err := config.DB.First(&task, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }

    task.Status = input.Status
    config.DB.Save(&task)

    c.JSON(http.StatusOK, gin.H{
        "message": "Status updated successfully",
        "task":    task,
    })
}
