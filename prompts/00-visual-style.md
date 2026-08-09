# Design System — Estilo Visual do Moodboard

## Objetivo
Implementar a fundação visual do app Pipo baseada no moodboard fornecido:
tipografia, paleta de cores, componentes base (botões, cards, barra de
progresso), e configure NativeWind para suportar tudo isso.

Caminho: 

## Paleta de Cores (extrair do moodboard)

| Token          | Hex       | Uso                                |
|----------------|-----------|------------------------------------|
| `primary`      | `#4FBEF7` | Azul principal (botões, destaques) |
| `success`      | `#63D471` | Verde (acerto, progresso)          |
| `warning`      | `#FFD93D` | Amarelo (estrelas, recompensas)    |
| `danger`       | `#FF6B6B` | Vermelho suave (feedback)          |
| `pink`         | `#FFB7D5` | Rosa (decorativo)                  |
| `cream`        | `#FFF9F2` | Fundo claro                        |
| `white`        | `#FFFFFF` | Cards, superfícies                 |
| `dark`         | `#2D3436` | Texto principal                    |
| `muted`        | `#636E72` | Texto secundário                   |

## Tipografia — Fredoka Rounded

- Instalar fonte `Fredoka Rounded` via `expo-font`
- Usar em todo o app (títulos, corpo, botões)
- Pesos: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Se a fonte não estiver disponível, fallback: `System` com `borderRadius` nos containers

## Arquivos a criar/modificar

### 1. `tailwind.config.ts` (modificar)
Adicionar paleta de cores customizada:
```ts
colors: {
  primary: '#4FBEF7',
  success: '#63D471',
  warning: '#FFD93D',
  danger: '#FF6B6B',
  pink: '#FFB7D5',
  cream: '#FFF9F2',
  dark: '#2D3436',
  muted: '#636E72',
}
```

### 2. `constants/colors.ts` (novo)
Exportar tokens de cores para uso fora do NativeWind (ex: inline styles, Animated).

### 3. `components/Button.tsx` (novo)
- Botão arredondado (`rounded-2xl`) com 3 variantes:
  - `primary`: bg primary, texto branco
  - `success`: bg success, texto branco
  - `outline`: borda primary, fundo transparente
- Tamanhos: `sm`, `md`, `lg`
- Ícone opcional à esquerda
- Estado `pressed`: escurecer 10%
- Shadow suave

### 4. `components/Card.tsx` (novo)
- Container branco (`bg-white`) com `rounded-2xl` e `shadow`
- Padding consistente
- Props: `children`, `className`

### 5. `components/ProgressBar.tsx` (novo)
- Barra visual com preenchimento colorido (success)
- Prop `progress` (0-1)
- Estrela no final quando completo
- Fundo `cream`, barra `success`

### 6. `components/IconButton.tsx` (novo)
- Botão circular para ícones (🔊, 🏠, ⬅️, ⭐, 🎁)
- Tamanhos: `sm` (32px), `md` (48px), `lg` (64px)
- Variantes de cor

### 7. `app/_layout.tsx` (modificar)
- Carregar fonte Fredoka Rounded
- Aplicar fonte como padrão no整个 app

## Restrições

- Usar **apenas NativeWind** (não StyleSheet.create)
- Cores via tokens Tailwind (não hex inline exceto Animated)
- Botões com `Pressable` do React Native
- Todos os componentes devem ser genéricos e reutilizáveis
- Interface em português

## Como testar

1. Rodar `npx expo start`
2. Verificar que a paleta de cores está aplicada corretamente
3. Testar botões em diferentes variantes e tamanhos
4. Verificar que a fonte Fredoka Rounded carrega
5. Testar ProgressBar com diferentes valores
6. Verificar acessibilidade: contraste de cores, tamanho de toque (min 44px)
