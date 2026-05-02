# Guia de Troubleshooting - Setup do Projeto

Se você encontrar problemas ao instalar as dependências no Windows, aqui estão as soluções:

## Problema 1: Erros de Permissão ao Instalar npm packages

### Solução A (Recomendada - Windows)
```bash
# 1. Abra PowerShell como Administrator
# 2. Navegue até o diretório do projeto
cd "o:\Meu Drive\PROJETO - IA\TREINAMENTO\World_fre"

# 3. Limpe o cache
npm cache clean --force

# 4. Delete node_modules e package-lock.json
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 5. Instale com --force
npm install --force --legacy-peer-deps
```

### Solução B - Usar Yarn em vez de npm
```bash
# Instale yarn globalmente
npm install -g yarn

# No diretório do projeto
yarn install
yarn dev
```

### Solução C - Instalação Minimal
Se os problemas persistirem, instale apenas dependências essenciais:
```bash
npm install --legacy-peer-deps --no-optional react react-dom
npm install --legacy-peer-deps --no-optional -D @vitejs/plugin-react typescript vite
npm install --legacy-peer-deps --no-optional -D tailwindcss postcss autoprefixer
```

## Problema 2: 'vite' não é reconhecido como comando

### Solução:
```bash
# Use npx diretamente
npx vite

# Ou use o caminho completo
node_modules\.bin\vite
```

## Problema 3: TypeScript errors ao iniciar dev server

### Solução:
```bash
# Compile TypeScript primeiro
npx tsc --noEmit

# Depois inicie o dev
npm run dev
```

## Problema 4: Porta 5173 já está em uso

### Solução - Mudar porta:
```bash
# Edite vite.config.ts:
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Mude para outra porta
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

# Depois
npm run dev
```

## Problema 5: Falta de espaço em disco ou permissões de arquivo

### Solução:
```bash
# Tente usar WSL2 (Windows Subsystem for Linux) em vez de PowerShell nativo
# Ou configure npm para diretório diferente:
npm config set prefix "C:\npm-global"
npm config set cache "C:\npm-cache"
```

---

## ✅ Checklist para Setup Bem-Sucedido

- [ ] Node.js 16+ instalado (`node -v`)
- [ ] npm 8+ instalado (`npm -v`)
- [ ] PowerShell com permissões de Administrator
- [ ] Sem programas antivírus bloqueando npm
- [ ] Pelo menos 1GB de espaço em disco
- [ ] Sem espaços unicode no path (Windows)

---

## Se Nada Funcionar

### Opção 1: Recriar projeto do zero
```bash
# Delete tudo
rm -r o:\Meu\ Drive\PROJETO\ -\ IA\TREINAMENTO\World_fre\*

# Crie novo com create-vite
npm create vite@latest world-fre -- --template react-ts

# Copie os arquivos src/, tests/, types/ do backup
```

### Opção 2: Usar container Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

```bash
docker build -t word-frequency .
docker run -p 5173:5173 word-frequency
```

---

## Verificação de Saúde do Projeto

Execute este comando para verificar se tudo está OK:

```bash
# Verifica node_modules
ls node_modules | wc -l

# Verifica se vite existe
npm list vite

# Testa TypeScript
npx tsc --noEmit

# Testa build
npm run build

# Testa desenvolvimento
npm run dev
```

---

**Última atualização**: 2026-05-01
