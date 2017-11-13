const socket = io();

$(document).ready(() => {
  $('#alertMessage').hide();
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
          $('#alertMessage').show();
          setTimeout(() => {
            $('#alertMessage').hide();
          }, 3000);
        }
      });
    }
  });

});

/* Helper Functions */
let authAdmin = () => {

  const email = $('input#adminEmail').val().replace(/ /g, '');
  const password = $('input#adminPassword').val().replace(/ /g, '');
  if (!validateEmail(email) || !password) {
    $('#alertMessage').show();
    setTimeout(() => {
      $('#alertMessage').hide();
    }, 3000);
    return null
  }

  return {email, password};
};

let validateEmail = (mail) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  }
  return false;
}

let handleAdmin = () => {
  const checkAdmin = window.location.pathname === '/admin';
  const checkCookies = Cookies.get('isAdmin') === 'true';
  if (checkAdmin && checkCookies) {
    window.location.href = '/admin/publish'
  }
  const checkAdminAgain = window.location.pathname === '/admin/publish';
  if (checkAdminAgain && !checkCookies) {
    window.location.href = '/admin'
  }
  (checkCookies)
    ? $('#signOut').show()
    : $('#signOut').hide();
}

let handleSignOut = () => {
  Cookies.remove('isAdmin');
  window.location.reload();
}
