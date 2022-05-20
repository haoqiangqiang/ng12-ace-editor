# ng12-ace-editor

Ace editor integration with typescript for angular 12.
**To use Angular 4 install version 0.3.1 OF ng2-ace-editor (npm i -S ng2-ace-editor).**

## use
- This module is to solve the problem of the project which use ng2-ace-editor has update to angular 12, the ng2-ace-editor can't pass Ivy. You can just install ng12-ace-editor and replace ```import { AceEditorModule } from 'ng2-ace-editor'``` with ```import { AceEditorModule } from 'ng12-ace-editor'```, and others code don't need change.

- 该包是为了解决使用 ng2-ace-editor 的 angular 项目升级到 angular 12 之后 ng2-ace-editor 无法经过 Ivy 编译报错的问题。你只需要重新安装 ng12-ace-editor 之后，然后将导入时的 ```import { AceEditorModule } from 'ng2-ace-editor'``` 替换成 ```import { AceEditorModule } from 'ng12-ace-editor'``` 即可，其他代码无需改动，若有其他问题，欢迎在 https://github.com/haoqiangqiang/ng12-ace-editor/issues 中留言。


# Install
`npm i -S ng12-ace-editor`

##### Load the module for your app:

```javascript
import { AceEditorModule } from 'ng12-ace-editor';

@NgModule({
  ...
  imports: [
    ...
    AceEditorModule
  ]
})
```

# Use directive

> Minimal

```js

import { Component } from '@angular/core';

@Component({
  template: `
  <div ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
       ></div>
  `
})
export class MyComponent {
    text:string = "";
}
```

> Complete

```js
import { Component } from '@angular/core';

@Component({
  template: `
  <div ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
       [mode]="'sql'" //string or object (thx ckiffel)
       [theme]="'eclipse'"
       [options]="options"
       [readOnly]="false"
       [autoUpdateContent]="true" //change content when [text] change
       [durationBeforeCallback]="1000" //wait 1s before callback 'textChanged' sends new value
       (textChanged)="onChange($event)"
       style="min-height: 200px; width:100%; overflow: auto;"></div>
  `
})
export class MyComponent {
    text:string = "";
    options:any = {maxLines: 1000, printMargin: false};
    
    onChange(code) {
        console.log("new code", code);
    }
}
```

# Use Component

```js
import {Component, ViewChild} from '@angular/core';

//to use theme eclipse
//with angular-cli add "../node_modules/ace-builds/src-min/ace.js" 
//and "../node_modules/ace-builds/src-min/theme-eclipse.js" to "scripts" var into the file angular-cli.json

@Component({
    template: `
  <ace-editor
       [(text)]="text" // possible two way binding (thx ChrisProlls)
        #editor style="height:150px;"></ace-editor>
  `
})
export class AceCmp {
    @ViewChild('editor') editor;
    text: string = "";

    ngAfterViewInit() {
        this.editor.setTheme("eclipse");

        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {

            }
        })
    }
}
```
