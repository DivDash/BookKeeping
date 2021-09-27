"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNonprofitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nonprofit_dto_1 = require("./create-nonprofit.dto");
class UpdateNonprofitDto extends (0, mapped_types_1.PartialType)(create_nonprofit_dto_1.CreateNonprofitDto) {
}
exports.UpdateNonprofitDto = UpdateNonprofitDto;
//# sourceMappingURL=update-nonprofit.dto.js.map