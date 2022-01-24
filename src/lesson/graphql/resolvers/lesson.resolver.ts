import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/services/student.service';
import { Lesson } from '../../entities/lesson.entity';
import { LessonService } from '../../services/lesson.service';
import { AssignStudentsToLessonInput } from '../inputs/assign-students-to-lesson.input';
import { CreateLessonInput } from '../inputs/lesson.input';
import { LessonType } from '../types/lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  async lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query(() => [LessonType])
  async lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    { lessonId, studentsIds }: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getStudentsByIds(lesson.students);
  }
}
