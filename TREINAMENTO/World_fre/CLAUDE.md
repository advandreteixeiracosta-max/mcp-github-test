# Word Frequency - Documentação do Projeto

## 📋 Descrição do Projeto

**Word Frequency** é uma aplicação web que analisa blocos de texto e gera estatísticas sobre a frequência de palavras. O usuário insere um texto (até 2048 caracteres), clica no botão de análise, e recebe uma tabela interativa mostrando cada palavra única com sua contagem de ocorrências, ordenada de forma descendente por frequência.

**Tier:** Beginner (1)  
**Tipo:** Progressive Web App (Client-side)  
**Objetivo Learning:** Processamento de texto, manipulação de dados, visualização de informações

---

## 🛠️ Stack Técnico

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | React 18 + TypeScript | Componentes reativos, type-safety, ecosystem maduro |
| **Build Tool** | Vite | Build rápido, HMR instantâneo, config mínima |
| **Styling** | Tailwind CSS | Utility-first, prototipagem rápida, responsividade built-in |
| **Gráficos** | Recharts | Integração React nativa, componentizado, customizável |
| **Estado** | React Hooks | Simplicidade suficiente, sem overhead (Redux desnecessário) |
| **Testing** | Vitest + React Testing Library | Velocidade, integração Vite, testes semânticos |
| **Deploy** | Vercel | Zero-config React, CI/CD automático, preview URLs |
| **Package Manager** | npm | Padrão, lock file confiável |

---

## 📅 Fases de Desenvolvimento

### **Fase 1: MVP Core** (Funcionalidades Obrigatórias)
**Duração estimada:** 2-3 horas  
**Objetivo:** Aplicação funcional com análise de frequência

- [x] Setup inicial: React + Vite + TypeScript
- [ ] Componente `TextInput` (textarea com limite de caracteres)
- [ ] Componente `AnalysisButton`
- [ ] Lógica de processamento de texto:
  - Tokenização (split by whitespace, lowercase)
  - Filtragem (remover pontuação, palavras vazias)
  - Contagem de frequência
  - Ordenação descendente
- [ ] Componente `FrequencyTable` (tabela simples)
- [ ] Validação (mensagem de erro texto vazio)
- [ ] Estado global com `useState`

### **Fase 2: Polimento Visual**
**Duração estimada:** 2-3 horas  
**Objetivo:** Interface polida e responsiva

- [ ] Estilização Tailwind CSS completa
- [ ] Feedback visual (loading spinner durante análise)
- [ ] Animações CSS (fade-in da tabela)
- [ ] Responsividade (mobile-first)
- [ ] Dark mode (opcional, com toggle)
- [ ] Melhorias UX (botão desabilitado em estado vazio, focus states)

### **Fase 3: Feature Extra - Gráfico**
**Duração estimada:** 2 horas  
**Objetivo:** Visualização gráfica complementar

- [ ] Integração Recharts
- [ ] Componente `FrequencyChart` (column chart ou bubble chart)
- [ ] Toggle entre tabela e gráfico
- [ ] Tooltips interativos
- [ ] Responsividade do gráfico

### **Fase 4: Feature Extra - URL Parser**
**Duração estimada:** 3-4 horas  
**Objetivo:** Importar texto de páginas web

- [ ] Tab/Toggle para escolher entre "Texto Manual" e "URL"
- [ ] Input para URL com validação
- [ ] Fetch de conteúdo HTML
- [ ] Parsing de conteúdo (remover scripts, styles, tags HTML)
- [ ] Tratamento de erros (CORS, timeouts, URLs inválidas)
- [ ] Loading state durante fetch
- [ ] Cache simples (localStorage)

### **Fase 5: Polish Final**
**Duração estimada:** 2-3 horas  
**Objetivo:** Qualidade produção

- [ ] Testes unitários (funções de processamento)
- [ ] Testes de componentes (Tabela, Input, Button)
- [ ] Otimizações de performance (memoização, useMemo)
- [ ] Acessibilidade (labels, ARIA, keyboard navigation)
- [ ] SEO básico (meta tags, OG)
- [ ] Build otimizado
- [ ] Deploy em Vercel

---

## 📁 Estrutura de Pastas

```
world-fre/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── TextInput.tsx          # Input textarea com limites
│   │   ├── AnalysisButton.tsx     # Botão de análise
│   │   ├── FrequencyTable.tsx     # Tabela de resultados
│   │   ├── FrequencyChart.tsx     # Gráfico (Fase 3)
│   │   ├── URLInput.tsx           # Input para URL (Fase 4)
│   │   └── Tab.tsx                # Component de tabs (Fase 4)
│   ├── hooks/
│   │   ├── useWordFrequency.ts    # Hook para análise
│   │   ├── useFetchContent.ts     # Hook para fetch URL (Fase 4)
│   │   └── useLocalStorage.ts     # Hook para cache (Fase 4)
│   ├── utils/
│   │   ├── textProcessor.ts       # Tokenização, limpeza
│   │   ├── frequencyCounter.ts    # Contagem e ordenação
│   │   ├── htmlParser.ts          # Parse HTML (Fase 4)
│   │   └── validation.ts          # Validações
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── styles/
│   │   └── globals.css            # Tailwind, globals
│   ├── App.tsx                    # Root component
│   ├── App.css
│   └── main.tsx                   # Entry point
├── tests/
│   ├── utils/
│   │   ├── textProcessor.test.ts
│   │   └── frequencyCounter.test.ts
│   └── components/
│       ├── TextInput.test.tsx
│       └── FrequencyTable.test.tsx
├── .gitignore
├── .env.example
├── index.html
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── CLAUDE.md                      # Este arquivo
├── App.md                         # Especificação original
└── README.md                      # Documentação para usuários
```

