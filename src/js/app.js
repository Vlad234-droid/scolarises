const navi = document.querySelector('.navigation');
const header = document.querySelector('.header');
const submBtn = document.querySelector('.subm_btn');
const fname = document.querySelector('._fname');
const lname = document.querySelector('._lname');
const email = document.querySelector('.email');
const bFname = document.querySelector('.b_f_name');
const bLname = document.querySelector('.b_l_name');
const bEmail = document.querySelector('.b_email');
const form = document.querySelector('.form__');
const leftLag = document.querySelector('.leftLag');
const rightLag = document.querySelector('.rightLag');

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const activeNavigation = () => {
  navi.addEventListener('click', function (e) {
    if (
      e.target.classList.contains('navigation') ||
      e.target.parentElement.classList.contains('active') ||
      e.target.classList.contains('btn__green')
    )
      return;
    Array.from(navi.children)
      .filter((_, index) => index < Array.from(navi.children).length - 1)
      .forEach((item) => {
        if (item.classList.contains('active')) item.classList.remove('active');
      });
    e.target.parentElement.classList.add('active');
  });
};
activeNavigation();

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  if (scrollTop > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

submBtn.addEventListener('click', (e) => {
  const firstName = /^[a-zA-Z ]+$/.test(fname.value);
  const lastName = /^[a-zA-Z ]+$/.test(lname.value);
  const emailValid = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.value,
  );

  if (!firstName) {
    bFname.classList.add('error');
    setTimeout(() => {
      bFname.classList.remove('error');
    }, 5000);
  }
  if (!lastName) {
    bLname.classList.add('error');
    setTimeout(() => {
      bLname.classList.remove('error');
    }, 5000);
  }
  if (!emailValid) {
    bEmail.classList.add('error');
    setTimeout(() => {
      bEmail.classList.remove('error');
    }, 5000);
  }

  if (firstName && lastName && emailValid) {
    axios({
      url: 'https://formspree.io/f/mjvjjzkb',
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: {
        _replyto: 'vlad@angleto.com',
        f_name: fname.value,
        l_name: lname.value,
        email: email.value,
      },
    });
    form.classList.toggle('hide');
    setTimeout(() => {
      form.classList.add('visible_done');
    }, 500);
    setTimeout(() => {
      form.classList.add('show_done');
    }, 600);
    setTimeout(() => {
      form.classList.remove('show_done');
    }, 3000);
    setTimeout(() => {
      form.classList.remove('visible_done');
      form.children[0].style.display = 'flex';
      form.classList.toggle('hide');
      fname.value = '';
      lname.value = '';
      email.value = '';
    }, 3500);
  }

  e.preventDefault();
});
let timeID = null;
const runHeaderAnimation = () => {
  header.classList.add('walk');
  clearTimeout(timeID);
  timeID = setTimeout(() => {
    const style = getComputedStyle(leftLag, null).transform;
    const style2 = getComputedStyle(rightLag, null).transform;
    const getMatrix = () => {
      header.classList.remove('walk');
      if (style !== 'none' && style2 !== 'none') {
        const [a, b] = style.split('(')[1].split(')')[0].split(',');
        const [c, d] = style2.split('(')[1].split(')')[0].split(',');
        const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        const angle2 = Math.round(Math.atan2(d, c) * (180 / Math.PI));
        leftLag.style.transform = `rotate(${angle}deg)`;
        rightLag.style.transform = `rotate(${angle2}deg)`;
        setTimeout(() => {
          leftLag.style.transform = 'rotate(0deg)';
          rightLag.style.transform = 'rotate(0deg)';
        }, 100);
      }
    };
    getMatrix();
  }, 300);
};

window.addEventListener('scroll', () => {
  runHeaderAnimation();
});
