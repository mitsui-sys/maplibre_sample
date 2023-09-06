const txt = "Hello,World";
const dataSet = [
  {
    title: "top",
    uri: "/top",
    description: "このwebサイトのTOPページ",
    tags: ["website"],
  },
  {
    title: "about",
    uri: "/about",
    description: "このwebサイトの説明",
    tags: ["about"],
  },
  {
    title: "blog",
    uri: "/blog",
    description: "ブログ一覧",
    tags: ["article"],
  }
];

const addControl = (map,control) => {
  map.addControl(control);
};

export default {
  txt,
  addControl
};

const createElement = ({ tagName, children }) => {
  const element = document.createElement(tagName);
  if (children) {
    element.appendChild(children);
  }
  return element;
}

const createFragment = ({ children }) => {
  const fragment = document.createDocumentFragment()
  children.forEach(child => {
    fragment.appendChild(child);
  });
  return fragment;
}

const createMenuItem = (props) => {
  const anchor = createElement({ tagName: "a" });  
  anchor.text = props.anchor.text;
  anchor.href = props.anchor.href;
  return createElement({ tagName: "li", children: anchor });
}

const createMenu = (props) => {
  const menuItems = props.items.map(createMenuItem);
  return createElement({ tagName: "ul", children: createFragment(menuItems) });
}

const generateMenuProps = (dataSet, baseUrl) => {
  const items = dataSet.map(param => {
    return {
      anchor: {
        text: param.title,
        href: baseUrl + param.uri,
      },
    };
  });
  return { items };
}

const menuProps = generateMenuProps(dataSet, "https://example.com");

createMenu(menuProps);



