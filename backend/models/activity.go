package models

import "time"

type Activity struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Description string    `json:"description"`
	HoursSpent  float64   `json:"hours_spent"`
	Billable    bool      `json:"billable"`
	ProjectID   *uint     `json:"project_id"`
	TaskID      *uint     `json:"task_id"`
	CreatedAt   time.Time `json:"created_at"`
	EmployeeID  uint      `json:"employee_id"`
}
