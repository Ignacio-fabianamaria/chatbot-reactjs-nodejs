import moment from 'moment';
import { assistance, ends, greetings, toClose } from './script';

export const analyze = (text) => {
  const lowerText = text.toLowerCase();

  if (greetings.includes(lowerText)) {
    return 'Olá, como posso te ajudar?';
  } else if (text.includes('data')) {
    return moment().format('DD MMMM YYYY');
  } else if (text.includes('hora')) {
    return moment().format('h:mm:ss a');
  } else if (assistance.includes(lowerText)) {
    return 'Você deseja solicitar um empréstimo?\nCondições do empréstimo\nAjuda';
  } else if (text.includes('interest')) {
    return 'A taxa de juros do banco é de 8.7';
  } else if (toClose.includes(lowerText)) {
    return 'Deseja sair?';
  } else if (lowerText === '1' || lowerText === 'encerrar conversa') {
    return 'Obrigada por nos contactar! Tenha um bom dia!';
  } else if (lowerText === '2' || lowerText === 'continuar') {
    return 'Como posso te ajudar?';
  } else if (ends.includes(lowerText)) {
    return 'Posso te ajudar em algo mais?';
  }

  return `Sinto muito, mas não tenho informações sobre isso. Recomendo entrar em contato com nossa equipe de suporte para obter assistência personalizada.`;
};
