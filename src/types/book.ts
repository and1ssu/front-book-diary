export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  message?: string;
}