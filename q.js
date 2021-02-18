/**
 *   Q.JS  v1.2
 *   By Malthe Laursen
 *   mtsl.dk
 *   ---
 *   Documentation at mtsl.dk/q   (Site not available yet!)
 */
function q(query, blueprint) {
  if (!blueprint) blueprint = {};

  if (typeof query === 'object') {
    blueprint = query;
    query = '';
  }

  let x = {index: 0, input: query ? query.trimLeft() : 'div'};

  let start = x.input.match(/[.#\[:"]/);
  let el = document.createElement(
    blueprint.tag ||
    (!start
      ? x.input.trim()
      : start.index === 0
        ? 'div'
        : x.input.substring(0, start.index))
  );

  let i = 0;
  while (i++ < 10000) {
    if (i === 10000)
      console.warn('Q.JS Stuck in loop with input: "' + query + '"');
    let start = x.input.substring(x.index).match(/[.#\[:"]/);
    if (!start) break;

    let mode = x.input[x.index + start.index],
      value,
      end;

    switch (mode) {
      case '[':
        end = x.input.substring(x.index + start.index + 1).match(/]/);
        value = x.input
          .substring(x.index + start.index + 1)
          .substring(0, end.index);
        end.index += 1;
        break;
      case '"':
        end = x.input
          .substring(x.index + start.index + 1)
          .match(/(?<!\/|\\)(?:\/\/|\\\\)*"/);
        value = x.input
          .substring(x.index + start.index + 1)
          .substring(0, end.index)
          .replace(/\/(?!\/)/g, '')
          .replace(/\\(?!\\)/g, '');
        end.index += 1;
        break;
      default:
        end = x.input.substring(x.index + start.index + 1).match(/[.#\[:"]/);
        value = x.input
          .substring(x.index + start.index + 1)
          .substring(0, end ? end.index : x.input.length);
        break;
    }
    switch (mode) {
      // Classes
      case '.':
        el.classList.add(value);
        break;
      // ID
      case '#':
        el.id = value;
        break;
      // Attribute
      case '[':
        value = value.substring(0, value.length).split('=');
        el.setAttribute(value[0], value[1] || true);
        break;
      // Empty Attribute like :disabled
      case ':':
        el.setAttribute(value, '');
        break;
      // Inner Text
      case '"':
        el.innerText = value;
        break;
    }

    if (!end) break;
    x.index += start.index + end.index + 1;
  }

  if (typeof blueprint === 'object') {
    let tba = Object.assign({}, blueprint);
    delete tba.style;
    delete tba.css;
    delete tba.children;
    delete tba.c;
    delete tba.text;
    delete tba.content;
    delete tba.innerText;
    delete tba.html;
    delete tba.innerHTML;

    if ((content = blueprint.text || blueprint.content || blueprint.innerText))
      el.innerText = content;
    if ((content = blueprint.html || blueprint.innerHTML))
      el.innerHTML = content;

    Object.assign(el, tba);

    if (blueprint.style || blueprint.css)
      Object.assign(el.style, blueprint.style || blueprint.css);

    let children = blueprint.children || blueprint.c;
    if (children)
      for (let i = 0; i < children.length; i++) el.appendChild(children[i]);
  }

  return el;
}

// Add as child
HTMLElement.prototype.q = function (query, o) {
  let el = q(query, o);
  this.appendChild(el);
  return el;
};

HTMLElement.prototype.s = function (query, o) {
// Add as sibling
  let el = q(query, o);
  this.parentElement.appendChild(el);
  return el;
};

// Add as parent's sibling
HTMLElement.prototype.p = function (query, o) {
  let el = q(query, o);
  this.parentElement.parentElement.appendChild(el);
  return el;
};