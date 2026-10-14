(() => {
  'use strict';
  const key = 'panelka:liked:v1';
  const button = document.querySelector('.reaction');
  const status = document.querySelector('#status');
  let liked = false;
  try { liked = localStorage.getItem(key) === '1'; } catch (_) {}
  function render() {
    button.setAttribute('aria-pressed', String(liked));
    button.setAttribute('aria-label', liked ? 'Убрать лайк' : 'Оставить лайк');
    button.title = liked ? 'Убрать лайк' : 'Оставить лайк';
  }
  let timer;
  button.addEventListener('click', () => {
    liked = !liked;
    render();
    window.dispatchEvent(new CustomEvent('panelka:reaction', { detail: { liked } }));
    try { localStorage.setItem(key, liked ? '1' : '0'); } catch (_) {}
    status.textContent = liked ? 'Спасибо! Ваш лайк сохранён на этом устройстве.' : 'Лайк убран.';
    button.classList.remove('pulse');
    void button.offsetWidth;
    button.classList.add('pulse');
    clearTimeout(timer);
    timer = setTimeout(() => button.classList.remove('pulse'), 750);
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      liked = event.key === key && event.newValue === '1';
      render();
    }
  });
  render();
})();
