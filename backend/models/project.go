package models

import "time"

type Project struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Client    string    `json:"client"`
	Status    string    `json:"status"`
	Rate      float64   `json:"base_rate"`
	CreatedAt time.Time `json:"created_at"`
}
