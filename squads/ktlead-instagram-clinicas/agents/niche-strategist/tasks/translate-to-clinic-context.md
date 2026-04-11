---
task: "Traduzir para contexto clínico"
order: 1
input:
  - selected_opportunity: pauta escolhida
  - company_context: contexto da KTLead
output:
  - niche_brief: resumo contextualizado para clínicas
---

# Traduzir para contexto clínico

Pegue a pauta escolhida e transforme em uma dor, oportunidade ou tensão clara para clínicas. O resultado deve dar base para geração de ângulos fortes.

## Process

1. Identificar o problema central da pauta.
2. Traduzir para captação, atendimento, agenda, follow-up ou conversão em clínicas.
3. Registrar a implicação prática e a objeção mais provável do público.

## Output Format

```yaml
title: "..."
core_problem: "..."
clinic_context: "..."
practical_implication: "..."
likely_objection: "..."
secondary_real_estate_adaptation: "..."
```

## Quality Criteria

- [ ] linguagem clara
- [ ] clínica como foco principal
- [ ] implicação prática evidente
