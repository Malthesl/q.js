# q.js

q.js includes multiple DOM tools, mainly the q() method for creating DOM Elements.

Let's start off with an example of what q.js can be used for:

```js
products.forEach(product => {
  productContainer.q('.product')
    .q('img.product-image', {src: product.thumb})
    .s('.product-brand', {text: product.brand})
    .s('.product-name', {text: product.name})
    .s('.product-description', {text: product.description})
    .s('button.add-to-basket', {text: 'Add to basket', onclick() { addItemToBasket(product.itemId) });
});
```

would result in something like this ->

```html
<div id="products">
  <div class="product">
    <img src="/i/product.png">
    <div class="product-brand">CoolProducts™</div>
    <div class="product-name">The Cool Product</div>
    <div class="product-description">A really f***ing awesome cool product</div>
    <button class="product-description">Add to basket</button>
  </div>
  ...
</div>
```

# *a short* Documentation

Here a short guide to q(), and q.js' other prototypes:

### q(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Create a HTMLElement from a selector.

#### `selector`:

A CSS Like Selector

Supports:
- IDs: `#id`
- Classes: `.class`
- Empty Attributes: `:attribute`
- Attributes: `[attribute=value]`
- *Text: `"text"`

#### `blueprint`:

An object assigned to the HTMLElement's DOM.

Aliases:
- text, content -> innerText
- html -> innerHTML
- css -> style

You can also use *blueprint*.children (or .c alias), which is an array containing HTMLElements to append as children to the element after it's creation.

### HTMLElement.q(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a child to a HTMLElement, generated from a selector.

### HTMLElement.s(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a sibling to a HTMLElement, generated from a selector.

### HTMLElement.p(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a parent sibling to a HTMLElement, generated from a selector.
