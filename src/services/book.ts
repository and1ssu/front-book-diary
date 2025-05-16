import { api } from './api';
import type { Book, ApiResponse } from '../types/book';

interface BookOptions {
  genres: Array<{ value: string; label: string }>;
  statuses: Array<{ value: string; label: string }>;
}

export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<ApiResponse<Book[]>>('/books');
    return response.data.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get<ApiResponse<Book>>(`/books/${id}`);
    return response.data.data;
  },

  create: async (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> => {
    const response = await api.post<ApiResponse<Book>>('/books', book);
    return response.data.data;
  },

  update: async (id: number, book: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Book> => {
    const response = await api.put<ApiResponse<Book>>(`/books/${id}`, book);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/books/${id}`);
  },

  getOptions: async (): Promise<BookOptions> => {
    const response = await api.get<ApiResponse<BookOptions>>('/books/options');
    return response.data.data;
  },
};