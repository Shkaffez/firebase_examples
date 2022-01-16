import { Injectable } from '@nestjs/common';
import { createBookDto } from './createBook.dto';
import { db } from '../main';

@Injectable()
export class BooksService {
  public async findAll() {
    try {
      const books = (await db.ref('books').once('value')).val();
      return books;
    } catch (e) {
      console.log(e);
    }
  }

  public async create(book: createBookDto) {
    try {
      const bookId = await db.ref('books').push(book);
      const bookObj = await db.ref('books').child(bookId.key).once('value');
      return {
        id: bookId.key,
        value: bookObj,
      };
    } catch (e) {
      console.error(e);
    }
  }

  public async findOne(id: string) {
    try {
      const book = await db.ref('books').child(id).once('value');
      return book;
    } catch (e) {
      console.error(e);
    }
  }

  public async delete(id: string) {
    try {
      return await db.ref('books').child(id).remove();
    } catch (e) {
      console.error(e);
    }
  }

  public async update(id: string, book: createBookDto) {
    try {
      const bookObj = await db.ref('books').child(id).once('value');
      if (!bookObj.val()) {
        return null;
      }

      await db
        .ref('books')
        .child(id)
        .update({ ...book });
      return await db.ref('books').child(id).once('value');
    } catch (e) {
      console.error(e);
    }
  }
}
