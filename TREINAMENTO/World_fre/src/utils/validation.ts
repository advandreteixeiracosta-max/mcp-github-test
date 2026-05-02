const MAX_TEXT_LENGTH = 100000;
const MIN_TEXT_LENGTH = 1;

export const validateText = (text: string): { valid: boolean; error?: string } => {
  const trimmed = text.trim();

  if (trimmed.length < MIN_TEXT_LENGTH) {
    return { valid: false, error: 'Por favor, digite algum texto para analisar' };
  }

  if (trimmed.length > MAX_TEXT_LENGTH) {
    return { valid: false, error: `Texto excede o comprimento máximo de ${MAX_TEXT_LENGTH.toLocaleString('pt-BR')} caracteres` };
  }

  return { valid: true };
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
