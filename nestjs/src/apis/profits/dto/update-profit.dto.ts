import { PartialType } from '@nestjs/mapped-types';
import { CreateProfitDto } from './create-profit.dto';

export class UpdateProfitDto extends PartialType(CreateProfitDto) {}
