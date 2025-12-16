package ai

import "fmt"

// Generates a narrative-style activities summary using Ollama
func GenerateNarrativeSummary(rawActivities string) (string, error) {

	prompt := fmt.Sprintf(`
	You are a professional technical editor.

	STRICT RULES:
	- Rewrite the sentence to sound professional and formal.
	- Preserve the original meaning exactly.
	- Do NOT add explanations.
	- Do NOT add headers.
	- Do NOT add quotes.
	- Do NOT add phrases like "Here is the rewritten sentence".
	- Do NOT add markdown.
	- Output ONLY the rewritten sentence.
	- Output ONE sentence only.
	- Write the sentence in Indonesian

	Sentence:
	%s
	`, rawActivities)

	return AskOllama("llama3.1", prompt)
}
