import {formatDateTime} from '../../src/utils/date';
import dayjs from 'dayjs';

jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs');
  return jest.fn(date => actualDayjs(date));
});

describe('formatDateTime', () => {
  test('should format valid date string to DD/MM/YYYY at HH:mm', () => {
    const date = '2025-10-05T10:00:00Z';
    expect(formatDateTime(date)).toBe('05/10/2025 at 17:00');
  });

  test('should handle invalid date string gracefully', () => {
    const invalidDate = 'invalid-date';
    expect(formatDateTime(invalidDate)).toBe(
      dayjs(invalidDate).format('DD/MM/YYYY [at] HH:mm'),
    );
  });
});
