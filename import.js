const helloworld = "Hello,World";
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

function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                console.error("エラーレスポンス", response);
            } else {
                return response.json().then(userInfo => {
                    // HTMLの組み立て
                    const view = escapeHTML`
                    <h4>${userInfo.name} (@${userInfo.login})</h4>
                    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
                    <dl>
                        <dt>Location</dt>
                        <dd>${userInfo.location}</dd>
                        <dt>Repositories</dt>
                        <dd>${userInfo.public_repos}</dd>
                    </dl>
                    `;
                    // HTMLの挿入
                    const result = document.getElementById("result");
                    result.innerHTML = view;
                });
            }
        }).catch(error => {
            console.error(error);
        });
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}



