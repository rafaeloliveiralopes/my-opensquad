---
task: "Gerar feedback"
order: 2
input:
  - review_score: pontuação em output/review-score.md
output:
  - review_final: veredicto final
---

# Gerar feedback

Consolide o review em um veredicto simples: aprovar, ajustar ou refazer.

## Process

1. Ler `output/review-score.md`.
2. Sintetizar pontos fortes.
3. Apontar correções necessárias.
4. Dar o veredicto final.

## Output Format

```markdown
# Verdict
APPROVE | ADJUST | REDO

# Strengths
...

# Fixes
...
```

## Quality Criteria

- [ ] veredicto claro
- [ ] feedback acionável
- [ ] sem vagueza
