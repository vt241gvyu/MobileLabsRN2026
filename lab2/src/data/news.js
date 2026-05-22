const baseImageUrl = 'https://picsum.photos/seed/news';

export const news = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;

  return {
    id: String(number),
    title: `Заголовок новини ${number}`,
    date: '22.05.2026',
    image: `${baseImageUrl}${number}/600/400`,
    description:
      `Короткий текст новини ${number}. Це тестовий опис для демонстрації ` +
      'роботи списку новин, переходу на детальний екран та передачі параметрів.',
  };
});
