package controllers

import (
        "net/http"
        "pmis-backend/config"
        "pmis-backend/models"
        "time"

        "github.com/gin-gonic/gin"
)

func GetSummary(c *gin.Context) {
        var totalTasks int64
        var totalProjects int64
        var activitiesToday int64

        config.DB.Model(&models.Task{}).Count(&totalTasks)
        config.DB.Model(&models.Project{}).Count(&totalProjects)
        config.DB.Model(&models.Activity{}).
                Where("DATE(created_at) = ?", time.Now().Format("2006-01-02")).
                Count(&activitiesToday)

        c.JSON(http.StatusOK, gin.H{
                "total_tasks":      totalTasks,
                "total_projects":   totalProjects,
                "activities_today": activitiesToday,
        })
}
