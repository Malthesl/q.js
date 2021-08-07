/**
 *   Q.JS  v2.0 (Beta 1)
 *   By Malthe Laursen
 *   mtsl.dk
 *   ---
 *   Documentation at mtsl.dk/q   (Site still not available yet, refer to README!)
 */
function q(a, b, c, d, bpo) {
  let query, text, childNodes, blueprint;

  if (Array.isArray(a)) childNodes = a;
  else if (typeof a === 'object') blueprint = a;
  else query = a;

  if (b !== undefined) {
    if (Array.isArray(b)) childNodes = b;
    else if (typeof b === 'object') blueprint = b;
    else if (text === undefined) text = b;
  }

  if (c !== undefined) {
    if (Array.isArray(c)) childNodes = c;
    else if (typeof c === 'object') blueprint = c;
    else if (text === undefined) text = c;
  }

  if (d !== undefined) {
    if (Array.isArray(d)) childNodes = d;
    else if (typeof d === 'object') blueprint = d;
    else if (text === undefined) text = d;
  }

  if (!blueprint) blueprint = {};

  Object.assign(blueprint, bpo);

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
  while (i++ < 1000) {
    if (i === 1000)
      console.warn('Q.JS Stuck in loop with input: "' + query + '"');
    let start = x.input.substring(x.index).match(/[.#\[]/);
    if (!start) break;

    let mode = x.input[x.index + start.index],
      value,
      end;

    if (mode === '[') {
      end = x.input.substring(x.index + start.index + 1).match(/]/);
      value = x.input
        .substring(x.index + start.index + 1)
        .substring(0, end.index);
      end.index += 1;
    }
    else {
      end = x.input.substring(x.index + start.index + 1).match(/[.#\[]/);
      value = x.input
        .substring(x.index + start.index + 1)
        .substring(0, end ? end.index : x.input.length);
    }

    // Classes
    if (mode === '.') el.classList.add(value);
    // ID's
    else if (mode === '#') el.id = value;
    // Attributes
    else if (mode === '[') {
      value = value.substring(0, value.length).split('=');
      el.setAttribute(value[0], value[1] || true);
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
    delete tba.rc;
    delete tba.rac;
    delete tba.rnc;
    delete tba.text;
    delete tba.content;
    delete tba.innerText;
    delete tba.html;
    delete tba.innerHTML;

    let content;
    if ((content = blueprint.html || blueprint.innerHTML))
      el.innerHTML = content;
    else if ((content = text ?? blueprint.text ?? blueprint.content ?? blueprint.innerText) !== undefined)
      el.innerText = content;

    Object.assign(el, tba);

    if (blueprint.style || blueprint.css)
      Object.assign(el.style, blueprint.style || blueprint.css);

    let children = childNodes || blueprint.children || blueprint.c || blueprint.rc || blueprint.rac || blueprint.rnc;
    let returns = [];
    if (children)
      for (let i = 0; i < children.length; i++) {
        if (children[i] instanceof HTMLElement) {
          el.appendChild(children[i]);
          if (children[i].name) returns[children[i].name] = children[i];
          if (children[i].name) el[children[i].name] = children[i];
          if (children[i].returns && blueprint.rc) returns.push(children[i]);
          else if (blueprint.rac || blueprint.rnc) returns.push(children[i]);
        }
        else if (children[i] !== undefined) {
          el.appendChild(new Text(children[i]));
          if (blueprint.rnc) returns.push(children[i]);
        }
      }

    if (returns.length > 0) {
      returns._qOwnParent = el;
      return returns;
    }
  }

  el._qOwnParent = el;
  return el;
}

function qn(n, a, b, c, d) {
  return q(a, b, c, d, {name: n});
}

// Add as child
HTMLElement.prototype.q = function (a, b, c, d) {
  let el = q(a, b, c, d);
  this.appendChild(el._qOwnParent);
  return el;
};

// Add as sibling
HTMLElement.prototype.s = function (a, b, c) {
  let el = q(a, b, c);
  this.parentElement.appendChild(el);
  return el;
};

// Add as parent's sibling
HTMLElement.prototype.p = function (a, b, c, d) {
  let el = q(a, b, c, d);
  this.parentElement.parentElement.appendChild(el);
  return el;
};
