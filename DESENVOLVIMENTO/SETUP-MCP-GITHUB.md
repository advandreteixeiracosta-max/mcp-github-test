# 🚀 Setup da Integração MCP GitHub

## Status Atual ✅
- ✅ Repositório Git inicializado
- ✅ GitHub MCP habilitado em `.claude/settings.json`
- ✅ GITHUB_COPILOT_TOKEN configurado
- ⏳ Personal Access Token (PAT) pendente

## Passo 1: Gerar GitHub Personal Access Token

1. Acesse: **https://github.com/settings/tokens/new**
2. Configure:
   - **Token name**: `mcp-github-test`
   - **Expiration**: 30 dias (ou conforme necessário)
   - **Scopes**: Marque:
     - ✓ `repo` (acesso completo a repositórios)
     - ✓ `gist` (para gerenciar gists)
     - ✓ `workflow` (para gerenciar workflows)
3. Clique em **Generate token**
4. **Copie e guarde o token** (nunca será mostrado novamente)

## Passo 2: Configurar o Token

### Opção A: Variável de Ambiente (Recomendado)

```powershell
# No PowerShell
$env:GH_TOKEN = "seu_token_aqui"

# Ou permanentemente (user)
[Environment]::SetEnvironmentVariable("GH_TOKEN", "seu_token", "User")

# Verificar
echo $env:GH_TOKEN
```

### Opção B: Configurar em `.claude/settings.json`

```json
{
  "env": {
    "GH_TOKEN": "seu_token_aqui",
    "GITHUB_COPILOT_TOKEN": "$GITHUB_COPILOT_TOKEN"
  },
  "enabledMcpjsonServers": ["github"]
}
```

⚠️ **Não commite tokens em git!** Use `.env` ou variáveis de ambiente.

## Passo 3: Criar Repositório no GitHub

### Via CLI (após configurar token)
```bash
gh repo create mcp-github-test \
  --public \
  --source=. \
  --remote=origin \
  --push
```

### Via Web UI
1. Vá para **https://github.com/new**
2. **Repository name**: `mcp-github-test`
3. **Description**: `Teste de integração MCP GitHub`
4. **Public** (para testes)
5. Clique em **Create repository**
6. Faça push local:
   ```bash
   git remote add origin https://github.com/advandreteixeiracosta-max/mcp-github-test.git
   git branch -M main
   git push -u origin main
   ```

## Passo 4: Testar Integração

```bash
# Executar testes
node test-mcp-github-integration.js

# Ou testar manualmente
gh repo list
gh issue list
gh pr list
```

## Funcionalidades Disponíveis com MCP GitHub

Após configurar o token, você pode:

### 📋 Issues
```bash
gh issue list
gh issue create --title "Título" --body "Descrição"
gh issue view <número>
gh issue close <número>
```

### 🔀 Pull Requests
```bash
gh pr list
gh pr create --title "Título" --body "Descrição"
gh pr review <número>
gh pr merge <número>
```

### 💾 Repositório
```bash
gh repo list
gh repo view
gh repo clone <repositório>
gh repo fork <repositório>
```

### 🏷️ Releases
```bash
gh release list
gh release create v1.0.0 --notes "Notas da release"
```

### 🔔 Workflows
```bash
gh workflow list
gh workflow run <workflow-name>
gh run list
```

## Troubleshooting

### ❌ Token não reconhecido
```bash
# Verificar token
gh auth status

# Re-autenticar
gh auth logout
gh auth login
```

### ❌ Repositório não encontrado
```bash
# Verificar remotes
git remote -v

# Adicionar remote
git remote add origin https://github.com/USER/REPO.git
```

### ❌ Permissões insuficientes
- Verifique se o token tem escopo `repo`
- Regenere o token com permissões corretas

## Referências

- 📚 [Documentação GitHub CLI](https://cli.github.com/manual)
- 🔑 [GitHub Tokens](https://github.com/settings/tokens)
- 🤖 [Claude Code + GitHub](https://claude.ai/docs)
- 📡 [Model Context Protocol (MCP)](https://modelcontextprotocol.io)

---

## Próximos Passos

1. ✅ Gerar GitHub PAT
2. ✅ Configurar `GH_TOKEN`
3. ✅ Criar repositório no GitHub
4. ✅ Fazer push do código
5. ✅ Testar com `node test-mcp-github-integration.js`
6. ✅ Usar MCP no Claude Code para gerenciar repositório

**Após completar esses passos, você terá integração total entre Claude Code (local) ↔ GitHub (web)!**
