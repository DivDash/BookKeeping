"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_profit_dto_1 = require("./create-profit.dto");
class UpdateProfitDto extends (0, mapped_types_1.PartialType)(create_profit_dto_1.CreateProfitDto) {
}
exports.UpdateProfitDto = UpdateProfitDto;
//# sourceMappingURL=update-profit.dto.js.map