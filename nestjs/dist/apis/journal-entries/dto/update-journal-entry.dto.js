"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJournalEntryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_journal_entry_dto_1 = require("./create-journal-entry.dto");
class UpdateJournalEntryDto extends (0, mapped_types_1.PartialType)(create_journal_entry_dto_1.CreateJournalEntryDto) {
}
exports.UpdateJournalEntryDto = UpdateJournalEntryDto;
//# sourceMappingURL=update-journal-entry.dto.js.map