---

## 🚀 Comandos

### Setup Inicial
```bash
# Clonar/criar projeto (se necessário)
npm create vite@latest world-fre -- --template react-ts

# Entrar na pasta
cd world-fre

# Instalar dependências
npm install

# Instalar dependências adicionais
npm install recharts
npm install -D tailwindcss postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitest/ui

# Inicializar Tailwind
npx tailwindcss init -p
```

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Servidor rodará em http://localhost:5173
# Acesso automático ao navegador padrão
```

### Testing
```bash
# Rodar testes uma vez
npm run test

# Rodar testes em modo watch
npm run test:watch

# Gerar coverage report
npm run test:coverage

# UI interativa para testes
npm run test:ui
```

### Build & Deploy
```bash
# Build para produção
npm run build

# Visualizar build localmente
npm run preview

# Lint (quando adicionado ESLint)
npm run lint

# Format (quando adicionado Prettier)
npm run format
```

---

## 📝 Convenções de Código

### **Nomenclatura**

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| **Componentes React** | PascalCase | `TextInput.tsx`, `FrequencyTable.tsx` |
| **Variáveis/funções** | camelCase | `processText()`, `wordFrequency` |
| **Constantes** | UPPER_SNAKE_CASE | `MAX_TEXT_LENGTH = 2048` |
| **Tipos/Interfaces** | PascalCase | `WordFrequencyData`, `AnalysisResult` |
| **Arquivos utilitários** | kebab-case | `text-processor.ts`, `frequency-counter.ts` |

### **TypeScript**

```typescript
// ✅ Sempre tipificar props de componentes
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
}

// ✅ Usar tipos genéricos quando apropriado
interface ApiResponse<T> {
  data: T;
  error?: string;
}

// ✅ Evitar 'any' - usar 'unknown' se necessário
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    // process
  }
};

// ✅ Tipos de retorno explícitos em funções
function countWords(text: string): Record<string, number> {
  // implementation
}
```

### **React Components**

```typescript
// ✅ Componentes funcionais com TypeScript
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  maxLength = 2048,
  disabled = false
}) => {
  return (
    // JSX
  );
};

// ✅ Usar hooks corretamente
const [text, setText] = useState<string>('');
const [results, setResults] = useState<WordFrequencyData[] | null>(null);

// ✅ useCallback para funções de callback
const handleAnalyze = useCallback(() => {
  const frequency = countWords(text);
  setResults(frequency);
}, [text]);

// ✅ useMemo para computações pesadas
const sortedResults = useMemo(() => {
  return Object.entries(results)
    .sort(([, a], [, b]) => b - a);
}, [results]);
```

### **Estilos (Tailwind)**

```typescript
// ✅ Classes Tailwind bem organizadas
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">
    Word Frequency Analyzer
  </h1>
  <p className="text-sm text-gray-600">
    Analyze the frequency of words in your text
  </p>
</div>

// ✅ Usar responsividade adequadamente
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>

// ✅ Estados e interatividade
<button
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
             disabled:bg-gray-400 disabled:cursor-not-allowed transition"
  disabled={isLoading}
>
  Analyze
</button>
```

### **Organização de Código**

```typescript
// ✅ Order em componentes React
// 1. Imports
// 2. Type definitions
// 3. Component definition
// 4. Hooks
// 5. Event handlers
// 6. Effects
// 7. Render/JSX

export const MyComponent: React.FC<Props> = (props) => {
  // Hooks
  const [state, setState] = useState('');
  
  // Event handlers
  const handleChange = (value: string) => {
    setState(value);
  };
  
  // Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // Render
  return <div>{state}</div>;
};
```

### **Funções Utilitárias**

```typescript
// ✅ Funções puras, testáveis
export const tokenizeText = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0);
};

// ✅ Documentação para funções complexas
/**
 * Processa texto para análise de frequência
 * - Remove pontuação
 * - Converte para lowercase
 * - Remove palavras vazias
 */
export const processText = (text: string, removeStopWords = true): string[] => {
  // implementation
};

// ✅ Consistência com tipos
interface WordFrequency {
  word: string;
  count: number;
  percentage?: number;
}
```

### **Comments**

- ✅ Comments **apenas** para o WHY (não o WHAT)
- ✅ Evitar comments óbvios
- ✅ Manter comments atualizados

```typescript
// ✅ Bom: explica a razão
const WAIT_TIME = 300; // Debounce: permite que o usuário termine de digitar

// ❌ Ruim: apenas repete o código
const x = 5; // Seta x para 5
```

### **Commits**

- Use prefixos: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- Mensagens claras em inglês
- Exemplo: `feat: add word frequency table component`

### **ESLint & Prettier** (quando adicionado)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

---

## 📌 Notas Importantes

1. **Client-side only:** Toda processamento happens no navegador (sem backend necessário)
2. **Sem persistência obrigatória:** localStorage opcional para histórico (Fase 4)
3. **Performance:** Não há limite real em processamento de texto (2048 chars é rápido)
4. **Acessibilidade:** Manter foco em labels, keyboard navigation, ARIA quando necessário
5. **Testes:** Priorizar funções de processamento (puras) sobre componentes

---

**Versão:** 1.0  
**Último atualizado:** 2026-05-01  
**Status:** Em Planejamento (pronto para Fase 1)
