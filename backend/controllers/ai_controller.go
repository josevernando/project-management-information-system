package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"pmis-backend/ai"
)

type SummaryRequest struct {
	Text string `json:"text"`
}

func AISummary(c *gin.Context) {
    var req SummaryRequest

    if err := c.BindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
        return
    }

    // Step 1: Generate narrative using AI
    summary, err := ai.GenerateNarrativeSummary(req.Text)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "AI summary failed", "detail": err.Error()})
        return
    }

    // Step 2: Generate DOCX file
    docPath, err := ai.GenerateSummaryDocxFile(summary)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate docx", "detail": err.Error()})
        return
    }

    // Step 3: Respond to frontend
    c.JSON(http.StatusOK, gin.H{
        "summary": summary,
        "docx":    docPath,
    })
}

