import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './createBook.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  public findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(id);
    console.log(book);
    if (!book.val()) {
      throw new NotFoundException();
    }
    return book;
  }

  @Post()
  public create(@Body() book: createBookDto) {
    const bookObj = this.bookService.create(book);
    return bookObj;
  }

  @Put(':id')
  public async update(@Body() book: createBookDto, @Param('id') id: string) {
    const bookObj = await this.bookService.update(id, book);
    if (!bookObj || !bookObj.val()) {
      throw new NotFoundException();
    }
    return bookObj;
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    this.bookService.delete(id);
    return 'ok';
  }
}
