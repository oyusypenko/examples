import booksRepository from '../BooksRepository';

jest.mock('../../services/ApiGateway', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    post: jest.fn()
  }));
});

describe('BooksRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('data retrieval', () => {
    test('should fetch different types of books from appropriate endpoints', async () => {
      const publicBooks = [{ id: '1', name: 'Public Book', author: 'Author 1' }];
      const privateBooks = [{ id: '2', name: 'Private Book', author: 'Author 2', isPrivate: true }];

      booksRepository.httpGateway.get.mockResolvedValueOnce(publicBooks);
      const publicResult = await booksRepository.getBooks();
      expect(booksRepository.httpGateway.get).toHaveBeenCalledWith('/');
      expect(publicResult).toEqual(publicBooks);

      booksRepository.httpGateway.get.mockResolvedValueOnce(privateBooks);
      const privateResult = await booksRepository.getPrivateBooks();
      expect(booksRepository.httpGateway.get).toHaveBeenCalledWith('/private');
      expect(privateResult).toEqual(privateBooks);

      const error = new Error('API failure');
      booksRepository.httpGateway.get.mockRejectedValueOnce(error);
      await expect(booksRepository.getBooks()).rejects.toThrow('API failure');
    });
  });

  describe('book creation', () => {
    test('should handle the complete book creation workflow with success and error cases', async () => {
      const book = { name: 'New Book', author: 'Author' };

      booksRepository.httpGateway.post.mockResolvedValueOnce({ status: 'ok' });
      expect(await booksRepository.addBook(book)).toBe(true);
      expect(booksRepository.httpGateway.post).toHaveBeenCalledWith('/', book);

      booksRepository.httpGateway.post.mockResolvedValueOnce({ status: 'error' });
      expect(await booksRepository.addBook(book)).toBe(false);

      booksRepository.httpGateway.post.mockResolvedValueOnce(null);
      expect(await booksRepository.addBook(book)).toBe(false);

      const error = new Error('Connection error');
      booksRepository.httpGateway.post.mockRejectedValueOnce(error);
      await expect(booksRepository.addBook(book)).rejects.toThrow('Connection error');
    });
  });
});