import moment from 'moment';

export const analyze = (text) => {
  const greetings = ['oi', 'olá', 'hey', 'hi', 'hello'];
  const end = ['bye', 'obrigada', 'obrigado'];
  const endVerify = text.toLowerCase();
  const textVerify = text.toLowerCase();

  if (greetings.includes(textVerify)) {
    return 'Olá, como posso te ajudar?';
  } else if (text.includes('data')) {
    return moment().format('DD MMMM YYYY');
  } else if (text.includes('hora')) {
    return moment().format('h:mm:ss a');
  } else if (text.includes('google link')) {
    return 'https://google.com';
  } else if (text.includes('interest')) {
    return 'Bank interest rate is 8.7';
  } else if (end.includes(endVerify)) {
    return 'Obrigada por nos contactar! Tenha um bom dia!';
  }

  return `Sinto muito, mas não tenho informações sobre isso. Recomendo entrar em contato com nossa equipe de suporte para obter assistência personalizada.`;
};
