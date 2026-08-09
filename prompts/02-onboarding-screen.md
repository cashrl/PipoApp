# Tela de Onboarding

## Objetivo

Implementar a tela de onboarding (Tela 2) que aparece após a Splash Screen na primeira vez que o usuário abre o app. A tela apresenta o mascote Pipo e convida a criança a começar a usar o app.

## Fluxo do Usuário

```
Splash Screen (Tela 1)
    ↓ (splash termina)
Verifica AsyncStorage → onboarding já feito?
    ↓ Não
Tela de Onboarding (Tela 2)
    ↓ Usuário clica "Começar"
Salva em AsyncStorage que onboarding foi feito
    ↓
Navega para Home (dashboard)
```

- Na primeira vez: Splash → Onboarding → Home
- Nas vezes seguintes: Splash → Home (direto)

## Componentes necessários

### `app/onboarding.tsx` (Tela)

- Tela cheia com imagem `Telas/tela 2.png` como fundo (resizeMode cover)
- A tela toda é pressionável ( Pressable com flex-1 )
- Animação de fade-in ao entrar (opacity 0→1, 600ms)
- Ao tocar em qualquer lugar: salva `@pipo_onboarding_done = "true"` no AsyncStorage → navega para `/(tabs)`

### Alterações em `app/_layout.tsx`

- Após splash terminar, verificar AsyncStorage `@pipo_onboarding_done`
- Se `"true"` → vai para `/(tabs)`
- Se `null` ou `"false"` → vai para `/onboarding`

## Stores

Nenhuma store Zustand necessária. Usa-se AsyncStorage diretamente para a flag booleana.

- Chave: `@pipo_onboarding_done`
- Valor: `"true"` | `null`

## Hooks

Nenhum hook customizado necessário.

## Tipos

Nenhum tipo customizado necessário.

## Rotas

- Rota: `/onboarding` (dentro do Stack do root layout, fora do grupo `(tabs)`)

## Estrutura de pastas

```
app/
  onboarding.tsx        ← nova tela
  _layout.tsx           ← alterado (check onboarding)
```

## Critérios de aceitação

- [ ] Tela mostra a imagem `tela 2.png` como fundo cheio
- [ ] Toda a tela é pressionável
- [ ] Ao tocar, salva flag no AsyncStorage
- [ ] Na primeira vez: Splash → Onboarding → Home
- [ ] Nas vezes seguintes: Splash → Home (sem onboarding)
- [ ] Animação de fade-in ao entrar na tela

## Checklist técnico

- [ ] Criar `app/onboarding.tsx`
- [ ] Alterar `app/_layout.tsx` para check de onboarding
- [ ] Usar AsyncStorage (já instalado)
- [ ] Usar expo-router `router.replace()` para navegação
- [ ] Usar react-native-reanimated para animações
- [ ] Manter padrão de código existente (StyleSheet.create)
- [ ] Rodar `npx expo lint` após implementar

## Checklist visual

- [ ] Fundo cream (#FFF9F2)
- [ ] Imagem tela 2.png cobrindo a tela toda
- [ ] Fade-in suave ao entrar

## Possíveis riscos

- **Imagem tela 2.png pode não ter tamanho ideal** — resizeMode "cover" deve resolver, mas pode cortar partes da imagem
- **Botão sobreposto pode não alinhar perfeitamente** — ajustar `bottom` e `left/right` conforme teste visual
- **AsyncStorage pode falhar** — tratar como primeira vez (mostrar onboarding) se erro
