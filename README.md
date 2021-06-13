<h1 align="center">Cron Expression Input</h1>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/JossyDevers/transpiler-js/blob/master/LICENSE) 
[![GitHub Release](https://img.shields.io/github/v/release/jossydevers/transpiler-js)]()

## Description

<p><strong>Cron Expression UI</strong>: Input component to generate cron expressions easily and intuitively, as in https://crontab.guru/</p>

### Examples
<div>
  <img src="https://i.ibb.co/xL2pHG9/cron-expression-input-1-0-2.png" alt="cron-expression-input" border="0">
  <img src="https://i.ibb.co/nD7CK4W/cron-expression-input-modal-1-0-2.png" alt="cron-expression-input-modal" border="0">
</div>

<h2 align="center">Instructions</h2>

### NPM

Install the package from https://www.npmjs.com/cron-expression-input
```
npm install cron-expression-input@1.3.1
```
In your code
``` javascript
import "cron-expression-input/lib/cron-expression-input.min.css"; /* CSS */
import "cron-expression-input/lib/cultures/en-US.js"; /* Languague (Optional) */
require("cron-expression-input"); /* JAVASCRIPT */
```

### CDN

Add the CDN to your project
``` html
<link rel="stylesheet" href="https://unpkg.com/cron-expression-input@1.3.1/lib/cron-expression-input.min.css">
<script src="https://unpkg.com/cron-expression-input@1.3.1/lib/cultures/en-US.js"></script> <!-- Languague (Optional) -->
<script src="https://unpkg.com/cron-expression-input@1.3.1/lib/cron-expression-input.min.js"></script>
```

### Usage

<h4>Use in html</h4>

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <link rel="stylesheet" href="https://unpkg.com/cron-expression-input@1.3.1/lib/cron-expression-input.min.css">
    <script src="https://unpkg.com/cron-expression-input@1.3.1/lib/cultures/en-US.js"></script> <!-- Languague (Optional) -->
    <script src="https://unpkg.com/cron-expression-input@1.3.1/lib/cron-expression-input.min.js"></script>
</head>
<body>
     <!-- Component -->
     <form> 
      <cron-expression-input
        height="34px" width="250px" color="d58512"
        required="false" hotValidate="true"
        value="* * * * *"
      ></cron-expression-input>
      <input type="submit" value="Send Form" style="margin-top: 20px;" />
    </form>
    <!-- Component -->
</body>
</html>
```

<h4>Use in React</h4>

```javascript
import "cron-expression-input/lib/cron-expression-input.min.css"; /* CSS */
import "cron-expression-input/lib/cultures/en-US.js"; /* Languague (Optional) */
require("cron-expression-input"); /* JAVASCRIPT */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cron: "* * * * *" };
  }

  render() {
    return (
      <div>
        <cron-expression-input
          value={this.state.cron}
          onInput={(e) => this.setState({ cron: e.nativeEvent.detail.value })}
          color="d58512"
          value={this.state.cron}
          required={true}
          hotValidate={true}
         />
      </div>
    );
  }
}

export default App;
```

<h4>Use in Vue</h4>

```javascript
<template>
  <div id="app">
    <cron-expression-input
      :value="cron"
      v-on:input="cron = $event.detail.value"
      color="d58512" 
      :required="true"
      :hotValidate="true"
     />
  </div>
</template>

<script>
import "cron-expression-input/lib/cron-expression-input.min.css"; /* CSS */
import "cron-expression-input/lib/cultures/en-US.js"; /* Languague (Optional) */
require("cron-expression-input"); /* JAVASCRIPT */

export default {
  name: 'App',
  data() {
    return {
      cron: "* * * * *"
    }
  }
}
</script>
```

<h2 align="center">Component Attributes</h2>

You can pass various attributes to the component to modify its behavior, Example with color attribute: <cron-expression-input color="#d58512"></cron-expression-input>

|Name|Type|Default Value|Description|
|:--:|:--:|:-----------:|:----------|
|**`width`**|`{String}`|`100%`|The width of the component input|
|**`height`**|`{String}`|`34px`|The height of the component input|
|**`color`**|`{String}`|`#d58512`|The main color that the component elements will take, (Only in hexadecimal)|
|**`value`**|`{String}`|`* * * * *`|Allow to set a default value on the component|
|**`required`**|`{Boolean}`|`false`|Allow component to ship empty in a form|
|**`hotValidate`**|`{Boolean}`|`false`|Enable validation while writing the component, if it is set to false, it will only be validated when the submit event is performed within a form|

<h2 align="center">Languagues</h2>

```
import "cron-expression-input/lib/cultures/en-EN.js";
<script src="https://unpkg.com/cron-expression-input@1.3.1/lib/cultures/en-US.js"></script>
```

<ul>
  <li>en-US (English)</li>
  <li>es-Es (Spanish - Español)</li>
  <li>zh-CN (中文 - Chinese)</li>
</ul>

<h3 align="center">Thanks</h3>

* [@TheCloudConnectors](https://github.com/TheCloudConnectors), For your npm package to validate the structure of a cron expression [cron-validator](https://github.com/TheCloudConnectors/cron-validator).
* [@bamotav](https://github.com/bamotav), For the idea of ​​creating this web component.
