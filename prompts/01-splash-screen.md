# Splash Screen — Tela de Abertura

## Objetivo
Implementar a splash screen do app Pipo exibindo o logo colorido e o mascote (raposa) com animações suaves, criando uma primeira impressão acolhedora para crianças de 3-4 anos.

## Fluxo do Usuário
1. App é aberto
2. Splash screen aparece com logo "Pipo" e mascote
3. Animações de entrada (estrelas, nuvens, personagem)
4. Após ~2-3 segundos, navega automaticamente para Onboarding (primeira vez) ou Home

## Componentes Necessários

### `components/SplashScreen.tsx`
- Tela cheia com fundo cream (#FFF9F2)
- Logo "Pipo" centralizado (imagem ou texto estilizado)
- Mascote raposa abaixo do logo
- Nuvens brancas na parte inferior
- Estrelas amarelas flutuando
- Efeitos de brilho/sparkle

### Animações (react-native-reanimated)
- Logo: fade-in + scale de 0.8 para 1.0
- Personagem: slide-up + bounce suave
- Estrelas: pulse animation (escala alternada)
- Nuvens: drift lento para esquerda/direita
- Sparkles: fade-in/out cíclico

## Stores
- Nenhuma store necessária para esta tela

## Hooks
- Nenhum hook customizado necessário

## Tipos
```typescript
interface PropsSplashScreen {
  onFinished: () => void;
}
```

## Rotas
- Rota inicial: `app/index.tsx` (redireciona para splash)
- Splash: componente inline ou rota dedicada
- Destino pós-splash: `app/(tabs)` ou `app/onboarding`

## Estrutura de Pastas
```
app/
  index.tsx              # Entry point (redireciona)
components/
  SplashScreen.tsx       # Componente da splash
assets/
  images/
    logo-pipo.png        # Logo colorido (precisa ser criado)
    fox-mascot.png       # Raposa mascote (precisa ser criado)
    cloud.png            # Nuvem (precisa ser criado)
    star.png             # Estrela (precisa ser criado)
    sparkle.png          # Brilho (precisa ser criado)
```

## Critérios de Aceitação
- [ ] Splash exibe em menos de 1 segundo após abertura
- [ ] Logo "Pipo" aparece com animação de entrada
- [ ] Mascote raposa aparece com animação
- [ ] Estrelas amarelas pulsam suavemente
- [ ] Nuvens se movem lentamente
- [ ] Efeitos de brilho aparecem e desaparecem
- [ ] Após 2-3 segundos, navega para próxima tela
- [ ] Fundo é cream (#FFF9F2)
- [ ] Animações são suaves (60fps)
- [ ] Funciona em iOS e Android

## Checklist Técnico
- [ ] Usar react-native-reanimated para animações
- [ ] Usar NativeWind para estilos (não StyleSheet.create)
- [ ] Componente funcional com TypeScript
- [ ] Interface em português
- [ ] Um componente por arquivo
- [ ] Otimizar para performance (evitar re-renders desnecessários)

## Checklist Visual
- [ ] Fundo cream suave
- [ ] Logo "Pipo" com cores: P azul, i verde, p amarelo, o rosa
- [ ] Raposa com macacão azul e estrela amarela
- [ ] Nuvens brancas na parte inferior
- [ ] Estrelas amarelas分散adas
- [ ] Efeitos de brilho/.sparkle
- [ ] Proporções adequadas para telas mobile
- [ ] Elementos não ficam cortados em diferentes tamanhos de tela

## Possíveis Riscos
1. **Imagens não disponíveis**: Precisaremos criar ou obter as imagens do logo, mascot, nuvens, estrelas
2. **Performance**: Animações complexas podem causar lag em dispositivos mais antigos
3. **Timing**: Splash muito rápido ou muito lento pode atrapalhar a experiência
4. **Diferentes resoluções**: Imagens precisam escalar bem em diferentes tamanhos de tela

## Notas de Implementação
- A splash screen nativa do Expo (via app.json) pode ser usada como fallback
- Considerar usar expo-splash-screen para controle programático
- Animações devem ser leves e não bloquear a navegação
- O componente deve ser desmontado após a animação completar
