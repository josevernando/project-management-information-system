package routes

import (
	"net/http"
	"pmis-backend/config"
	"pmis-backend/models"

	"github.com/gin-gonic/gin"
)

func DashboardRoutes(r *gin.RouterGroup) {
	r.GET("/dashboard", func(c *gin.Context) {
		var totalProjects int64
		var totalEmployees int64
		var todoTasks int64
		var progressTasks int64
		var doneTasks int64
		var recentActivities []models.Activity

		// Count metrics
		config.DB.Model(&models.Project{}).Count(&totalProjects)
		config.DB.Model(&models.Employee{}).Count(&totalEmployees)
		config.DB.Model(&models.Task{}).Where("status = ?", "To Do").Count(&todoTasks)
		config.DB.Model(&models.Task{}).Where("status = ?", "In Progress").Count(&progressTasks)
		config.DB.Model(&models.Task{}).Where("status = ?", "Done").Count(&doneTasks)

		// Fetch last 5 activities
		config.DB.Order("created_at desc").Limit(5).Find(&recentActivities)

		c.JSON(http.StatusOK, gin.H{
			"totalProjects": totalProjects,
			"totalEmployees": totalEmployees,
			"tasks": gin.H{
				"todo":       todoTasks,
				"in_progress": progressTasks,
				"done":        doneTasks,
			},
			"recentActivities": recentActivities,
		})
	})
}
