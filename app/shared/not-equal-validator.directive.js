"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NotEqualValidator = /** @class */ (function () {
    function NotEqualValidator(validateNotEqual) {
        this.validateNotEqual = validateNotEqual;
    }
    NotEqualValidator_1 = NotEqualValidator;
    NotEqualValidator.prototype.validate = function (c) {
        var v = c.value;
        var t = c.root.get(this.validateNotEqual).value;
        if (t && v === t) {
            return {
                validateNotEqual: false
            };
        }
        return null;
    };
    NotEqualValidator = NotEqualValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateNotEqual][formControlName],[validateNotEqual][formControl],[validateNotEqual][ngModel]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return NotEqualValidator_1; }), multi: true }
            ]
        }),
        __param(0, core_1.Attribute('validateNotEqual')),
        __metadata("design:paramtypes", [String])
    ], NotEqualValidator);
    return NotEqualValidator;
    var NotEqualValidator_1;
}());
exports.NotEqualValidator = NotEqualValidator;
//# sourceMappingURL=not-equal-validator.directive.js.map