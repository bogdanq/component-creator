// от бека приходит голый штмл, необходимо его
// преобразовать к дереву, с которым можно работать
export const createTreeFromHTMLContent = (html) => {
  const tree = [];
  const parser = new DOMParser();

  const htmlDoc = parser.parseFromString(html, "text/html");

  const elements = [...htmlDoc.querySelectorAll("[data-component-id]")];

  elements.forEach((element) => {
    const data = {};
    const id = element.getAttribute("data-component-id");
    const type = element.getAttribute("type");

    // общая обертка для елемента
    const area = element.querySelector(".content-area");

    // если нет текста, значит там картинка
    const content = area.innerHTML.trim().replace(/\n/g, "");
    const imgSrc = area.src;

    // инлайн стили ширина и высота
    const styles = element
      .getAttribute("style")
      .split(";")
      .reduce((acc, style) => {
        const [key, value] = style.split(":");

        acc[key.trim()] = parseFloat(value.trim());

        return acc;
      }, {});

    // стили позиции в обертке транзишн
    const [x, y] = element.parentNode.getAttribute("style").match(/\-?\d+/g);

    data.id = id;
    data.type = type;
    data.content = content || imgSrc;
    data.attributes = {
      disabled: false,
      style: {
        ...styles,
        width: parseFloat(styles.width),
        height: parseFloat(styles.height),
        x,
        y,
      },
      data: {},
    };

    tree.push(data);
  });

  return tree;
};

// тут можно не делать, смысла нет, можно
// забрать контент на сервер прямо из дома и удалить contentEditable
export const createHTMLContentFromTree = (content) => {};
