# Dashboard de Estoque - PurpleStock

Um dashboard moderno e responsivo para gerenciamento de estoque, construído com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Funcionalidades

- **Visão Geral**: Estatísticas principais do estoque
- **Itens com Estoque Baixo**: Alertas para itens que precisam de reposição
- **Transações Recentes**: Histórico das últimas movimentações
- **Lista de Itens**: Visualização completa do inventário
- **Design Responsivo**: Interface adaptável para desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **PostgreSQL** - Banco de dados
- **Lucide React** - Ícones

## 📊 Dados Exibidos

### Estatísticas Principais
- Total de itens no estoque
- Número de localizações
- Total de transações
- Itens com estoque baixo
- Valor total do inventário

### Informações dos Itens
- Nome, SKU e código de barras
- Custo e preço de venda
- Estoque atual e mínimo
- Localização
- Status do estoque (Normal, Atenção, Baixo)

### Transações
- Tipo de transação (Entrada, Saída, Ajuste, Movimentação, Contagem)
- Quantidade movimentada
- Data e hora
- Observações

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env.local` na raiz do projeto com:
   ```env
   DATABASE_URL=postgres://username:password@host:port/database
   ```

3. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Abrir no navegador**:
   ```
   http://localhost:3000
   ```

## 🗄️ Banco de Dados

O dashboard se conecta a um banco PostgreSQL com as seguintes tabelas principais:

- `items` - Produtos do estoque
- `locations` - Localizações físicas
- `stock_transactions` - Movimentações de estoque
- `teams` - Equipes/empresas
- `users` - Usuários do sistema

## 📱 Interface

O dashboard possui uma interface limpa e moderna com:

- **Cards de Estatísticas**: Métricas principais em destaque
- **Tabelas Responsivas**: Dados organizados de forma clara
- **Badges de Status**: Indicadores visuais para diferentes estados
- **Layout Adaptativo**: Funciona em diferentes tamanhos de tela

## 🔧 Configuração

O projeto utiliza variáveis de ambiente para configuração do banco de dados. A conexão está configurada em `src/lib/db.ts` e utiliza a variável `DATABASE_URL` do arquivo `.env.local`.

## 📈 Próximos Passos

- Adicionar filtros e busca
- Implementar gráficos e relatórios
- Adicionar funcionalidade de exportação
- Implementar notificações em tempo real