
const getData = () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

const sendData = (body) => fetch(
  'https://28.javascript.pages.academy/kekstagram1',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  });


export { getData , sendData };
