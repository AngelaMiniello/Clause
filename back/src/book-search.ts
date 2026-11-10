import type { Request, Response } from 'express';

interface GoogleBooksResult {
  items?: {
    id: string;
    volumeInfo?: {
      title?: string;
      authors?: string[];
      language?: string;
      publishedDate?: string;
      infoLink?: string;
      imageLinks?: { thumbnail?: string; smallThumbnail?: string };
      industryIdentifiers?: { type: string; identifier: string }[];
    };
  }[];
}

export async function searchBooks(req: Request, res: Response): Promise<void> {
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (!query || query.length > 200) {
    res.status(400).json({ error: 'Enter a search query between 1 and 200 characters.' });
    return;
  }

  const key = process.env.GOOGLE_BOOKS_API_KEY?.trim();
  if (!key) {
    res.status(503).json({ error: 'Book search is not configured.' });
    return;
  }

  const isbn = query.replace(/[\s-]/g, '');
  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.searchParams.set('q', /^(?:\d{13}|\d{9}[\dXx])$/.test(isbn) ? `isbn:${isbn.toUpperCase()}` : query);
  url.searchParams.set('printType', 'books');
  url.searchParams.set('maxResults', '20');

  try {
    const response = await fetch(url, {
      headers: { 'x-goog-api-key': key },
      redirect: 'error',
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const status = response.status === 429 ? 503 : 502;
      res.status(status).json({ error: 'Google Books is temporarily unavailable.' });
      return;
    }

    const result = await response.json() as GoogleBooksResult;
    const books = (result.items ?? []).flatMap(({ id, volumeInfo }) => {
      if (!id || !volumeInfo?.title) return [];

      const identifiers = volumeInfo.industryIdentifiers ?? [];
      const isbn = identifiers.find(({ type }) => type === 'ISBN_13')
        ?? identifiers.find(({ type }) => type === 'ISBN_10');
      const cover = volumeInfo.imageLinks?.thumbnail ?? volumeInfo.imageLinks?.smallThumbnail;

      return [{
        id,
        title: volumeInfo.title,
        authors: volumeInfo.authors ?? [],
        coverUrl: cover?.replace(/^http:\/\//, 'https://') ?? null,
        language: volumeInfo.language ?? null,
        year: volumeInfo.publishedDate?.match(/^\d{4}/)?.[0] ?? null,
        isbn: isbn?.identifier ?? null,
        infoUrl: volumeInfo.infoLink?.replace(/^http:\/\//, 'https://') ?? null,
      }];
    });

    res.json({ books });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    res.status(timedOut ? 504 : 502).json({ error: 'Could not complete the Google Books search.' });
  }
}
