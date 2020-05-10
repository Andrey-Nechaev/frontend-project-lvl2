import _ from 'lodash';

const shift = '    '; // Единица сдвига

const calculateOffset = (deep) => shift.repeat(deep);

/*
Функция проеобразующая объект в строку
  value - Тип любой. Отрисовываемое значение
  currentDeep - Number. Текущая глубина

  return - Любое тип
*/
const stringify = (value, currentDeep) => {
  const offset = calculateOffset(currentDeep); // Отступ с учетом текущей глубины
  const childrenOffset = calculateOffset(currentDeep + 1);
  if (_.isObject(value)) {
    // 1. Преобразуем объект в массив ключей _.keys(value),
    const keys = _.keys(value);

    // 2. Перебираем массив и заменяем каждый ключ на отрендеренную строку
    const mappedAray = keys.map((key) => `${childrenOffset}    ${[key]}: ${stringify(value[key], currentDeep + 1)}`);

    // 3. Объеденяем все строки массива в одну строку и оборачиваем её в {}
    return `{\n${mappedAray.join('\n')}\n${offset}    }`;
  }
  return value;
};

/*
Функция принимает массив отличий и текущую глубину дерева.
Перебирает каждый элемент массива, запуская на них функцию diffToString.
Затем соединяет все элементы массива в единую строку через разделитель '\n'.
  diffs - []. Массив отличий
  currentDeep - Number. Текущая глубина дерева

  return - String
*/
const arrayToString = (diffs, deep = 0) => {
  /* ************************************************
  Функция преобразует единичный объект diff в строку
    diff - {}. Одно отличие
    currentDeep - Number. Текущая глубина дерева

    return - String
  ************************************************* */
  const diffToString = (diff, currentDeep) => {
    const { name, value, oldValue, newValue, children } = diff;
    const offset = calculateOffset(currentDeep); // Отступ с учетом текущей глубины
    if (diff.type === 'inner') {
      return `${offset}    ${name}: {\n${arrayToString(children, currentDeep + 1)}\n${offset}    }`;
    }
    if (diff.type === 'unchanged') {
      return `${offset}    ${name}: ${stringify(value, currentDeep)}`;
    }
    if (diff.type === 'changed') {
      return `${offset}  - ${name}: ${stringify(oldValue, currentDeep)}\n${offset}  + ${name}: ${stringify(newValue, currentDeep)}`;
    }
    if (diff.type === 'removed') {
      return `${offset}  - ${name}: ${stringify(value, currentDeep)}`;
    }
    return `${offset}  + ${name}: ${stringify(value, currentDeep)}`;
  };

  return `${diffs.map((diff) => diffToString(diff, deep)).join('\n')}`;
};

const stylishRender = (diffs) => {
  if (diffs.length === 0) return '';
  return `{\n${arrayToString(diffs)}\n}`;
};

export default stylishRender;
