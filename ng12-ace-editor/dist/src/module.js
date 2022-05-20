import { NgModule } from "@angular/core";
import { AceEditorComponent } from "./component";
import { AceEditorDirective } from "./directive";
import * as i0 from "@angular/core";
const list = [
    AceEditorComponent,
    AceEditorDirective
];
export class AceEditorModule {
}
AceEditorModule.ɵfac = function AceEditorModule_Factory(t) { return new (t || AceEditorModule)(); };
AceEditorModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AceEditorModule });
AceEditorModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [], imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AceEditorModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ...list
                ],
                imports: [],
                providers: [],
                exports: list
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AceEditorModule, { declarations: [AceEditorComponent,
        AceEditorDirective], exports: [AceEditorComponent,
        AceEditorDirective] }); })();
//# sourceMappingURL=module.js.map