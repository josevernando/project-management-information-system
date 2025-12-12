package routes

import (
	"pmis-backend/controllers"
	"pmis-backend/middleware"
	"pmis-backend/ai"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	auth := router.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
		auth.POST("/logout", controllers.Logout)
	}


	api := router.Group("/api")
	api.Use(middleware.Auth())
	{
		DashboardRoutes(api)

		api.GET("/projects", controllers.GetProjects)
		api.POST("/projects", controllers.CreateProject)
		api.PUT("/projects/:id/status", controllers.UpdateProjectStatus)

		api.GET("/tasks", controllers.GetTasks)
		api.POST("/tasks", controllers.CreateTask)
		api.PUT("/tasks/:id/status", controllers.UpdateTaskStatus)

		api.GET("/activities", controllers.GetActivities)
		api.POST("/activities", controllers.CreateActivity)

		api.GET("/employees", controllers.GetEmployees)

		api.GET("/profile", controllers.GetCurrentEmployee)

		api.GET("/summary", controllers.GetSummary)

		api.POST("/ai/summary-docx", ai.GenerateSummaryDocxHandler)
	}
}
