const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });