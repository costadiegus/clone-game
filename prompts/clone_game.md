## Prompt de Desenvolvimento: Clone de "Fireboy & Watergirl: Forest Temple" com Editor de Fases
**Objetivo:** Desenvolver um jogo de plataforma puzzle cooperativo para navegador, recriando fielmente as mecânicas de "Fireboy & Watergirl: Forest Temple". O projeto deve incluir o jogo base e um Editor de Fases robusto.
### 1. Mecânicas de Jogo (Fidelidade ao Original)
 * **Personagens:**
   * **Fireboy:** Movimentado pelas **Setas**. Imune a poças de lava (vermelhas). Morre instantaneamente ao tocar em água (azul).
   * **Watergirl:** Movimentada por **A, W, D**. Imune a poças de água (azuis). Morre instantaneamente ao tocar em lava (vermelha).
   * **Vulnerabilidade Comum:** Ambos morrem instantaneamente ao tocar em poças de **Lama Tóxica (Verde)**.
 * **Interativos:**
   * **Botões:** Ativam plataformas ou barreiras enquanto um personagem (ou caixa) estiver em cima.
   * **Alavancas:** Alternam o estado de plataformas ou barreiras (ligado/desligado) e mantêm a posição após o acionamento.
   * **Caixas de Empurrar:** Devem ter física para serem movidas pelos personagens e usadas para manter botões pressionados ou alcançar locais altos.
   * **Diamantes:** Diamantes Vermelhos (coletáveis apenas pelo Fireboy) e Diamantes Azuis (coletáveis apenas pela Watergirl).
 * **Condição de Vitória:** Ambos devem chegar às suas respectivas portas de saída (**Porta com Símbolo de Marte/Fogo** e **Porta com Símbolo de Vênus/Água**). O nível só termina quando ambos estiverem posicionados simultaneamente em frente às suas portas corretas.
### 2. Especificações Técnicas
 * **Engine:** Phaser 3 (Arcade Physics).
 * **Resolução:** Fixa (ex: 800x600) para garantir a precisão do level design.
 * **Sistema de Colisão:** Implementar collision groups específicos. O Fireboy deve ignorar colisão com o "chão de lava", mas detectar "overlap" mortal com "chão de água". O inverso para a Watergirl. Ambos colidem com o "chão de lama".
### 3. Editor de Fases (Funcionalidades)
 * **Grid System:** Interface de grade para posicionamento preciso de tiles.
 * **Paleta de Itens:**
   * Blocos de colisão (paredes/chão).
   * Hazard Tiles (Lava, Água, Lama).
   * Entidades (Botão, Alavanca, Caixa, Diamante).
   * Pontos de Spawn (Fireboy, Watergirl).
   * Saídas (Porta Fogo, Porta Água).
 * **Lógica de Link:** No editor, deve ser possível "conectar" visualmente um Botão/Alavanca a uma Plataforma ou Porta específica para definir qual mecanismo aciona qual objeto.
 * **Exportação:** Gerar um arquivo JSON limpo que descreva a posição (x, y) de cada tile e as propriedades de conexão dos mecanismos.
### 4. Estrutura de Código Sugerida
 * Player.js: Classe estendida de Phaser.Physics.Arcade.Sprite com lógica de imunidade elemental.
 * Interactable.js: Classe base para botões e alavancas.
 * LevelScene.js: Capaz de interpretar o JSON e instanciar os objetos dinamicamente.
 * StorageManager.js: Manipulação de localStorage para salvar o progresso (mapa-múndi) e as fases customizadas do usuário.
### 5. Instruções de Implementação para a IA
 1. Comece criando o **Motor de Colisão Elemental**. O teste de sucesso é: Fireboy atravessa lava, mas reinicia o nível ao encostar em um único pixel de água.
 2. Implemente a **Lógica Cooperativa**: Portas que só abrem se um personagem estiver segurando um botão para o outro passar.
 3. Crie o **Editor**: Priorize a função de "Salvar" e "Carregar" via JSON no console primeiro, depois adicione a interface visual (UI).
 4. O **Mapa-Múndi** deve ser uma árvore de progressão; o nível 2 só abre se o nível 1 for concluído.