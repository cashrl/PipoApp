# agents.md — Pipo

You are an expert React Native and Expo engineer helping me build **Pipo**.
Write clean, simple, maintainable code. Prioritize clarity over unnecessary
abstraction. Think like a senior mobile developer.

---
## Visão Geral

App de aprendizado de inglês para crianças de **3-4 anos**, sem pressão de erro.
O mascote **Pipo** (monstrinho fofo, em PNG estático) aparece em toda tela fazendo
companhia e comemorando — **nunca diz "errou"**.

Aula 1 (Animais): 4 animais — `dog`, `cat`, `bird`, `fish`.
A aula é composta por **3 atividades**: (1) ouvir os 4 animais, (2) jogo "toque
no animal que ouviu", (3) jogo "emparelhe palavra ↔ imagem".

Mantenha a implementação simples e legível.

---
## Filosofia de Desenvolvimento

Build feature by feature. Para cada feature:
1. Leia este arquivo primeiro.
2. Mantenha a implementação simples.
3. Evite over-engineering.
4. Prefira código legível a código "esperto".
5. Construa a menor versão útil primeiro.
6. Refatore só quando apareceu repetição real.

**Ordem de construção acordada** (incremental, até terminar o app):
Home → Tela de Aprendizado → Atividade 1 (ouvir) → botão 🔊 → implementar o som
(`useAudio`/`expo-audio`) → Atividade 2 (jogo toque) → Atividade 3 (jogo
emparelhe) → Celebration.

---
## Decision Making

Se algo estiver claro ou puder melhorar, sugira uma abordagem melhor. Se uma
nova biblioteca ajudar significativamente, recomende, explique o porquê e
**pergunte antes de adicionar**. Não instale novas bibliotecas sem aprovação.

---
## Stack

- Framework: React Native + **Expo SDK 54** + TypeScript
- Styling: NativeWind v4 (Tailwind para RN) — ver `package.json` para a versão instalada; não upgrade sem aprovação
- State: Zustand
- Navigation: Expo Router
- Storage: AsyncStorage (progresso da criança — sempre `JSON.stringify`)
- Audio: **`expo-audio`** (NÃO `expo-av`, que está deprecated). `.mp3` locais
- Animações do mascote: **PNG estático** (sem Lottie no app todo)
- Áudios de pronúncia: `/assets/audio/`

Não introduzir novas bibliotecas major sem motivo forte.
O app não tem autenticação — NÃO usar Clerk nem construir auth custom.

---
## Convenções

- Function components com TypeScript.
- camelCase para funções/variáveis, PascalCase para componentes.
- Imports: React → libs → arquivos locais.
- 1 arquivo = 1 componente (`PipoMascote.tsx` exporta `PipoMascote`).
- Estilos: **classes NativeWind**, nunca `StyleSheet.create` (ver lista de exceções abaixo).
- Estados de async: `loading → error → success` **nunca pulados** — mas só onde há async real (ver Ciclo de Vida).
- TypeScript em **strict mode**, sem `any`.

---
## Arquitetura

