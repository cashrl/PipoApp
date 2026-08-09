Voce é um expert em desevolvimento de apps React Native + Expo

# Projeto
Um aplicativo para criancas de 3-4 anos, aprenderem ingles
é um aplicativo fofo. Sem pressao de erro

# Stack
- Expo SDK 54 (~54.0.0)
- React Native 0.81.5
- React 19.1.0
- Expo Router ~6.0.24
- NativeWind v4
- Zustand
- TypeScript ~5.9.2

# Documentacoes
https://docs.expo.dev/
https://reactnative.dev/docs/getting-started
https://zustand.docs.pmnd.rs/learn/getting-started/introduction

# Workflow
1. Leia este arquivo (agents.md) primeiro
2. Entenda o código existente
3. Antes de implementar qualquer funcionalidade, gerar um documento em:
4. Antes de implementar perguntar ao usario se pode implementar. "Feito!, posso implementar?"

prompts/nome-da-feature.md

Esse documento deve conter:

- Objetivo
- Fluxo do usuário
- Componentes necessários
- Stores
- Hooks
- Tipos
- Rotas
- Estrutura de pastas
- Critérios de aceitação
- Checklist técnico
- Checklist visual
- Possíveis riscos

# Convenções
- Function components + TypeScript
- NativeWind classes (não StyleSheet.create)
- Um componente por arquivo
- Interface 100% em português; inglês só no conteúdo
- NÃO usar babel (não criar babel.config.js)

# Regras de Implementação com Design

Quando uma imagem de design/referência for fornecida como anexo no prompt:
- Implementar a tela EXATAMENTE como mostrado na imagem (layout, cores, posições, tipografia)
- Reusar assets existentes na pasta assets/ quando disponíveis
- Se alguma imagem necessária não existir nos assets, usar placeholder de:
  - **Unsplash** (fotos reais): `https://source.unsplash.com/featured/?palavra-chave`
  - **Picsum** (imagens aleatórias): `https://picsum.photos/width/height`
- Priorizar Unsplash para imagens contextualizadas (ex: fruta → `?apple,food`)
- Usar Picsum para imagens genéricas ou quando não souber o que buscar
- Nunca inventar caminhos de imagem que não existem


# Fluxo do App

## Visao Geral

App de aprendizado de ingles para criancas de 3-4 anos. Mascote e o Pipo (raposa). Interface 100% em portugues.

A crianca deve sentir que esta jogando. Nunca mostrar: modulo, nota, tempo restante, "errou". Toda navegacao com no maximo 2 toques.

## Mapa de Navegacao Completo

### Fluxo de Navegacao (Resumo)

```
Tela 1 (Splash) -> Tela 2 (Onboarding) -> Tela 3 (Home)
                                                |
                      +-------------------------+-------------------------+
                      |                         |                         |
                 Tab Aulas                  Tab Pipo                   Tab Perfil
                      |                         |                         |
                 Tela 4 (lista)           Tela 5 (quarto)           Tela 6 (perfil)
                      |                         |                         |
              toca na lição              toca no item              "Area dos Pais"
                      |                  equipa/des               |
              +-------+-------+                                  Tela 7 (PIN)
           1a vez         ja fez
              |              |
           Tela 9         Tela 8
        (quiz direto)   (intermediaria)
              |              |
           Tela 10        Tela 9
         (arrastar)     (quiz)
              |              |
           Tela 11/12     Tela 10
         (Great Job)    (arrastar)
              |              |
           Tela 8         Tela 11/12
        (proxima licao)  (Great Job)
         [PENDENTE]         |
                         Tela 8
                      (proxima licao)
                        [PENDENTE]
```

### Fluxo de Inicializacao

```
Tela 1: Splash Screen (app/_layout.tsx -> CustomSplashScreen)
  |  Logo "Pipo" + mascote raposa
  |  Fundo cream (#FFF9F2)
  |  Duracao: ~2-3 segundos
  |  Apos splash: le AsyncStorage @pipo_onboarding_done
  |
  |-- SE primeira vez (null) --> Tela 2: Onboarding
  |
  +-- SE ja fez onboarding ("true") --> Tela 3: Home
```

### Tela 2: Onboarding (app/onboarding.tsx)

