import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export default class CreateUserInput {
  @Field(() => String, { description: `User's email address` })
  @IsEmail()
  email: string;
}
