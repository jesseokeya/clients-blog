const socket = io();

$(document).ready(() => {
  (!isUserAdmin())
    ? $('#adminEdit').remove()
    : ''
  handleAdmin();
  socket.on('success', function(data) {
    console.log(data.message);
  });

  $('#adminButton').click(() => {
    if (authAdmin() != null) {
      $.post('/api/admin', {
        email: authAdmin().email,
        password: authAdmin().password
      }).done(function(data) {
        if (data.isValidUser) {
          Cookies.set('isAdmin', 'true', {expires: 0.1});
          window.location.href = '/admin/publish'
        } else {
          const heading = 'Try Again';
          const body = 'Invalid Username Or Password'
          $('#warning').append(showWarninMessage(heading, body))
          setTimeout(() => {
            $('#warning').empty();
          }, 2500);
        }
      });
    }
  });

});

/* Helper Functions */
const authAdmin = () => {
  const email = $('input#adminEmail').val().replace(/ /g, '');
  const password = $('input#adminPassword').val().replace(/ /g, '');
  if (!validateEmail(email) || !password) {
    const heading = 'Try Again';
    const body = 'Invalid Username Or Password'
    $('#warning').append(showWarninMessage(heading, body))
    setTimeout(() => {
      $('#warning').empty();
    }, 2500);
    return null
  }
  return {email, password};
};

const validateEmail = (mail) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  }
  return false;
}

const handleAdmin = () => {
  const checkAdmin = window.location.pathname === '/login';
  const checkCookies = isUserAdmin();
  if (checkAdmin && checkCookies) {
    window.location.href = '/admin/publish'
  }
  const checkAdminAgain = window.location.pathname.includes('/admin');
  if (checkAdminAgain && !checkCookies) {
    window.location.href = '/login'
  }
  (checkCookies)
    ? $('li#signOut').append(signOutButton())
    : '';
}

const handleSignOut = () => {
  Cookies.remove('isAdmin');
  window.location.reload();
}

const isUserAdmin = () => {
  return Cookies.get('isAdmin') === 'true';
}

const showWarninMessage = (heading, body) => {
  return (`<div class="container">
    <div class="alert alert-danger" role="alert">
      <strong>${heading}</strong> ${body}
    </div>
  </div>`);
}

const signOutButton = () => {
  return `<a onclick="handleSignOut()" class="nav-link btn btn-warning btn-sm">
 sign out </a>`;
}
