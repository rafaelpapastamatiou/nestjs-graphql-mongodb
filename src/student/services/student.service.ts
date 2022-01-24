import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStudentInput } from '../graphql/inputs/student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent({
    firstName,
    lastName,
  }: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getStudentsByIds(studentsIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentsIds,
        },
      },
    });
  }
}
