---
task: "Mapear e ranquear pautas"
order: 1
input:
  - content_brief: foco do conteúdo, objetivo e CTA desejado
  - company_context: contexto da KTLead
output:
  - ranked_opportunities: lista ranqueada de pautas
---

# Mapear e ranquear pautas

Pesquise temas, dores e oportunidades com aderência ao nicho principal de clínicas. Entregue 5 pautas ranqueadas com explicação de por que cada uma pode virar conteúdo forte.

## Process

1. Ler o `content-brief.md` e identificar tema, momento do funil e CTA desejado.
2. Pesquisar dores, sinais de demanda, mudanças de comportamento, gargalos e tendências ligadas ao tema.
3. Selecionar 5 pautas com melhor combinação entre relevância, clareza e potencial de conversão.
4. Explicar em linguagem simples por que cada pauta é útil para a KTLead.

## Output Format

```yaml
topic: "..."
funnel_stage: "topo|meio"
opportunities:
  - rank: 1
    title: "..."
    why_now: "..."
    clinic_angle: "..."
    cta_hint: "..."
```

## Quality Criteria

- [ ] 5 pautas realmente diferentes
- [ ] foco claro em clínicas
- [ ] cada pauta tem consequência de negócio
