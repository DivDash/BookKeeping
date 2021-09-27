import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admins, AdminsSchema } from '../../schemas/admins.schema';
import { MongooseModule } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admins.name, schema: AdminsSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Admins.name,
        useFactory: () => {
          const schema = AdminsSchema;
          schema.pre('save', async function () {
            if (this.isModified('password')) {
              this.password = await bcrypt.hash(this.password, 10);
              this.confirm = await bcrypt.hash(this.confirm, 10);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
