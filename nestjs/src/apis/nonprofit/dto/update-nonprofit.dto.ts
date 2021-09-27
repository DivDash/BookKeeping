import { PartialType } from '@nestjs/mapped-types';
import { CreateNonprofitDto } from './create-nonprofit.dto';

export class UpdateNonprofitDto extends PartialType(CreateNonprofitDto) {}