```
/app                      (rotas Expo Router — só rotas e telas)
  _layout.tsx              → tabs layout: 🏠 Início · 🗺️ Aulas · 🐾 Pipo · ⚙️ Config
  (tabs)/
    index.tsx             → HomeScreen (aba Início)
    learn.tsx             → Tela de Aprendizado (aba Aulas — menu de aulas)
    pipo.tsx              → Sala do Pipo (aba Pipo — bichinho virtual)
    settings.tsx          → Settings (aba Config — som/música + "Área dos pais")
  parent/
    pin.tsx               → entrada de PIN (criar na 1ª vez, depois validar)
    dashboard.tsx         → Parental Control (PIN + timer de uso)
  time-up.tsx              → "Hora de descansar! 🌙" (ao atingir o limite)
  lesson/
    animal/[id].tsx        → Atividade 1: ouvir os 4 animais
    match.tsx              → Atividade 2: toque no animal que ouviu
    pair.tsx               → Atividade 3: emparelhe palavra ↔ imagem
    celebration.tsx        → tela de comemoração
/components
  PipoMascote.tsx          (Pipo estático — troca de imagem conforme humor)
  SoundButton.tsx
  AnimalCard.tsx
  WordCard.tsx             (cartão "palavra escrita + 🔊" da Atividade 3)
  LessonCard.tsx           (cartão de aula na Tela de Aprendizado)
  PinPad.tsx               (teclado numérico de 4 dígitos p/ PIN)
  PipoRoom.tsx             (cena da Sala do Pipo — interação e acessórios)
/hooks
  useProgress.ts  useAudio.ts  useLesson.ts  useSessionTimer.ts  usePin.ts
/services
  lessonService.ts         → define as 4 aulas e as 3 atividades da aula atual
/assets
  /audio/{dog,cat,bird,fish}.mp3
  /audio/correct.mp3  /audio/bloop.mp3  /audio/celebration.mp3
  /images/pipo/pipo-default.png  pipo-happy.png  pipo-listen.png
  /images/animals/{dog,cat,bird,fish}.png
/constants
  images.ts                → centralização de imagens (ver regra de imagens)
```

`app/` é **só rotas e telas**. Telas compõem componentes e chamam hooks/stores;
não contêm blocos grandes de UI reutilizável nem lógica de negócio.

`components/` é UI reutilizável. Criar componente quando reutilizado em vários
lugares, quando facilitar a leitura de uma tela, ou quando representar um
conceito UI claro. **Não criar componentes cedo demais.**

`services/lessonService.ts` é a **fonte de dados** das aulas, atividades e
animais — array tipado (sem JSON separado). Ver "Dados".

---
## Fluxo de Telas (fluxo acordado)

```
Home (entrada, limpa, Pipo estático + "Vamos brincar" 🚀 PT)
  → Tela de Aprendizado (menu de 4 aulas):
      ├─ Animais (liberado; cartão muda: Iniciar→Continuar→Rever)
      └─ Cores / Números / Formas (bloqueados; cartão escuro + 🔒;
           toque → dica do Pipo "Pra abrir: brinque com os Animais!")
            ↓ toca em Animais
  → Aula de Animais (3 atividades):
      1. OUVIR os 4 [dog→cat→bird→fish]
      2. JOGO "toque no animal que ouviu"
      3. JOGO "emparelhe palavra ↔ imagem"
            ↓ ao concluir a Atividade 3
  → Celebration (Pipo feliz + confete + "Você desbloqueou: Cores! 🎨"
                  + botão "Continuar") → desbloqueia Cores na store
            ↓
  → Tela de Aprendizado (Cores agora aberto)
```

Botão "Continuar" da Celebration volta à **Tela de Aprendizado** (não à Home).
A Home continua acessível via botão Sair/Home.

---
## Aula de Animais — 3 Atividades

1. **Ouvir** — 4 animais um por vez, tela completa, ordem `dog→cat→bird→fish`.
   Layout: imagem do animal centro + 🔊 inferior + Pipo no canto inferior direito.
   **Sem auto-play** aqui; só toca ao tocar 🔊. Ao tocar 🔊 o Pipo troca para
   `pipo-listen`.

2. **Jogo "toque no animal que ouviu"** — 4 rodadas (cada animal é alvo uma vez).
   Cartas por rodada: **2 → 3** (nunca 4 ao mesmo tempo).
   Ao abrir cada rodada: **auto-play** do animal-alvo (exceção legítima à regra
   "sem auto-play", válida só aqui na Atividade 2). 🔊 disponível pra repetir.

3. **Jogo "emparelhe palavra ↔ imagem"** — cartão de palavra = **palavra escrita +
   🔊 que pronuncia** (a criança emparelha por som/exposição visual, não por leitura
   — 3-4 anos não leem). Pares por tela: **2 → 3**. Mecânica **toque-toca**
   (selecionar 1, depois o par) — **sem drag-and-drop** (3-4 anos não têm
   motricidade fina pra arrastar).

---
## Mecânica Central dos Jogos (vale para Atividades 2 e 3)

