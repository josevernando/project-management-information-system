package ai

import (
    "log"
    "os"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/nguyenthenguyen/docx"
    "pmis-backend/config"
    "pmis-backend/models"
)

func GenerateSummaryDocxFile(summary string) (string, error) {
    log.Println("[DOCX] Using template-based docx generator")

    templatePath := "templates/activity_template.docx"
    outputPath := "output/summary.docx"

    // Ensure output folder exists
    os.MkdirAll("output", 0755)

    // Load template
    r, err := docx.ReadDocxFile(templatePath)
    if err != nil {
        return "", err
    }
    defer r.Close()

    // Editable document
    doc := r.Editable()

    // Replace placeholders
    doc.Replace("{{DATE}}", time.Now().Format("02 Jan 2006"), -1)
    doc.Replace("{{SUMMARY}}", summary, -1)

    // Save file
    err = doc.WriteToFile(outputPath)
    if err != nil {
        return "", err
    }

    return outputPath, nil
}

func GenerateSummaryDocxHandler(c *gin.Context) {
    userID := c.GetUint("user_id")
    log.Println("[HANDLER] Docx request from user:", userID)

    var activities []models.Activity
    if err := config.DB.Order("created_at desc").Find(&activities).Error; err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    rawActivities := ""
    for _, a := range activities {
        rawActivities += "- " + a.Description + "\n"
    }

    narrative, err := GenerateNarrativeSummary(rawActivities)
    if err != nil {
        c.JSON(500, gin.H{"error": "AI summary generation failed"})
        return
    }

    filePath, err := GenerateSummaryDocxFile(narrative)

    if err != nil {
        log.Println("[DOCX ERROR]", err.Error())
        c.JSON(500, gin.H{"error": "Failed to generate DOCX"})
        return
    }

    c.FileAttachment(filePath, "summary.docx")
}
