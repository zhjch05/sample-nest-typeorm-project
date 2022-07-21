import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Generated Primary UUID column' })
  uuid: string;

  @Column({ unique: true })
  @Field(() => String, { description: `User's email address` })
  @IsEmail()
  email: string;
}
