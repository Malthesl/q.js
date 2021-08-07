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
- Text: `"text"` (Avoid using this as it might be removed in the future. For any kind of user input, (or text that isn't hardcoded), please use the text property instead to avoid security problems)

#### `blueprint`:

An object assigned to the HTMLElement's DOM Object.

Aliases:
- text, content -> innerText
- html -> innerHTML
- css -> style

**Adding children with blueprint object**

You can also use *blueprint*.children (or .c alias), which is an array containing HTMLElements to append as children to the element after it's creation.

The example above would look something like this, and is much easier to read if you have many children with children:

```js
products.forEach(product => {
  productContainer.q('.product', {children: [
    q('img.product-image', {src: product.thumb}),
    q('.product-brand', {text: product.brand}),
    q('.product-name', {text: product.name}),
    q('.product-description', {text: product.description}),
    q('button.add-to-basket', {text: 'Add to basket', onclick() { addItemToBasket(product.itemId) }),
  ]});
});
```

### HTMLElement.q(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a child to a HTMLElement, generated from a selector.

### HTMLElement.s(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a sibling to a HTMLElement, generated from a selector.

### HTMLElement.p(*string* selector, *optional: object* blueprint)

*returns `HTMLElement`*

Append a parent sibling to a HTMLElement, generated from a selector.

### Feedback

Find bugs or weird behavior? Just create an issue.

This is also my first time writing a documentation, so any feedback on that is appreciated.
