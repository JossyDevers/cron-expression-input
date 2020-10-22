<h1 align="center">Cron Expression Input</h1>

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/JossyDevers/transpiler-js/blob/master/LICENSE) 
[![GitHub Release](https://img.shields.io/github/v/release/jossydevers/transpiler-js)]()

## Description

<p>Cron UI: input component to generate cron expressions easily and intuitively, as in https://crontab.guru/</p>

### Examples

<div>
  <img src="https://i.ibb.co/PxRG9Pq/cron-expression-input.png" alt="cron-expression-input" border="0">
  <img src="https://i.ibb.co/pz9T2Pm/cron-expression-input-modal.png" alt="cron-expression-input-modal" border="0">
</div>

<h2 align="center">Instructions</h2>

### NPM

Install the package from https://www.npmjs.com/cron-expression-input
```
npm install cron-expression-input@1.2.2
```
In your code
``` javascript
import "cron-expression-input@1.2.2/cron-expression-input.min.css"; /* CSS */
require("cron-expression-input@1.2.2"); /* JAVASCRIPT */
```

### CDN

Add the CDN to your project
``` html
<link rel="stylesheet" href="https://unpkg.com/cron-expression-input@1.2.2/lib/cron-expression-input.min.css">
<script src="https://unpkg.com/cron-expression-input@1.2.2/lib/cron-expression-input.min.js"></script>
```

### Usage

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <link rel="stylesheet" href="https://unpkg.com/cron-expression-input@1.2.2/lib/cron-expression-input.min.css">
    <script src="https://unpkg.com/cron-expression-input@1.2.2/lib/cron-expression-input.min.js"></script>
</head>
<body>
    <!-- Component -->
    <cron-expression-input color="d58512"></cron-expression-input>
    <!-- Component -->
    <script src="cron-expression-input.js"></script>
</body>
</html>
```

<h2 align="center">Component Attributes</h2>

You can pass various attributes to the component to modify its behavior, Example with color attribute: <cron-expression-input color="#d58512"></cron-expression-input>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`width`**|`{String}`|`100%`|The width of the component input|
|**`height`**|`{String}`|`34px`|The height of the component input|
|**`color`**|`{String}`|`#d58512`|The main color that the component elements will take, (Only in hexadecimal)|

<h3 align="center">Thanks</h3>

* [@TheCloudConnectors](https://github.com/TheCloudConnectors), For your npm package to validate the structure of a cron expression [cron-validator](https://github.com/TheCloudConnectors/cron-validator).
* [@bamotav](https://github.com/bamotav), For the idea of ​​creating this web component.