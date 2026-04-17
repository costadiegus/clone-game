# Fireboy & Watergirl - Game Clone

Um clone completo do jogo clássico **Fireboy & Watergirl** desenvolvido com **Phaser 3.55.2**, um framework JavaScript para desenvolvimento de jogos 2D.

## 🎮 Características Principais

### Mecânicas de Jogo

- **Dois Personagens Cooperativos**: Fireboy (vermelho) e Watergirl (azul) que devem trabalhar juntos para completar os níveis
- **Sistema de Imunidade Elemental**: 
  - Fireboy é imune a lava mas morre em água
  - Watergirl é imune a água mas morre em lava
  - Ambos morrem em lama tóxica
- **Física Realista**: Gravidade, colisões e movimento fluido usando o motor de física Arcade do Phaser
- **Plataformas Dinâmicas**: Diferentes tipos de superfícies com propriedades distintas
- **Portas de Saída**: Cada personagem tem sua própria porta que deve alcançar para completar o nível

### Controles

**Fireboy (Vermelho)**
- ⬅️ Seta Esquerda: Mover para esquerda
- ➡️ Seta Direita: Mover para direita
- ⬆️ Seta Acima: Pular

**Watergirl (Azul)**
- A: Mover para esquerda
- D: Mover para direita
- W: Pular

**Navegação**
- ESC: Voltar ao menu anterior

## 🏗️ Estrutura do Projeto

```
fireboy_watergirl_game/
├── index.html          # Arquivo HTML principal
├── game.js             # Lógica principal do jogo
├── package.json        # Dependências do projeto
├── README.md           # Este arquivo
└── dist/               # Arquivos compilados (build)
```

## 🎯 Cenas do Jogo

### 1. MenuScene
A tela inicial do jogo com opções para:
- **PLAY**: Iniciar o jogo
- **EDITOR**: Acessar o editor de fases (em desenvolvimento)

Exibe instruções de controle e informações sobre o jogo.

### 2. LevelScene
A cena principal de gameplay onde:
- Os dois personagens aparecem em posições iniciais
- Plataformas, hazards e portas estão dispostos
- Física e colisões são gerenciadas
- Condição de vitória é verificada quando ambos os personagens alcançam suas respectivas portas

**Elementos do Nível:**
- **Plataformas**: Superfícies sólidas (marrom)
- **Lava**: Hazard laranja (mata Watergirl)
- **Água**: Hazard azul (mata Fireboy)
- **Portas**: Saídas coloridas (vermelha para Fireboy, azul para Watergirl)

### 3. EditorScene
Interface para criar e editar fases customizadas (em desenvolvimento).

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou pnpm

### Instalação

```bash
# Clonar ou acessar o diretório do projeto
cd fireboy_watergirl_game

# Instalar dependências
npm install
# ou
pnpm install
```

### Executar Localmente

#### Opção 1: Servidor HTTP Simples
```bash
# Na raiz do projeto
python3 -m http.server 8000

# Abrir no navegador: http://localhost:8000
```

#### Opção 2: Servidor de Desenvolvimento Vite
```bash
npm run dev
# O servidor estará disponível em http://localhost:5173
```

#### Opção 3: Build e Servir
```bash
npm run build
python3 -m http.server 8000 -d dist
```

## 🛠️ Desenvolvimento

### Estrutura de Código

O jogo é implementado em uma única classe por cena, cada uma estendendo `Phaser.Scene`:

- **MenuScene**: Gerencia a interface do menu
- **LevelScene**: Implementa toda a lógica de gameplay
- **EditorScene**: Interface para edição de níveis

### Principais Funcionalidades

#### Sistema de Colisão
```javascript
// Colisão com plataformas
this.physics.add.collider(this.fireboy, this.platforms);
this.physics.add.collider(this.watergirl, this.platforms);

// Colisão com hazards (sobreposição)
this.physics.add.overlap(this.fireboy, this.hazards, (player, hazard) => {
  if (hazard.hazardType !== 'lava') {
    this.resetLevel();
  }
});
```

#### Sistema de Entrada
```javascript
// Configuração de controles
this.fireboy.keys = {
  left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
  right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
  up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
};
```

#### Condição de Vitória
```javascript
// Verifica se ambos os personagens estão em suas portas
if (this.fireboy.atDoor && this.watergirl.atDoor) {
  this.levelComplete();
}
```

## 📦 Dependências

- **Phaser 3.55.2**: Framework de desenvolvimento de jogos 2D
- **Vite**: Build tool e servidor de desenvolvimento (opcional)
- **React**: Para interface (opcional, não usado na versão atual)

## 🎨 Customização

### Adicionar Novos Níveis

Para adicionar novos níveis, modifique a função `createLevel()` em `LevelScene`:

```javascript
createLevel() {
  // Adicionar plataformas
  const platform = this.add.rectangle(x, y, width, height, color);
  this.physics.add.existing(platform, true);
  this.platforms.add(platform);
  
  // Adicionar hazards
  const hazard = this.add.rectangle(x, y, width, height, color);
  this.physics.add.existing(hazard, true);
  hazard.hazardType = 'lava'; // ou 'water', 'toxic'
  this.hazards.add(hazard);
  
  // Adicionar portas
  const door = this.add.rectangle(x, y, width, height, color);
  this.physics.add.existing(door, true);
  door.doorType = 'fire'; // ou 'water'
  this.doors.add(door);
}
```

### Modificar Cores

As cores são definidas em hexadecimal:
- Fireboy: `0xff6b6b` (vermelho)
- Watergirl: `0x4ecdc4` (azul)
- Lava: `0xff4500` (laranja)
- Água: `0x0099ff` (azul claro)
- Plataforma: `0x8b4513` (marrom)

## 🐛 Troubleshooting

### O jogo não carrega
1. Verifique se o servidor está rodando
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Verifique o console do navegador para erros (F12)

### Os controles não funcionam
1. Certifique-se de que o canvas tem foco (clique nele)
2. Verifique se as teclas estão corretas
3. Teste em outro navegador

### Performance lenta
1. Reduza a qualidade gráfica
2. Feche outras abas do navegador
3. Verifique a utilização de CPU/GPU

## 📝 Roadmap

- [ ] Implementar Editor de Fases completo
- [ ] Adicionar mais níveis
- [ ] Sistema de pontuação
- [ ] Efeitos sonoros e música
- [ ] Animações de personagens
- [ ] Suporte mobile (touch controls)
- [ ] Modo multiplayer online
- [ ] Leaderboard

## 📄 Licença

Este projeto é um clone educacional do jogo Fireboy & Watergirl original.

## 👨‍💻 Autor

Desenvolvido como um clone de referência usando Phaser 3.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
1. Reportar bugs
2. Sugerir novas funcionalidades
3. Enviar pull requests com melhorias

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do Phaser](https://phaser.io/docs)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

---

**Divirta-se jogando Fireboy & Watergirl!** 🎮🔥💧
