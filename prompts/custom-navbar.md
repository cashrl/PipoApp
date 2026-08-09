# Feature: Custom Navbar

## Objetivo
Implementar a barra de navegação inferior dinâmica com 4 abas (Home, Aulas, Pipo, Perfil), seguindo o design da tela 3.

## Fluxo do Usuário
1. Usuário está em qualquer aba
2. Toca em uma aba diferente
3. Navbar atualiza: ícone azul + texto azul + sublinhado azul na aba ativa
4. Navega para a tela correspondente

## Componentes Necessários
- `CustomTabBar` (reescrita completa)

## Assets Existentes
- `assets/nav bar.png` — fundo branco arredondado
- `assets/icon-home.png` — casa azul (ativo)
- `assets/icon-licoes.png` — livro cinza
- `assets/icon-pipo.png` — rosto de raposa cinza
- `assets/icon-perfil.png` — pessoa cinza

## Rotas
| Aba | Rota | Ícone |
|-----|------|-------|
| Home | `/(tabs)` | icon-home.png |
| Aulas | `/(tabs)/learn` | icon-licoes.png |
| Pipo | `/(tabs)/pipo` | icon-pipo.png |
| Perfil | `/(tabs)/settings` | icon-perfil.png |

## Estrutura de Pastas
- `components/CustomTabBar.tsx` — componente reescrito

## Critérios de Aceitação
- [ ] Fundo branco arredondado (nav bar.png)
- [ ] 4 abas com ícone + texto
- [ ] Aba ativa: ícone azul + texto azul (#4FBEF7) + sublinhado azul
- [ ] Abas inativas: ícone cinza + texto cinza
- [ ] Navegação funcional entre todas as abas
- [ ] Respeita safe area inferior

## Checklist Técnico
- [ ] Usa NativeWind (não StyleSheet.create)
- [ ] Componente funcional com TypeScript
- [ ] Usa assets existentes em `assets/`
- [ ] Usa `useRouter` para navegação
- [ ] Usa `usePathname` para detectar aba ativa

## Checklist Visual
- [ ] Fundo branco com bordas arredondadas
- [ ] Ícones centralizados
- [ ] Texto abaixo do ícone
- [ ] Sublinhado azul na aba ativa
- [ ] Espaçamento uniforme entre abas

## Possíveis Riscos
- Ícones azuis para abas ativas (exceto Home) não existem nos assets — usar cinza + sublinhado como diferencial visual
- Proporção dos ícones pode precisar de ajuste fino
