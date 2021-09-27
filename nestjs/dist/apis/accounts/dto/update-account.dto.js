"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_account_dto_1 = require("./create-account.dto");
class UpdateAccountDto extends (0, mapped_types_1.PartialType)(create_account_dto_1.CreateAccountDto) {
}
exports.UpdateAccountDto = UpdateAccountDto;
//# sourceMappingURL=update-account.dto.js.map