```
Pipo: "Ola! Eu sou o Pipo! Vamos brincar e aprender ingles juntos?"
Botao "Começar" (ou toque em qualquer lugar)
Acao: salva @pipo_onboarding_done = "true"
Navegacao: router.replace("/(tabs)")

+--> Tela 3: Home
```

### Tela 3: Home Dashboard (app/(tabs)/index.tsx)

```
Saudacao: "Ola, [nome]!"
Sequencia de dias: "X dias seguidos!" (calculado automaticamente)
Card "Continuar" -- licao atual (Unidade X - Tema)
Resumo visual -- progresso (estrelas preenchidas/vazias)
Icone config + total estrelas

|-- Botao "Continuar" --> Tela 8: Licao Intermediaria
|-- Tab "Aulas" --> Tela 4: Lista de Aulas
|-- Tab "Pipo" --> Tela 5: Quarto do Pipo
+-- Tab "Perfil" --> Tela 6: Perfil
```

### Tela 4: Aulas (app/(tabs)/learn.tsx)

```
Lista completa de unidades e licoes
Unidade 1: Animais (Dog, Cat, Bird, Fish, Rabbit)
Unidade 2: Cores (bloqueada)
Unidade 3: Numeros (bloqueada)

Licao completa: estrela dourada
Licao atual: borda tracejada azul
Licao bloqueada: cadeado

|-- Toque na licao (1a vez) --> Tela 9: Quiz direto
+-- Toque na licao (ja fez) --> Tela 8: Licao Intermediaria
```

### Tela 5: Pipo Room (app/(tabs)/pipo.tsx) [PENDENTE]

```
Quarto do Pipo cenario ilustrado
Itens equipaveis: chapus, roupas, brinquedos
Itens desbloqueados vs bloqueados

+--> Toque no item --> equipa/desequipa no Pipo (checkmark visual)
```

### Tela 6: Perfil (app/(tabs)/settings.tsx)

```
Avatar do Pipo + nome "Amiguinho"
Total de estrelas
Meu Progresso: Licoes completas, Sequencia, Tempo total
Configuracoes: Efeitos sonoros (toggle direto), Notificacoes (toggle direto)
Botao "Area dos Pais" (rosa, com cadeado)

+--> Botao "Area dos Pais" --> Tela 7: PIN
```

### Tela 7: Area dos Pais (rota: app/parents.tsx -- NAO IMPLEMENTADA)

```
Teclado numerico (0-9)
4 circulos para digitos do PIN
Botao X (vermelho) para apagar
Botao OK (verde) para confirmar
Botao voltar no canto superior esquerdo

|-- PIN correto --> Area dos Pais (estatisticas, config)
+-- PIN incorreto --> mensagem de erro
```

### Tela 8: Licao Intermediaria (rota: app/lesson/[id].tsx -- NAO IMPLEMENTADA)

```
Icone da unidade (ex: pata azul para Animais)
"Unidade 1 - Animais"
"Licao 3 de 5"
Barra de progresso (40%)
Botao "Começar"
Botao voltar + estrelas no header

+--> Botao "Começar" --> Tela 9: Quiz
```

### Tela 9: Quiz Multipla Escolha (rota: app/lesson/[id]/quiz.tsx -- NAO IMPLEMENTADA)

```
Barra de progresso (40%)
Pergunta: "What is this?"
Botao de audio (alto-falante azul)
3 imagens com labels: Maca, Banana, Cenoura
Seleciona imagem certa --> estrela + avanca
Seleciona errado --> sem punicao, tenta de novo

+--> Completa todas --> Tela 10: Quiz Arrastar
```

### Tela 10: Quiz Arrastar Palavra (rota: app/lesson/[id]/drag.tsx -- NAO IMPLEMENTADA)

```
Barra de progresso (60%)
Instrucao: "Drag the word to the image!"
3 imagens com bordas tracejadas
3 palavras arrastaveis: apple, banana, carrot
Pipo ajuda: "Arraste a palavra para a imagem correta!"

+--> Completa todas --> Tela 11 ou 12: Great Job!
```

### Tela 11: Great Job + Item (rota: app/lesson/complete.tsx -- NAO IMPLEMENTADA)

