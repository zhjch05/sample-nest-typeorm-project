import { Field, InputType, PartialType } from '@nestjs/graphql';

import CreateUserInput from './create-user.input';

@InputType()
export default class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  uuid: string;
}
