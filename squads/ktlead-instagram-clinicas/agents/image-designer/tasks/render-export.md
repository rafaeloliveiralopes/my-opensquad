---
task: "Renderizar e exportar"
order: 3
input:
  - post_assets: assets visuais
output:
  - assets_manifest: manifesto final
---

# Renderizar e exportar

Renderize os assets finais e gere um manifesto com a lista do que ficou pronto.

## Process

1. Ler os arquivos gerados em `output/assets/`.
2. Renderizar ou exportar as peças finais para os formatos necessários.
3. Validar arquivos, nomenclatura e consistência.
4. Salvar o manifesto final em `output/assets-manifest.json`.

## Output Format

```json
{
  "ready_to_publish": true,
  "assets": ["slide-01.png"]
}
```

## Quality Criteria

- [ ] manifesto gerado
- [ ] assets consistentes
- [ ] sem arquivo quebrado
- [ ] `output/assets-manifest.json` escrito
