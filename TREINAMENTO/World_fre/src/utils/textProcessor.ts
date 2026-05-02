const STOP_WORDS = new Set([
  'a', 'à', 'ao', 'aos', 'as', 'até',
  'com', 'como', 'contra', 'contigo',
  'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'demais', 'dentro', 'depois', 'desde', 'despois', 'dessa', 'desse', 'desta', 'deste', 'do', 'dos',
  'e', 'é', 'é', 'ela', 'elas', 'ele', 'eles', 'em', 'embora', 'enquanto', 'entre', 'era', 'eram', 'essa', 'essas', 'esse', 'esses', 'esta', 'estamos', 'estando', 'estão', 'estará', 'estaremos', 'estaria', 'estaríamos', 'estarias', 'estaria', 'estás', 'estasse', 'estásseis', 'estássemos', 'estaste', 'estastes', 'estástes', 'estaste', 'estas', 'este', 'estes', 'esteve', 'esteve', 'esteves', 'estevestes', 'estevemos', 'esteveremos', 'estevéramos', 'esteveríamos', 'esteveríeis', 'estevereis', 'esteveremos', 'esteveras', 'estevéreis', 'estevereis', 'estevemos', 'esteveremos', 'estevésseis', 'estevéssemos', 'estou', 'estou', 'eu',
  'foi', 'fomos', 'for', 'fora', 'foram', 'forem', 'foréis', 'foreis', 'fores', 'fosse', 'fôsse', 'fosseis', 'fôsseis', 'fôssemos', 'fossemos', 'foste', 'fôste',
  'há', 'haja', 'hajamos', 'hajam', 'hajas', 'hão', 'haveiamos', 'haveríamos', 'haveria', 'haveriam', 'haverá', 'haverão', 'havereis', 'haveremos', 'haverei', 'havereíamos', 'haveríeis', 'haveremos', 'haverias', 'haveres', 'haverá', 'haverão', 'havereis', 'haveremos', 'haverei', 'havemos', 'havendo', 'havendes', 'haverá', 'haverão',
  'houve', 'houvemos', 'houvera', 'houvéramos', 'houvéreis', 'houvéreis', 'houverei', 'houvera', 'houveras', 'houvéramos', 'houvéreis', 'houvésseis', 'houvéssemos', 'houveste', 'houvestes', 'houvestes',
  'isto', 'isso',
  'já', 'lhe', 'lhes', 'lo', 'los',
  'me', 'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'muitos', 'muita', 'muitas',
  'não', 'na', 'nada', 'nas', 'naquele', 'naquela', 'naqueles', 'naquelas', 'naquilo', 'nem', 'nenhum', 'nenhuma', 'nenhuns', 'nenhumas', 'neste', 'nesta', 'nestes', 'nestas', 'nesta', 'nela', 'nelas', 'nele', 'neles', 'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa', 'numas', 'nums', 'nunca',
  'o', 'os', 'ou', 'outra', 'outras', 'outro', 'outros', 'onde',
  'para', 'parece', 'parte', 'partir', 'pelo', 'pelos', 'pela', 'pelas', 'pequeno', 'pequena', 'pequenos', 'pequenas', 'pelo', 'pelos', 'pela', 'pelas',
  'pessoa', 'pessoas', 'pode', 'podem', 'podeis', 'podemos', 'podia', 'podiam', 'podias', 'podemos',
  'possa', 'possam', 'possamos', 'posso', 'por', 'porque', 'porquê', 'possivelmente',
  'primeira', 'primeiras', 'primeiro', 'primeiros',
  'própria', 'próprias', 'próprio', 'próprios', 'próxima', 'próximas', 'próximo', 'próximos',
  'pude', 'pudemos', 'pudéra', 'pudéramos', 'pudésseis', 'pudéssemos', 'pudesteis', 'pudestes',
  'que', 'qual', 'quais', 'qualidade', 'qualidades', 'qualquer', 'qualqueres', 'quando', 'quandi', 'quantia', 'quanto', 'quantos', 'quanta', 'quantas', 'quem',
  'se', 'segunda', 'segundo', 'seguinte', 'sei', 'seis', 'sem', 'semelhante', 'semelhantes', 'semelhança', 'semelhava',
  'senão', 'sendo', 'senhor', 'senhora', 'senores', 'senhores', 'senhoras', 'sentido', 'sentidos',
  'sequer', 'será', 'serã', 'serão', 'serâ', 'sereis', 'serem', 'seremos', 'serenidade', 'seria', 'seríamos', 'seriam', 'serias',
  'sério', 'sérios', 'seria', 'sério', 'sérios', 'seu', 'seus', 'seção', 'seções',
  'só', 'somente', 'sobre', 'sobrinho', 'sobrinha', 'sobrinhos', 'sobrinhas',
  'sua', 'suas', 'sujeito', 'sujeitos', 'supostamente',
  'tal', 'também', 'tampouco', 'tanta', 'tantas', 'tanto', 'tantos', 'te', 'tem', 'temática', 'temático', 'temáticos', 'temáticas',
  'temos', 'têm', 'tendo', 'tenha', 'tenham', 'tenhamos', 'tenho', 'tenho', 'tens', 'tensão', 'tensões',
  'terceira', 'terceiras', 'terceiro', 'terceiros', 'terei', 'tereis', 'terem', 'teremos', 'teria', 'teríamos', 'teriam', 'terias',
  'teu', 'teus', 'ti', 'tia', 'tias', 'tipo', 'tipos',
  'toda', 'todas', 'todo', 'todos', 'toma', 'tomada', 'tomadas', 'tomado', 'tomados', 'tomador', 'tomadores',
  'trabalhador', 'trabalhadoras', 'trabalhadora', 'trabalhadoras', 'trabalho', 'trabalhos',
  'três', 'tu', 'tua', 'tuas', 'tudo'
]);

export const tokenizeText = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0);
};

export const removeStopWords = (words: string[]): string[] => {
  return words.filter(word => !STOP_WORDS.has(word));
};

export const removePunctuation = (word: string): string => {
  return word.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '').trim();
};

export const processText = (text: string, filterStopWords = false): string[] => {
  let words = tokenizeText(text);

  words = words
    .map(removePunctuation)
    .filter(word => word.length > 0);

  if (filterStopWords) {
    words = removeStopWords(words);
  }

  return words;
};
