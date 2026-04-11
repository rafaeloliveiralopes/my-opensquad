---
task: "Pontuar conteúdo"
order: 1
input:
  - feed_draft: copy final
  - assets_manifest: assets finais
output:
  - review_score: score e notas
---

# Pontuar conteúdo

Atribua nota para hook, clareza, especificidade, valor percebido e CTA.

## Process

1. Avaliar se a tese está clara no hook.
2. Avaliar se o conteúdo fala com clínicas de forma específica.
3. Avaliar se o CTA combina com o post.
4. Salvar o relatório de pontuação em `output/review-score.md`.

## Output Format

```markdown
# Scores
- Hook:
- Clareza:
- CTA:
```

## Quality Criteria

- [ ] score por critério
- [ ] justificativa curta
- [ ] foco em estratégia
- [ ] `output/review-score.md` escrito
