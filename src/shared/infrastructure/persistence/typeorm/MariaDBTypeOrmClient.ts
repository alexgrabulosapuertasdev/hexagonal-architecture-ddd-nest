import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export class MariaDBTypeOrmClient {
  static create() {
    return TypeOrmModule.forRoot({
      type: 'mariadb',
      database: process.env['DATABASE_NAME'],
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      synchronize: true,
      entities: [
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '**',
          'infrastructure',
          'persistence',
          '**',
          '*{.ts,.js}',
        ),
      ],
    });
  }
}
