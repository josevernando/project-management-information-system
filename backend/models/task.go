package models

type Task struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Owner       string    `json:"owner"`
	Status      string    `json:"status"`
	DueDate     *string   `json:"due_date"`
	ProjectID   string    `json:"project_id"`
	AssigneeID  string    `json:"assignee_id"`
}
