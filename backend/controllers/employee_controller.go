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

func GetCurrentEmployee(c *gin.Context) {
    userID, exists := c.Get("user_id")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in token"})
        return
    }

    var employee models.Employee
    if err := config.DB.First(&employee, userID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "id": employee.ID,
        "name": employee.Name,
        "email": employee.Email,
        "position": employee.Position,
        "department": employee.Department,
        "joined_at": employee.CreatedAt,
    })
}
