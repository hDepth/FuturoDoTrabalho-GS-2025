// Centraliza a paleta de cores do app, inspirada nas imagens.
export const Colors = {
    backgroundDark: '#1a1a2e', // Fundo principal escuro
    backgroundLight: '#2a2a4e', // Fundo de cards e elementos
    primary: '#c738fb', // Roxo/magenta principal para botões e destaques
    secondary: '#00ffc3', // Verde/ciano para destaques (ranking)
    text: '#FFFFFF', // Texto principal (branco)
    textSecondary: '#a0a0c0', // Texto secundário (cinza claro)
    error: '#ff4d4d', // Vermelho para erros
    success: '#39e600', // Verde para sucesso
    grey: '#5a5a7e', // Cinza para placeholders ou bordas
  
    // Cores das "gemas"
    gemPink: '#ff40ff',
    gemGreen: '#0bffbc',
    gemBlue: '#00d4ff',
  };
  
  export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  
  export const Typography = {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.text,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.text,
    },
    body: {
      fontSize: 16,
      color: Colors.text,
    },
    caption: {
      fontSize: 14,
      color: Colors.textSecondary,
    },
  };