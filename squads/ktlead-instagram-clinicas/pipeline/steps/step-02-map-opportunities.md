---
execution: subagent
agent: researcher
inputFile: squads/ktlead-instagram-clinicas/output/content-brief.md
outputFile: squads/ktlead-instagram-clinicas/output/ranked-opportunities.yaml
model_tier: powerful
---

# Step 02: Mapeamento de Pautas

## Context Loading

- `output/content-brief.md`
- `pipeline/data/research-brief.md`
- `_opensquad/_memory/company.md`

## Instructions

Executar a task `find-and-rank-opportunities`.
Entregar 5 pautas ranqueadas para o nicho principal de clínicas.
