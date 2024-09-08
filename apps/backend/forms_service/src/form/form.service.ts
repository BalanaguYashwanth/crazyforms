import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}
  async create(createFormDto: CreateFormDto) {
    return await this.formRepository.insert(createFormDto);
  }

  findAll() {
    return this.formRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return this.formRepository.update(
      { id },
      { escrow: { id: updateFormDto.escrowId } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
