package ai

import "fmt"

// Generates a narrative-style project summary using Ollama
func GenerateNarrativeSummary(rawActivities string) (string, error) {

    prompt := fmt.Sprintf(`
Rewrite the following activity log into a smooth, chronological project narrative.

Requirements:
- Convert bullet logs into a natural, human-readable narrative
- Summarize progress professionally
- Highlight completed tasks, pending tasks, blockers, and risks
- Provide a cohesive explanation rather than listing items

Activity Log:
%s

Write the final result as a narrative summary.
`, rawActivities)

    return AskOllama("llama3.1", prompt)
}
