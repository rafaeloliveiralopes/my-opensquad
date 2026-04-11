---
task: "Gerar ângulos"
order: 1
input:
  - niche_brief: resumo contextualizado
output:
  - angles_brief: lista de ângulos
---

# Gerar ângulos

Crie 5 ângulos editoriais distintos para a mesma pauta. Cada ângulo precisa ter tese, promessa e direção de CTA.

## Process

1. Ler o `niche-brief.yaml` e identificar dor, consequência e objeção.
2. Gerar 5 ângulos com teses realmente diferentes.
3. Marcar o ângulo recomendado com justificativa.

## Output Format

```yaml
recommended_angle: 1
angles:
  - id: 1
    title: "..."
    thesis: "..."
    hook_draft: "..."
    cta_direction: "..."
```

## Quality Criteria

- [ ] 5 ângulos diferentes
- [ ] hook forte em cada um
- [ ] CTA nasce do conteúdo
