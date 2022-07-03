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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const typeorm_1 = require("typeorm");
let Favorite = class Favorite {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'auth_id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "auth_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'post_id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.favorites),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_a = typeof User !== "undefined" && User) === "function" ? _a : Object)
], Favorite.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post, (post) => post.favorites),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", typeof (_b = typeof Post !== "undefined" && Post) === "function" ? _b : Object)
], Favorite.prototype, "post", void 0);
Favorite = __decorate([
    (0, typeorm_1.Entity)()
], Favorite);
exports.Favorite = Favorite;
//# sourceMappingURL=like-community.js.map