import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @MinLength(1)
  @IsString()
  firstName: string;

  @Field()
  @MinLength(1)
  @IsString()
  lastName: string;
}
