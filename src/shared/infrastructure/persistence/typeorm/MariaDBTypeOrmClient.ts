import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export class MariaDBTypeOrmClient {
  static create() {
    return TypeOrmModule.forRoot({
      type: 'mariadb',
      database: 'hexagonal',
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
          'user',
          'infrastructure',
          'persistence',
          '**',
          '*{.ts,.js}',
        ),
      ],
    });
  }
}
