(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('brace'), require('brace/theme/monokai'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'brace', 'brace/theme/monokai', '@angular/forms'], factory) :
    (global = global || self, factory(global['ngx-ace-editor-wrapper'] = {}, global.ng.core, null, null, global.ng.forms));
}(this, (function (exports, i0, brace, monokai, forms) { 'use strict';

    class AceEditorDirective {
        constructor(elementRef, zone) {
            this.zone = zone;
            this.textChanged = new i0.EventEmitter();
            this.textChange = new i0.EventEmitter();
            this._options = {};
            this._readOnly = false;
            this._theme = "monokai";
            this._mode = "html";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            this._text = "";
            let el = elementRef.nativeElement;
            this.zone.runOutsideAngular(() => {
                this.editor = ace["edit"](el);
            });
            this.editor.$blockScrolling = Infinity;
        }
        ngOnInit() {
            this.init();
            this.initEvents();
        }
        ngOnDestroy() {
            this.editor.destroy();
        }
        init() {
            this.editor.setOptions(this._options || {});
            this.editor.setTheme(`ace/theme/${this._theme}`);
            this.setMode(this._mode);
            this.editor.setReadOnly(this._readOnly);
        }
        initEvents() {
            this.editor.on('change', () => this.updateText());
            this.editor.on('paste', () => this.updateText());
        }
        updateText() {
            let newVal = this.editor.getValue();
            if (newVal === this.oldText) {
                return;
            }
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.zone.run(() => {
                    this.textChange.emit(newVal);
                    this.textChanged.emit(newVal);
                });
            }
            else {
                if (this.timeoutSaving != null) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(() => {
                    this._text = newVal;
                    this.zone.run(() => {
                        this.textChange.emit(newVal);
                        this.textChanged.emit(newVal);
                    });
                    this.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
            this.oldText = newVal;
        }
        set options(options) {
            this._options = options;
            this.editor.setOptions(options || {});
        }
        set readOnly(readOnly) {
            this._readOnly = readOnly;
            this.editor.setReadOnly(readOnly);
        }
        set theme(theme) {
            this._theme = theme;
            this.editor.setTheme(`ace/theme/${theme}`);
        }
        set mode(mode) {
            this.setMode(mode);
        }
        setMode(mode) {
            this._mode = mode;
            if (typeof this._mode === 'object') {
                this.editor.getSession().setMode(this._mode);
            }
            else {
                this.editor.getSession().setMode(`ace/mode/${this._mode}`);
            }
        }
        get text() {
            return this._text;
        }
        set text(text) {
            this.setText(text);
        }
        setText(text) {
            if (this._text !== text) {
                if (text === null || text === undefined) {
                    text = "";
                }
                if (this._autoUpdateContent === true) {
                    this._text = text;
                    this.editor.setValue(text);
                    this.editor.clearSelection();
                }
            }
        }
        set autoUpdateContent(status) {
            this._autoUpdateContent = status;
        }
        set durationBeforeCallback(num) {
            this.setDurationBeforeCallback(num);
        }
        setDurationBeforeCallback(num) {
            this._durationBeforeCallback = num;
        }
        get aceEditor() {
            return this.editor;
        }
    }
    AceEditorDirective.ɵfac = function AceEditorDirective_Factory(t) { return new (t || AceEditorDirective)(i0["ɵɵdirectiveInject"](i0.ElementRef), i0["ɵɵdirectiveInject"](i0.NgZone)); };
    AceEditorDirective.ɵdir = /*@__PURE__*/ i0["ɵɵdefineDirective"]({ type: AceEditorDirective, selectors: [["", "ace-editor", ""]], inputs: { options: "options", readOnly: "readOnly", theme: "theme", mode: "mode", text: "text", autoUpdateContent: "autoUpdateContent", durationBeforeCallback: "durationBeforeCallback" }, outputs: { textChanged: "textChanged", textChange: "textChange" } });
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0["ɵsetClassMetadata"](AceEditorDirective, [{
            type: i0.Directive,
            args: [{
                    selector: '[ace-editor]'
                }]
        }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, { textChanged: [{
                type: i0.Output
            }], textChange: [{
                type: i0.Output
            }], options: [{
                type: i0.Input
            }], readOnly: [{
                type: i0.Input
            }], theme: [{
                type: i0.Input
            }], mode: [{
                type: i0.Input
            }], text: [{
                type: i0.Input
            }], autoUpdateContent: [{
                type: i0.Input
            }], durationBeforeCallback: [{
                type: i0.Input
            }] }); })();

    class AceEditorComponent {
        constructor(elementRef, zone) {
            this.zone = zone;
            this.textChanged = new i0.EventEmitter();
            this.textChange = new i0.EventEmitter();
            this.style = {};
            this._options = {};
            this._readOnly = false;
            this._theme = "monokai";
            this._mode = "html";
            this._autoUpdateContent = true;
            this._durationBeforeCallback = 0;
            this._text = "";
            this._onChange = (_) => {
            };
            let el = elementRef.nativeElement;
            this.zone.runOutsideAngular(() => {
                this._editor = ace['edit'](el);
            });
            this._editor.$blockScrolling = Infinity;
        }
        ngOnInit() {
            this.init();
            this.initEvents();
        }
        ngOnDestroy() {
            this._editor.destroy();
        }
        init() {
            this.setOptions(this._options || {});
            this.setTheme(this._theme);
            this.setMode(this._mode);
            this.setReadOnly(this._readOnly);
        }
        initEvents() {
            this._editor.on('change', () => this.updateText());
            this._editor.on('paste', () => this.updateText());
        }
        updateText() {
            let newVal = this._editor.getValue();
            if (newVal === this.oldText) {
                return;
            }
            if (!this._durationBeforeCallback) {
                this._text = newVal;
                this.zone.run(() => {
                    this.textChange.emit(newVal);
                    this.textChanged.emit(newVal);
                });
                this._onChange(newVal);
            }
            else {
                if (this.timeoutSaving) {
                    clearTimeout(this.timeoutSaving);
                }
                this.timeoutSaving = setTimeout(() => {
                    this._text = newVal;
                    this.zone.run(() => {
                        this.textChange.emit(newVal);
                        this.textChanged.emit(newVal);
                    });
                    this.timeoutSaving = null;
                }, this._durationBeforeCallback);
            }
            this.oldText = newVal;
        }
        set options(options) {
            this.setOptions(options);
        }
        setOptions(options) {
            this._options = options;
            this._editor.setOptions(options || {});
        }
        set readOnly(readOnly) {
            this.setReadOnly(readOnly);
        }
        setReadOnly(readOnly) {
            this._readOnly = readOnly;
            this._editor.setReadOnly(readOnly);
        }
        set theme(theme) {
            this.setTheme(theme);
        }
        setTheme(theme) {
            this._theme = theme;
            this._editor.setTheme(`ace/theme/${theme}`);
        }
        set mode(mode) {
            this.setMode(mode);
        }
        setMode(mode) {
            this._mode = mode;
            if (typeof this._mode === 'object') {
                this._editor.getSession().setMode(this._mode);
            }
            else {
                this._editor.getSession().setMode(`ace/mode/${this._mode}`);
            }
        }
        get value() {
            return this.text;
        }
        set value(value) {
            this.setText(value);
        }
        writeValue(value) {
            this.setText(value);
        }
        registerOnChange(fn) {
            this._onChange = fn;
        }
        registerOnTouched(fn) { }
        get text() {
            return this._text;
        }
        set text(text) {
            this.setText(text);
        }
        setText(text) {
            if (text === null || text === undefined) {
                text = "";
            }
            if (this._text !== text && this._autoUpdateContent === true) {
                this._text = text;
                this._editor.setValue(text);
                this._onChange(text);
                this._editor.clearSelection();
            }
        }
        set autoUpdateContent(status) {
            this.setAutoUpdateContent(status);
        }
        setAutoUpdateContent(status) {
            this._autoUpdateContent = status;
        }
        set durationBeforeCallback(num) {
            this.setDurationBeforeCallback(num);
        }
        setDurationBeforeCallback(num) {
            this._durationBeforeCallback = num;
        }
        getEditor() {
            return this._editor;
        }
    }
    AceEditorComponent.ɵfac = function AceEditorComponent_Factory(t) { return new (t || AceEditorComponent)(i0["ɵɵdirectiveInject"](i0.ElementRef), i0["ɵɵdirectiveInject"](i0.NgZone)); };
    AceEditorComponent.ɵcmp = /*@__PURE__*/ i0["ɵɵdefineComponent"]({ type: AceEditorComponent, selectors: [["ace-editor"]], inputs: { style: "style", options: "options", readOnly: "readOnly", theme: "theme", mode: "mode", value: "value", text: "text", autoUpdateContent: "autoUpdateContent", durationBeforeCallback: "durationBeforeCallback" }, outputs: { textChanged: "textChanged", textChange: "textChange" }, features: [i0["ɵɵProvidersFeature"]([{
                    provide: forms.NG_VALUE_ACCESSOR,
                    useExisting: i0.forwardRef(() => AceEditorComponent),
                    multi: true
                }])], decls: 0, vars: 0, template: function AceEditorComponent_Template(rf, ctx) { }, styles: ["[_nghost-%COMP%] { display:block;width:100%; }"] });
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0["ɵsetClassMetadata"](AceEditorComponent, [{
            type: i0.Component,
            args: [{
                    selector: 'ace-editor',
                    template: '',
                    styles: [':host { display:block;width:100%; }'],
                    providers: [{
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: i0.forwardRef(() => AceEditorComponent),
                            multi: true
                        }]
                }]
        }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, { textChanged: [{
                type: i0.Output
            }], textChange: [{
                type: i0.Output
            }], style: [{
                type: i0.Input
            }], options: [{
                type: i0.Input
            }], readOnly: [{
                type: i0.Input
            }], theme: [{
                type: i0.Input
            }], mode: [{
                type: i0.Input
            }], value: [{
                type: i0.Input
            }], text: [{
                type: i0.Input
            }], autoUpdateContent: [{
                type: i0.Input
            }], durationBeforeCallback: [{
                type: i0.Input
            }] }); })();

    const list = [
        AceEditorComponent,
        AceEditorDirective
    ];
    class AceEditorModule {
    }
    AceEditorModule.ɵfac = function AceEditorModule_Factory(t) { return new (t || AceEditorModule)(); };
    AceEditorModule.ɵmod = /*@__PURE__*/ i0["ɵɵdefineNgModule"]({ type: AceEditorModule });
    AceEditorModule.ɵinj = /*@__PURE__*/ i0["ɵɵdefineInjector"]({ providers: [], imports: [[]] });
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0["ɵsetClassMetadata"](AceEditorModule, [{
            type: i0.NgModule,
            args: [{
                    declarations: [
                        ...list
                    ],
                    imports: [],
                    providers: [],
                    exports: list
                }]
        }], null, null); })();
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0["ɵɵsetNgModuleScope"](AceEditorModule, { declarations: [AceEditorComponent,
            AceEditorDirective], exports: [AceEditorComponent,
            AceEditorDirective] }); })();

    exports.AceEditorComponent = AceEditorComponent;
    exports.AceEditorDirective = AceEditorDirective;
    exports.AceEditorModule = AceEditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-ace-editor-wrapper.umd.js.map