- **Toque certo**: `correct.mp3` + avanço.
- **Toque errado**: `bloop.mp3` + efeito visual gentil (não avança, não recua).
  **Nunca "X", nunca "tente de novo"**. O Pipo nunca julga.
- **Desbloqueio** é por **CONCLUSÃO** das 3 atividades, nunca por acerto.
  A criança nunca "erra de fato".

---
## Navegação Dentro da Aula

- Botão ➡️ grande (sem swipe). Após ver/ouvir os 4 animais, o ➡️ vira
  **"Próximo 🎮"** e vai à próxima atividade (sem tela intermediária).
- Botão ⬅️ grande: sobe naturalmente — passos dentro da atividade; no **primeiro
  passo** de cada atividade: Atividade 2 → Atividade 1 → Tela de Aprendizado.
- **Botão Sair/Home fixo no topo**, sempre visível: volta à Tela de Aprendizado
  a qualquer momento.
- Padrão de tela: SafeArea → Container `flex-1` → conteúdo no centro → botão
  inferior → Pipo no canto inferior direito.

---
## Progresso (Zustand → AsyncStorage, JSON.stringify)

- Gravado **por atividade** (retoma de onde parou ao reabrir o app).
- Estado mínimo: `aulaAtual`, `atividadeAtual`, `atividadesConcluidas`, `aulasDesbloqueadas`.
- O cartão de Animais na Tela de Aprendizado reflete o progresso:
  `Iniciar` (nunca começou) → `Continuar` (mostra qual das 3 atividades) →
  `Rever` (concluído). A **retomada mora aqui**, não na Home.
- AsyncStorage não aceita objetos crus → sempre `JSON.stringify`.

---
## Dados (`services/lessonService.ts`)

Config das **4 aulas** e suas atividades + detalhe dos animais (nome, imagem,
áudio) vivem como **array tipado** no `lessonService.ts` (sem JSON separado).
As 3 aulas bloqueadas (Cores/Números/Formas) têm `desbloqueada: false` e
**sem `atividades` ainda** (placeholder). Animais é a única com as 3 atividades
concretas: `["ouvir", "jogo-toque", "jogo-emparelhe"]`.

---
## Mascote (Pipo) — PNG Estático

Pipo é **100% PNG estático** em todo o app (sem Lottie). "Celebração" e "ouvindo"
viram **troca de imagem**, não animação. 3 variações:

```
/assets/images/pipo/pipo-default.png   (boas-vindas / presença)
/assets/images/pipo/pipo-happy.png     (celebração na Celebration)
/assets/images/pipo/pipo-listen.png    (ouvindo, ao tocar 🔊 na Atividade 1)
```

Quirk: em Expo Go o Lottie não animava → por isso PNG estático remove essa
dependência. Testar em mobile/emulador.

---
## Áudios (`useAudio` + `expo-audio`)

Conjunto final (7 arquivos):
```
/assets/audio/dog.mp3  cat.mp3  bird.mp3  fish.mp3   (pronúncia)
/assets/audio/correct.mp3   (feedback de acerto, reutilizável)
/assets/audio/bloop.mp3      (efeito de toque errado, reutilizável)
/assets/audio/celebration.mp3 (música da Celebration)
```

