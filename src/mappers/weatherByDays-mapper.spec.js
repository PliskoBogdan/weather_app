import weatherByDaysMapper from './weatherByDays-mapper';

describe('weatherByDaysMapper', () => {
  test('should map weather data by day', () => {
    const input = [
      { dt_txt: '2023-11-21 12:00:00' },
      { dt_txt: '2023-11-21 15:00:00' },
      { dt_txt: '2023-11-22 09:00:00' },
    ];

    const output = weatherByDaysMapper(input);

    expect(output.list).toEqual({
      '2023-11-21': [
        { dt_txt: '2023-11-21 12:00:00' },
        { dt_txt: '2023-11-21 15:00:00' },
      ],
      '2023-11-22': [
        { dt_txt: '2023-11-22 09:00:00' },
      ],
    });
  });

  test('should store current time info', () => {
    const input = [
      { dt_txt: '2023-11-21 12:00:00' },
      { dt_txt: '2023-11-21 15:00:00' },
    ];

    const output = weatherByDaysMapper(input);

    expect(output.currentTimeStampInfo).toEqual({ dt_txt: '2023-11-21 12:00:00' });
  });
});