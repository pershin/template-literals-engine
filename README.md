# Template literals engine

## Installation

```bash
$ npm install template-literals-engine
```

## Example

### index.js

```js
const View = require('template-literals-engine');

var view = new View();

view.assign('title', 'Template literals engine');
view.assign('content', 'test');

console.log(view.render('index.html'));
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
  </head>
  <body>
    <div>${content}</div>
    ${include('footer.html')}
  </body>
</html>
```

### footer.html

```html
<footer>
  &copy; 2019
</footer>
```

### Output
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Template literals engine</title>
  </head>
  <body>
    <div>test</div>
    <footer>
      &copy; 2019
    </footer>
  </body>
</html>
```

## License

  [MIT](LICENSE)
