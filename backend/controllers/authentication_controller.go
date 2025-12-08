package controllers

import (
	"net/http"
	"time"
	"pmis-backend/config"
	"pmis-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("SECRET_KEY_CHANGE_ME")

// REGISTER USER
func Register(c *gin.Context) {
	var body models.Employee

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 14)
	body.Password = string(hashed)

	if err := config.DB.Create(&body).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User registered successfully"})
}

// LOGIN USER
func Login(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&body); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid"})
                return
        }

	var user models.Employee
	config.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenStr, _ := token.SignedString(jwtKey)

	c.JSON(200, gin.H{"token": tokenStr, "user": user})
}

// LOGOUT USER
func Logout(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Logged out successfully"})
}
