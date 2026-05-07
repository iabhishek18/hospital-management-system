export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function paginate<T>(items: T[], params: PaginationParams): PaginatedResponse<T> {
  const { page, limit, sort, order = 'desc' } = params;
  let sorted = [...items];

  if (sort) {
    sorted.sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sort];
      const bVal = (b as Record<string, unknown>)[sort];
      if (aVal instanceof Date && bVal instanceof Date) {
        return order === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      }
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      return order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }

  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = sorted.slice(start, start + limit);

  return { success: true, data, meta: { total, page, limit, totalPages } };
}
