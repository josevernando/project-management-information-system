package models

import "time"

type Employee struct {
	ID         uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	Name       string    `json:"name"`
	Department string    `json:"department"`
	Position   string    `json:"position"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	CreatedAt  time.Time `json:"created_at"`
}