```
"Great job!" texto dourado
Estrela gigante dourada com confetes
"You got a new item!" + item (ex: bone azul)
Item ganho de forma ALEATORIA
Botao "Continuar"

+--> Botao "Continuar" --> Tela 8: Proxima licao [PENDENTE - sem outras unidades]
```

### Tela 12: Great Job (rota: app/lesson/complete.tsx -- NAO IMPLEMENTADA)

```
"Great job!" texto dourado
Estrela gigante dourada com confetes
SEM item (tambem aleatorio)
Botao "Continuar"

+--> Botao "Continuar" --> Tela 8: Proxima licao [PENDENTE - sem outras unidades]
```

## Rotas Implementadas

| Arquivo | Rota | Tela | Status |
|---------|------|------|--------|
| app/_layout.tsx | Root Stack | Splash + routing | OK |
| app/index.tsx | / | Redirect para tabs | OK |
| app/onboarding.tsx | /onboarding | Onboarding | OK |
| app/(tabs)/_layout.tsx | /(tabs) | Tab container | OK |
| app/(tabs)/index.tsx | /(tabs) | Home (vazio) | Placeholder vazio |
| app/(tabs)/learn.tsx | /(tabs)/learn | Aulas | Mockup estatico |
| app/(tabs)/pipo.tsx | /(tabs)/pipo | Pipo Room | Mockup estatico |
| app/(tabs)/settings.tsx | /(tabs)/settings | Perfil | Mockup estatico |

## Rotas NAO Implementadas (precisam ser criadas)

| Arquivo | Rota | Tela | Prioridade |
|---------|------|------|------------|
| app/parents.tsx | /parents | Area dos Pais (PIN) | Alta |
| app/lesson/[id].tsx | /lesson/:id | Licao Intermediaria | Alta |
| app/lesson/[id]/quiz.tsx | /lesson/:id/quiz | Quiz Multipla Escolha | Alta |
| app/lesson/[id]/drag.tsx | /lesson/:id/quiz | Quiz Arrastar Palavra | Alta |
| app/lesson/complete.tsx | /lesson/complete | Great Job! | Media |

## AsyncStorage Keys

| Key | Valor | Descricao |
|-----|-------|-----------|
| @pipo_onboarding_done | "true" / null | Indica se onboarding foi completado |
| @pipo_home_data | JSON | Dados do home (streak, estrelas, licao atual) |
| @pipo_profile | JSON | Perfil da crianca (nome, avatar) |
| @pipo_inventory | JSON | Itens desbloqueados e equipados |
| @pipo_settings | JSON | Configuracoes (som, notificacoes) |
| @pipo_pin | "XXXX" | PIN dos pais (4 digitos) |

## Tipos de Exercicio

1. **Multipla escolha** -- audio toca nome, crianca clica na imagem certa
2. **Arrastar palavra pra imagem** -- arrasta texto pra imagem correspondente

Sem exercicios de escrita ou listening/repeticao.

## Sistema de Recompensas

- Estrelas = feedback visual por acerto (sem uso como moeda)
- Itens novos apenas em marcos especiais (ex: completar 5 licoes)
- Itens servem para equipar no Pipo

## Area dos Pais

- Protegida por PIN (4 digitos)
- Estatisticas -- progresso, licoes completas, tempo de uso
- Configuracoes -- som, notificacoes
- Conteudo -- quais unidades/temas estao ativos
- Limite de tempo -- quanto tempo por dia

---

# Regras de UX

Sempre existir apenas UMA ação principal por tela.

Botões grandes.

Muito espaço em branco.

Pouco texto.

Ícones ilustrados.

Feedback imediato.

Sem pressão por tempo.

Sem vidas.

Sem punições.

Sem propagandas.

Sem telas complexas.

A criança deve conseguir navegar sem saber ler.

Toda ação importante deve possuir:

- animação
- som
- feedback visual

O personagem deve estar presente na maior parte da navegação para criar vínculo emocional.

# Segurança

Qualquer funcionalidade destinada ao responsável deve exigir autenticação via PIN de 4 dígitos.

Exemplos:

- Área dos Pais
- Configurações
- Restaurar compras
- Alterar idioma
- Resetar progresso
- Gerenciar perfis

# Persistência

Utilizar AsyncStorage.

Persistir:

- personagem
- progresso
- inventário
- conquistas
- configurações
- PIN