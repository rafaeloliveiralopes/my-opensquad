---
task: "Criar assets do post"
order: 2
input:
  - selected_visual: identidade visual escolhida
  - feed_draft: copy aprovado
output:
  - post_assets: html/css ou especificação visual
---

# Criar assets do post

Transforme o copy em peças finais do feed com hierarquia visual forte e leitura clara em mobile.

## Process

1. Ler o visual escolhido e o copy aprovado.
2. Definir tokens visuais, grid, tipografia, cores e componentes.
3. Salvar o sistema em `output/design-system.md`.
4. Montar os slides ou o layout do post estático e salvar os arquivos finais em `output/assets/`.
5. Garantir legibilidade, contraste e equilíbrio entre texto e espaço.

## Output Format

```markdown
# Design System
...

# Assets
- output/assets/slide-01.html
- output/assets/slide-02.html
```

## Quality Criteria

- [ ] capa forte
- [ ] texto legível em mobile
- [ ] consistência visual
- [ ] `output/design-system.md` escrito
- [ ] arquivos em `output/assets/` escritos
