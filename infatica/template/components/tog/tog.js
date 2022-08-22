class Tog {
  constructor(element, options = {
    classHide: '--hide',
    classShow: '--show'
  }) {
    this.element = element;
    this.options = options;
    this.head = this.element.querySelector('.tog__head');
    this.body = this.element.querySelector('.tog__body');
    this.isOpen = false;
    if (this.head && this.body) {
      this.head.addEventListener('click', () => {
        this.isOpen = !this.isOpen;
        this.element.classList.toggle('--open');

        if (this.isOpen) {
          this.showBlock();
        } else {
          this.hideBlock();
        }
      });
    }
  }

  showBlock() {
    this.body.style.height = 0 + 'px';


    let percentHeight = this.body.scrollHeight / 20;
    let blockHeight = 0;

    let interval = setInterval(() => {
      blockHeight += percentHeight;
      this.body.style.height = blockHeight + 'px';

      if (blockHeight >= this.body.scrollHeight) {
        this.body.style.height = percentHeight + 'px';
        this.element.classList.add(this.options.classShow);
        this.body.removeAttribute('style');
        this.element.classList.remove(this.options.classHide);
        clearInterval(interval);
      }
    }, 10);
  }

  hideBlock() {

    let percentHeight = this.body.offsetHeight / 20;
    let blockHeight = this.body.offsetHeight;

    let interval = setInterval(() => {
      blockHeight -= percentHeight;
      this.body.style.height = blockHeight + 'px';

      if (blockHeight <= 0) {
        this.body.style.height = 0 + 'px';
        this.element.classList.add(this.options.classHide);
        this.body.removeAttribute('style');
        this.element.classList.remove(this.options.classShow);
        clearInterval(interval);
      }
    }, 10);
  }
}