package ai

import "fmt"

// Generates a narrative-style activities summary using Ollama
func GenerateNarrativeSummary(rawActivities string) (string, error) {

	prompt := fmt.Sprintf(`
	You are a summarization assistant. Your task is ONLY to rewrite the provided activity log into a clear, chronological narrative.

	STRICT RULES:
	1. Do NOT add any information that is not explicitly present in the activity log.
	2. Do NOT assume motivations, outcomes, deadlines, risks, issues, or next steps unless they are directly mentioned.
	3. Do NOT invent tasks, names, dates, or events.
	4. Maintain strict factual accuracy. If a detail is missing, leave it out.
	5. Only transform the style into a smooth narrative — do NOT expand beyond the given facts.
	6. Preserve the meaning of every activity, but rewrite it in proper sentences.

	Activity Log (raw input):
	%s

	TASK:
	Rewrite the above log into a factual, professional narrative summary without adding any new information.
	`, rawActivities)

	return AskOllama("llama3.1", prompt)
}