`useAudio`: **pré-carrega** o único áudio da tela atual ao abrir (`loading →
ready`, sem auto-play na Atividade 1); toca no 🔊 instantaneamente; troca ao
trocar de animal e descarrega o anterior (Sound único na memória — "carregar
uma por uma" no sentido de trocar por animal). Ao desmontar a tela:
`unloadAsync()`.

---
## Parental Control (Área dos Pais)

App é infantil → um adulto controla quanto tempo a criança usa. **Sem
autenticação de criança** (não pedir login dela); só um PIN adulto.

**Navegação**: Settings (som/música on-off) → botão **"Área dos pais 🔒"** →
pede PIN → Parental Control (definir/alterar PIN + timer de uso).
Settings é acessível por ícone **discreto na Home** (fora do caminho principal
da criança de 3-4 anos).

**PIN** (`settingsStore`, AsyncStorage):
- **4 dígitos**, guardado com **hash leve** (não plain text).
- **Criado na primeira vez** que se entra na Área dos Pais (o app pede pra
  definir, depois confirmar). Nas vezes seguintes, sempre **pede o PIN pra
  entrar**.
- **Nunca** pedido no startup do app — só ao tocar em "Área dos pais".
- Componente `PinPad.tsx` (teclado numérico grande).

**Timer de uso** (`useSessionTimer`):
- O adulto define o limite em **minutos por sessão** (ex.: 15 / 30 / 45).
- O app conta o tempo **ativo** (enquanto a tela está em uso).
- Ao atingir o limite → vai para a tela **`time-up.tsx`: "Hora de descansar!
  🌙"** (Pipo bocejando), com um botão.
- **Não trava no meio de uma atividade** — espera terminar a rodada/atividade
  atual (pra não frustrar). Progresso salvo como sempre (retoma).
- **Mecânica Family Link**: na tela "Hora de descansar", há um botão que
  **pede o PIN**; se o adulto digitar o PIN criado, **libera mais tempo** e a
  criança volta a usar. A criança sozinha não consegue (não sabe o PIN).
- Contagem é **por sessão** (reseta ao sair/entrar no app), não por dia —
  suficiente pro MVP.

`settingsStore` guarda: `som` (bool), `musica` (bool),
`pinHash` (string | null), `minutosPorSessao` (number, default ex.: 30).

---
## Navegação Inferior (Bottom Tabs)

Barra inferior **fixa** em todas as telas principais (abas), estilo Duolingo,
**igual em todas**. **4 abas:**

- 🏠 **Início** → HomeScreen
- 🗺️ **Aulas** → Tela de Aprendizado (menu de 4 aulas — coração do app, retomada)
- 🐾 **Pipo** → Sala do Pipo (ver abaixo)
- ⚙️ **Configurações** → Settings (som/música on-off + botão "Área dos pais 🔒")

Ícones grandes e brancos. A aba ativa fica destacada. A bottom nav **não
aparece** dentro das telas de aula (`lesson/...`), na Celebration, no fluxo
de PIN, na tela "Hora de descansar" — essas são telas imersivas/de fluxo;
o retorno é via o botão Sair/Home no topo, já decidido.

---
## Sala do Pipo (aba 🐾)

Espaço virtual ao estilo do app **Pou**: a criança "visita" o Pipo e interage
com ele — **sem jogo, sem erro**. Propósito: dar identidade à aba do mascote
**e amarrar o desbloqueio de aulas a algo visível**.

- **Interação**: tocar no Pipo → ele reage (sorriso, som fofo curto, troca de
  humor para `pipo-happy` por um instante). Estado local, sem persistência de
  "felicidade".
- **Customização**: a criança veste o Pipo com **acessórios**. Cada aula
  concluída **desbloqueia um acessório**: concluir **Animais** libera um
  acessório; concluir **Cores** libera outro. Ex.: cachecol, chapéu, óculos.
  - **Isso dá PROPOSITO ao desbloqueio**: "Cores desbloqueado" deixa de ser só
    "mais conteúdo" e vira "ganhei um acessório pro Pipo".
- Acessórios são **PNGs em camada** desenhados por cima do Pipo (não 3D, não
  Lottie — mantém o mascote PNG estático). Set inicial pequeno no MVP.
- `progressStore` guarda `acessoriosDesbloqueados: string[]` e
  `acessorioEquipado: string | null`.

NÃO há "moedas" nem loja — só acessórios ganhos por progresso de aula.

---
## Configuração do Ambiente (Expo + NatWind + Reanimated)

### Versões Compatíveis (Expo SDK 54)

| Pacote | Versão | Nota |
|--------|--------|------|
| `react-native` | `0.76.9` | Fixo pelo Expo SDK 54 |
| `react-native-reanimated` | `~3.16.7` | **NÃO usar v4+** (exige RN 0.78+). Instalar com `--legacy-peer-deps` |
| `react-native-css-interop` | `^0.2.6` | Instalar no root com `--legacy-peer-deps` (nativewind o aninha, mas expo-router precisa no root) |
| `nativewind` | `^4.1.23` | Puxa `react-native-css-interop` como dep aninhada |
| `babel-preset-expo` | `~54.0.10` | Necessário para o Babel do Expo |
| `react-native-worklets` | `0.5.1` | Requerido por expo-router |

### Arquivos de Config Obrigatórios

**`babel.config.js`** — precisa do preset nativewind + plugin reanimated:
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
```

**`metro.config.js`** — integração nativewind:
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### Erros Conhecidos e Soluções

| Erro | Causa | Solução |
|------|-------|---------|
| `Cannot find module 'babel-preset-expo'` | Falta no package.json | `npx expo install babel-preset-expo` |
| `Cannot find module 'react-native-worklets/plugin'` | Falta dependência do expo-router | `npx expo install react-native-worklets` |
| `Unable to resolve "react-native-css-interop/jsx-runtime"` | Pacote aninhado em nativewind, não no root | `npm install react-native-css-interop --legacy-peer-deps` |
| `Unable to resolve "react-native-reanimated"` | Versão incompatível (v4+ exige RN 0.78+) | `npm install react-native-reanimated@3.16.7 --legacy-peer-deps` |
| `TurboModuleRegistry` / `PlatformConstants` | Nova Arquitetura (TurboModules) ativa | Adicionar `"newArchEnabled": false` no `app.json` |
| `Unable to resolve asset "./assets/icon.png"` | Asset não existe na pasta assets | Criar PNG na pasta `assets/` |

### Comando de Instalação Completo (do zero)

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Se faltar algum pacote
npx expo install babel-preset-expo react-native-worklets
npm install react-native-css-interop react-native-reanimated@3.16.7 --legacy-peer-deps

# Limpar cache do Metro
npx expo start -c
```

### Regra Importante

**NUNCA** instalar `react-native-reanimated@4.x` neste projeto — ele exige `react-native@0.78+` e quebra com Expo SDK 54 (RN 0.76.9). Sempre usar `@3.16.7`.

---
## Quirks

- NativeWind **NÃO** funciona com `SafeAreaView` → usar padding/margin no container (ver lista de exceções).
- Expo Router exclusivo, não React Navigation.
- `expo-audio` (não `expo-av`) — é o módulo atual pós-SDK 52/54.
- `expo-audio` não funciona no navegador Web → testar só em mobile/emulador.
- AsyncStorage não aceita objetos complexos → `JSON.stringify`.
- Interface 100% em **português**; o inglês fica só **dentro do conteúdo**
  (palavras dos animais, pronúncia).

---
## Styling Rules

Use classes NativeWind. **Não use `StyleSheet`** exceto quando não for possível
estilizar com `className`.

### Style Exception List (use StyleSheet ou inline styles para):
- `SafeAreaView` (className não suportado)
- `KeyboardAvoidingView` (prop `behavior`)
- `Modal` (props `visible`, `transparent`)
- `Animated.View` (valores animados de style)
- Estilos dinâmicos calculados em runtime
- Estilos específicos de plataforma
- Estados `pressed` de `Pressable`/`TouchableOpacity`
- Shadows (diferentes por plataforma)

Em todo o resto, use NativeWind. Reutilize padrões de classe via utilitários em
`global.css`.

---

## Image Rule (centralização de imagens) 

1. Verifique se `constants/images.ts` existe; se não, crie.
2. Importe **todas** as imagens do app lá.
3. Use-as através do objeto centralizado.

```ts
// constants/images.ts
import pipoDefault from "@/assets/images/pipo/pipo-default.png";
import pipoHappy    from "@/assets/images/pipo/pipo-happy.png";
import pipoListen   from "@/assets/images/pipo/pipo-listen.png";
import dog          from "@/assets/images/animals/dog.png";
import cat          from "@/assets/images/animals/cat.png";
import bird         from "@/assets/images/animals/bird.png";
import fish         from "@/assets/images/animals/fish.png";

export const images = {
  pipoDefault, pipoHappy, pipoListen,
  animals: { dog, cat, bird, fish },
};
```

```tsx
// em telas/componentes — nunca importar assets de imagem diretamente
<Image source={images.pipoDefault} />
<Image source={images.animals.dog} />
```

Não importar assets de imagem diretamente dentro de telas ou componentes.

**Fallback gracioso**: se um PNG não existir ao rodar, **não derrubar a brincadeira**
— exibir emoji equivalente como placeholder (🐶🐱🐦🐟 para animais), de forma que o
app continue testável até os PNGs chegarem.

---
## Estado e TypeScript

- Zustand para estado global do cliente (progresso, config derivada).
- Estado local (`useState`) para estado temporário de UI.
- AsyncStorage para persistência.
- TypeScript **strict**, sem `any`. Tipos simples e legíveis.

---
## Ciclo de Vida `loading → error → success` (sem pular — mas só onde há async real)

- `loading` **só em `useAudio` + `useProgress`** (async real). Telas estáticas
  (ex.: Home) **sem spinner**.
- `error` aqui é **falha técnica ao CARREGAR** (PNG/áudio/storage ausente ou
  corrompido) — **NÃO confundir** com "erro de aprendizagem" (que não existe).
  Comportamento: **fallback gracioso**:
  - PNG ausente → emoji equivalente no lugar.
  - Áudio ausente → 🔊 desabilitado, mas o resto da tela funciona.
  - AsyncStorage corrompido → reset do progresso e recomeça silencioso.
  - O app **nunca morre** por um asset faltante.
- Contrato garantido dentro dos hooks (`status: 'loading' | 'ready' | 'error'`).

---
## UI Rules

Para qualquer tarefa de UI:
- Quando houver design fornecido, **replicá-lo exatamente** — layout, espaçamento,
  padding, tamanhos e hierarquia de fonte, cores, border-radius, shadows,
  alinhamento e proporções. Não aproximar, não simplificar a menos que pedido.

---
## Feature Implementation

Ao construir uma feature:
1. Leia este arquivo primeiro.
2. Identifique os arquivos a mudar.
3. Mantenha as mudanças focadas.
4. Não reescreva código não relacionado.
5. Siga os padrões existentes.
6. Garanta que a feature funcione end-to-end.
7. Corrija erros de lint e tipo antes de finalizar.

---
## Secrets / Servidor

O Pipo é offline/local — não há chamadas a APIs externas nem server routes. Se
algo externo aparecço no futuro, NÃO exponha chaves no client; use server routes.

---
## Comunicação

Seja conciso. Explique **o que mudou** e **como testar**.

---
## Final Reminder

Antes de cada feature:
- Leia este arquivo.
- Siga-o estritamente.
- Escreva código limpo e simples.
- Replique a UI exatamente quando houver design.

---
## Resumo das decisões do grilling (por referencia rapida)

- SDK 54 + `expo-audio` (drop `expo-av`).
- Fluxo com **Tela de Aprendizado** (4 aulas; Animais aberto, 3 bloqueadas) entre Home e aula.
- Aula de Animais = **3 atividades** (ouvir + 2 jogos), não só ouvir.
- **Sem pressão de erro**: desbloqueio por conclusão; jogos com mecânica
  "errado ignora (bloop), certo avança (correct)".
- Pipo **PNG estático** (3 variações), sem Lottie.
- Progresso **por atividade** (retoma de onde parou).
- Dados no `lessonService.ts` (array tipado, sem JSON).
- Áudios: pronúncia 4 + `correct` + `bloop` + `celebration`.
- Navegação: ➡️ vira "Próximo 🎮" após ouvir os 4; ⬅️ sobe naturalmente;
  botão Sair/Home fixo no topo.
- Celebration ao fim da Atividade 3, anuncia "Você desbloqueou: Cores! 🎨",
  "Continuar" → Tela de Aprendizado.
- Interface em português; inglês só no conteúdo.
