export const defaultGames = [
  {
    id: "test-1",
    title: "test 1",
    description: "People Playground interactive physics ragdoll sandbox simulation.",
    category: "Action",
    iframeCode: '<iframe id="game-frame" src="/Hosted/activities/playable/people-playground/index.html" loading="lazy" style="width:100%; border:0; height:clamp(300px, calc(100vh - 220px), 610px);" allowfullscreen="" sandbox="allow-scripts allow-popups allow-same-origin allow-pointer-lock allow-forms"></iframe>',
    iframeSrc: "/Hosted/activities/playable/people-playground/index.html",
    thumbnailGradient: "from-rose-600 to-slate-950",
    iconName: "Flame",
    controls: [
      "Left Click & Drag: Grab & Toss Ragdolls & Props",
      "Spawn Buttons / Toolbar: Add Ragdolls, Wooden Crates & TNT Barrels",
      "Laser Blaster / Right Click: Trigger Explosive Blast",
      "Spacebar: Toggle Slow Motion Physics",
      "C Key: Clear All / R Key: Reset Sandbox"
    ],
    featured: true,
    plays: 1250,
    rating: 4.9,
    releaseYear: 2024,
    tags: ["Sandbox", "Physics", "Ragdoll", "People Playground", "Action"]
  },
  {
    id: "snake-retro",
    title: "Retro Snake",
    description: "Classic arcade snake game. Eat the red apples, grow longer, avoid walls and your own tail!",
    category: "Arcade",
    iframeCode: '<iframe src="/games/snake.html" title="Retro Snake" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/snake.html",
    thumbnailGradient: "from-emerald-500 to-teal-800",
    iconName: "Gamepad2",
    controls: [
      "Arrow Keys / WASD: Move Snake",
      "Spacebar: Pause Game"
    ],
    featured: true,
    plays: 1420,
    rating: 4.8,
    releaseYear: 1997,
    tags: ["Classic", "Arcade", "Retro", "Fast-Paced"]
  },
  {
    id: "2048-classic",
    title: "2048",
    description: "Swipe, slide and merge matching number tiles to reach the legendary 2048 tile!",
    category: "Puzzle",
    iframeCode: '<iframe src="/games/2048.html" title="2048 Classic" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/2048.html",
    thumbnailGradient: "from-amber-500 to-orange-700",
    iconName: "Grid3X3",
    controls: [
      "Arrow Keys / WASD: Slide Tiles",
      "Touch Swipe on Mobile",
      "Undo Button: Revert last move"
    ],
    featured: true,
    plays: 2840,
    rating: 4.9,
    releaseYear: 2014,
    tags: ["Numbers", "Brain", "Logic", "Strategy"]
  },
  {
    id: "tetris-retro",
    title: "Tetris Block Fall",
    description: "Rotate and drop falling geometric blocks to clear horizontal lines before the grid fills up.",
    category: "Retro",
    iframeCode: '<iframe src="/games/tetris.html" title="Tetris Retro" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/tetris.html",
    thumbnailGradient: "from-cyan-500 to-blue-800",
    iconName: "Boxes",
    controls: [
      "Left / Right: Move block",
      "Up Arrow / W: Rotate block",
      "Down Arrow: Soft drop",
      "Spacebar: Hard drop instantly"
    ],
    featured: true,
    plays: 3950,
    rating: 4.9,
    releaseYear: 1984,
    tags: ["Retro", "Classic", "Puzzle", "Legend"]
  },
  {
    id: "pong-neon",
    title: "Neon Pong",
    description: "High-velocity neon paddle duel. Play against smart CPU difficulty or challenge a friend in 2-player local mode.",
    category: "Sports",
    iframeCode: '<iframe src="/games/pong.html" title="Neon Pong" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/pong.html",
    thumbnailGradient: "from-pink-500 to-indigo-800",
    iconName: "Swords",
    controls: [
      "Player 1: W / S or Mouse",
      "Player 2 (2P Mode): Arrow Up / Down",
      "Select CPU or 2-Player mode at top"
    ],
    featured: true,
    plays: 1820,
    rating: 4.7,
    releaseYear: 1972,
    tags: ["Sports", "2-Player", "Arcade", "Neon"]
  },
  {
    id: "flappy-bird-classic",
    title: "Flappy Bird",
    description: "Guide the little flying bird safely between perilous green pipe obstacles without crashing.",
    category: "Casual",
    iframeCode: '<iframe src="/games/flappy.html" title="Flappy Bird" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/flappy.html",
    thumbnailGradient: "from-yellow-400 to-emerald-700",
    iconName: "Flame",
    controls: [
      "Spacebar / Click / Tap: Flap wings"
    ],
    featured: true,
    plays: 5120,
    rating: 4.8,
    releaseYear: 2013,
    tags: ["Casual", "Addictive", "High Score", "One-Touch"]
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    description: "Defend Earth against descending waves of cosmic alien invaders before they reach your ship.",
    category: "Action",
    iframeCode: '<iframe src="/games/space-invaders.html" title="Space Invaders" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/space-invaders.html",
    thumbnailGradient: "from-purple-600 to-slate-900",
    iconName: "Rocket",
    controls: [
      "Left / Right Arrow or A / D: Move Ship",
      "Spacebar: Fire Plasma Laser"
    ],
    featured: true,
    plays: 2210,
    rating: 4.8,
    releaseYear: 1978,
    tags: ["Shooter", "Action", "Space", "Retro"]
  },
  {
    id: "neon-breakout",
    title: "Neon Breakout",
    description: "Bounce the sphere off your paddle to shatter colorful brick barriers and clear each stage.",
    category: "Arcade",
    iframeCode: '<iframe src="/games/breakout.html" title="Neon Breakout" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/breakout.html",
    thumbnailGradient: "from-blue-500 to-violet-800",
    iconName: "Layers",
    controls: [
      "Mouse / Arrow Keys: Move Paddle",
      "Click: Restart after game over"
    ],
    featured: false,
    plays: 1640,
    rating: 4.6,
    releaseYear: 1976,
    tags: ["Arcade", "Bricks", "Physics", "Retro"]
  },
  {
    id: "dino-runner",
    title: "Dino Runner",
    description: "Endless prehistoric desert jumping action. Hop over cacti hurdles as speed relentlessly ramps up.",
    category: "Casual",
    iframeCode: '<iframe src="/games/dino.html" title="Dino Runner" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/dino.html",
    thumbnailGradient: "from-lime-500 to-emerald-900",
    iconName: "Zap",
    controls: [
      "Spacebar / Up Arrow / Tap: Jump"
    ],
    featured: false,
    plays: 3100,
    rating: 4.7,
    releaseYear: 2014,
    tags: ["Endless Runner", "Offline", "Speed"]
  },
  {
    id: "minesweeper-classic",
    title: "Minesweeper",
    description: "Deduce hidden bomb coordinates across the minefield using surrounding numerical clues.",
    category: "Puzzle",
    iframeCode: '<iframe src="/games/minesweeper.html" title="Minesweeper Classic" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/minesweeper.html",
    thumbnailGradient: "from-slate-600 to-zinc-900",
    iconName: "Bomb",
    controls: [
      "Left Click: Uncover tile",
      "Right Click / Long Press: Place/Remove Flag"
    ],
    featured: false,
    plays: 1980,
    rating: 4.6,
    releaseYear: 1989,
    tags: ["Puzzle", "Logic", "Strategy", "Classic"]
  },
  {
    id: "connect-4",
    title: "Connect 4",
    description: "Drop colored discs into the vertical grid. Connect four of your chips horizontally, vertically, or diagonally.",
    category: "Strategy",
    iframeCode: '<iframe src="/games/connect4.html" title="Connect 4" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/connect4.html",
    thumbnailGradient: "from-red-500 to-yellow-600",
    iconName: "CircleDot",
    controls: [
      "Click any column to drop your chip",
      "Reset button to start a fresh match"
    ],
    featured: false,
    plays: 1490,
    rating: 4.7,
    releaseYear: 1974,
    tags: ["Tabletop", "Strategy", "2-Player", "Board Game"]
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Test and exercise your memory by flipping and pairing identical arcade glyphs and emojis.",
    category: "Casual",
    iframeCode: '<iframe src="/games/memory.html" title="Memory Match" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/memory.html",
    thumbnailGradient: "from-purple-500 to-pink-700",
    iconName: "Sparkles",
    controls: [
      "Click cards to reveal their icon and match pairs"
    ],
    featured: false,
    plays: 1120,
    rating: 4.5,
    releaseYear: 2000,
    tags: ["Memory", "Brain", "Cards", "Casual"]
  },
  {
    id: "word-guess",
    title: "Word Guess",
    description: "Guess the hidden 5-letter word in 6 tries. Green is correct spot, yellow is in word, gray is absent.",
    category: "Puzzle",
    iframeCode: '<iframe src="/games/word-guess.html" title="Word Guess" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    iframeSrc: "/games/word-guess.html",
    thumbnailGradient: "from-emerald-600 to-cyan-800",
    iconName: "SpellCheck",
    controls: [
      "Keyboard / On-screen keys to type letters",
      "Enter to submit, Backspace to delete"
    ],
    featured: false,
    plays: 2350,
    rating: 4.8,
    releaseYear: 2021,
    tags: ["Wordle", "Words", "Puzzle", "Daily"]
  }
];
