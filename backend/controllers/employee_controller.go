package controllers

import (
    "net/http"
    "pmis-backend/config"
    "pmis-backend/models"
    "github.com/gin-gonic/gin"
)

func GetEmployees(c *gin.Context) {
    var employees []models.Employee
    result := config.DB.Find(&employees)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, employees)
}
