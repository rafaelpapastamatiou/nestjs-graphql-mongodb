import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/services/student.service';
import { CreateStudentInput } from '../inputs/student.input';
import { StudentType } from '../types/student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  async students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
