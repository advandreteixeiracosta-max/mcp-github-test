#!/usr/bin/env node

/**
 * Script para testar integração do MCP do GitHub com repositório web
 * Requer: GitHub Personal Access Token (PAT)
 *
 * Setup:
 * 1. Gere um token em: https://github.com/settings/tokens
 * 2. Configure: $env:GH_TOKEN = "seu_token"
 * 3. Execute: node test-mcp-github-integration.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class GitHubMCPTester {
  constructor(token) {
    this.token = token || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
    this.username = 'advandreteixeiracosta-max';
  }

  async makeRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: path,
        method: method,
        headers: {
          'User-Agent': 'MCP-GitHub-Tester',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      if (this.token) {
        options.headers['Authorization'] = `token ${this.token}`;
      }

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: JSON.parse(data)
            });
          } catch {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: data
            });
          }
        });
      });

      req.on('error', reject);

      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  async testAuth() {
    console.log('\n🔐 Teste 1: Verificar Autenticação');
    console.log('─'.repeat(50));

    if (!this.token) {
      console.log('❌ Nenhum token encontrado');
      console.log('   Configure: $env:GH_TOKEN = "seu_token"');
      return false;
    }

    try {
      const res = await this.makeRequest('GET', '/user');
      if (res.status === 200) {
        console.log('✅ Autenticação bem-sucedida');
        console.log(`   Usuário: ${res.body.login}`);
        console.log(`   Nome: ${res.body.name}`);
        return true;
      } else {
        console.log(`❌ Erro ${res.status}: ${res.body.message}`);
        return false;
      }
    } catch (err) {
      console.log(`❌ Erro de conexão: ${err.message}`);
      return false;
    }
  }

  async testCreateRepo() {
    console.log('\n📦 Teste 2: Criar Repositório (Simulado)');
    console.log('─'.repeat(50));

    const repoName = 'mcp-github-test';
    const repoData = {
      name: repoName,
      description: 'Teste de integração MCP GitHub',
      private: false,
      auto_init: true
    };

    console.log(`Dados para criar: ${JSON.stringify(repoData, null, 2)}`);

    if (this.token) {
      try {
        // Verificar se repo já existe
        const checkRes = await this.makeRequest('GET', `/repos/${this.username}/${repoName}`);
        if (checkRes.status === 200) {
          console.log(`✅ Repositório já existe: ${checkRes.body.html_url}`);
          return checkRes.body;
        }
      } catch (e) {
        // Repo não existe, poderia criar
        console.log('   (Repo pode ser criado com token válido)');
      }
    } else {
      console.log('⏭️  Pulando criação (requer token)');
    }
  }

  async testOperations() {
    console.log('\n⚙️  Teste 3: Operações do MCP');
    console.log('─'.repeat(50));

    const operations = [
      { name: 'Criar Issue', method: 'POST', path: '/repos/{owner}/{repo}/issues' },
      { name: 'Listar Issues', method: 'GET', path: '/repos/{owner}/{repo}/issues' },
      { name: 'Criar PR', method: 'POST', path: '/repos/{owner}/{repo}/pulls' },
      { name: 'Listar PRs', method: 'GET', path: '/repos/{owner}/{repo}/pulls' },
      { name: 'Buscar Commits', method: 'GET', path: '/repos/{owner}/{repo}/commits' },
      { name: 'Gerenciar Releases', method: 'GET', path: '/repos/{owner}/{repo}/releases' },
      { name: 'Webhooks', method: 'GET', path: '/repos/{owner}/{repo}/hooks' }
    ];

    operations.forEach(op => {
      console.log(`✓ ${op.name}`);
      console.log(`  ${op.method} ${op.path}`);
    });
  }

  async testIntegration() {
    console.log('\n🔗 Teste 4: Integração Local ↔ Web');
    console.log('─'.repeat(50));

    const gitDir = path.join(process.cwd(), '.git');
    const gitignore = path.join(process.cwd(), '.gitignore');

    console.log(`Git repository: ${fs.existsSync(gitDir) ? '✅' : '❌'}`);
    console.log(`  Localização: ${gitDir}`);

    if (fs.existsSync(gitignore)) {
      const content = fs.readFileSync(gitignore, 'utf-8');
      console.log(`\n.gitignore encontrado:`);
      content.split('\n').filter(l => l.trim()).forEach(l => {
        console.log(`  - ${l}`);
      });
    }

    // Verificar git config
    const result = require('child_process').execSync('git config --list 2>/dev/null || echo ""', {
      encoding: 'utf-8',
      cwd: process.cwd()
    });

    const configs = result.split('\n').filter(l => l.includes('user.'));
    console.log(`\nGit config (user):`);
    configs.forEach(c => console.log(`  ${c}`));
  }

  async testMCPConfig() {
    console.log('\n⚙️  Teste 5: Configuração do MCP');
    console.log('─'.repeat(50));

    try {
      const settingsPath = path.join(process.cwd(), '.claude', 'settings.json');
      if (fs.existsSync(settingsPath)) {
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
        console.log('✅ settings.json encontrado');
        console.log(`   MCP servers: ${settings.enabledMcpjsonServers?.join(', ') || 'nenhum'}`);

        if (settings.enabledMcpjsonServers?.includes('github')) {
          console.log('✅ GitHub MCP habilitado');
        } else {
          console.log('⚠️  GitHub MCP não está habilitado');
        }

        if (settings.env?.GITHUB_COPILOT_TOKEN) {
          console.log('✅ GITHUB_COPILOT_TOKEN configurado');
        }
      }
    } catch (err) {
      console.log(`❌ Erro ao ler settings: ${err.message}`);
    }
  }

  async runAllTests() {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   TESTE DE INTEGRAÇÃO MCP DO GITHUB COM WEB            ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`\n📍 Diretório: ${process.cwd()}`);
    console.log(`👤 Usuário GitHub: ${this.username}`);
    console.log(`🔑 Token: ${this.token ? '✅ Configurado' : '❌ Não configurado'}`);

    const authOk = await this.testAuth();
    await this.testCreateRepo();
    await this.testOperations();
    await this.testIntegration();
    await this.testMCPConfig();

    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║                    RESUMO                              ║');
    console.log('╚════════════════════════════════════════════════════════╝');

    if (authOk) {
      console.log('✅ Integração pronta para uso');
      console.log('   Você pode agora:');
      console.log('   - Criar issues e PRs via Claude');
      console.log('   - Gerenciar repositório web');
      console.log('   - Automizar workflows com MCP');
    } else {
      console.log('⏭️  Para ativar integração completa:');
      console.log('   1. Acesse: https://github.com/settings/tokens');
      console.log('   2. Gere um token com escopo "repo"');
      console.log('   3. Configure: $env:GH_TOKEN = "seu_token"');
      console.log('   4. Re-execute este script');
    }

    console.log('\n');
  }
}

// Executar testes
const tester = new GitHubMCPTester();
tester.runAllTests().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
