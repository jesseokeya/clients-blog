/* Handle Image Uploads To Server Through Firebase */
let imagesUploaded = [];

$(document).ready(() => {
  const check = (window.location.pathname.includes('post'));
  if (check) {
    $.get('/api/getFirebaseConfig', (data, err) => {
      return data;
    }).then((config) => {
      firebase.initializeApp(config);
      handleUpload();
    });
  }
});

const handleUpload = () => {
  if (firebase) {
    firebase.storage().ref().constructor.prototype.putFiles = function(files) {
      const ref = this;
      return Promise.all($.map(files, function(file) {
        const filename = file.name.replace(/ /g, '');
        return ref.child(`blogImages/${filename}`).put(file);
      }));
    }
    $('#imageUpload').on('change', (e) => {
      const storageRef = firebase.storage().ref();
      storageRef.putFiles(e.target.files).then((metadatas) => {
        // Get an array of file metadata
        getImageUrls(metadatas);
      }).catch((error) => {
        // If any task fails, handle this
        if (error) {
          throw error;
        }
      });

    });
  }
}

const validateSubmit = () => {
  const validate = (imagesUploaded.length > 0 && $('#postTitle').val() !== '' && $('#postAuthor').val() !== '' && $('#postHeading').val() !== '' && $('#postSubHeading').val() !== '' && $('#postContent').val() !== '');
  return validate;
}

const handleSubmit = () => {
  if (validateSubmit()) {

    const blogData = {
      title: $('#postTitle').val(),
      author: $('#postAuthor').val(),
      heading: $('#postHeading').val(),
      subheading: $('#postSubHeading').val(),
      body: $('#postContent').val(),
      hidden: false,
      images: imagesUploaded
    }

    $.post('/api/create', blogData).done((data) => {
      const message = showWarningMessage('Success!', 'New Blogpost Was Created');
      $('#alertMessage').append(message);
      setTimeout(() => {
        $('#successMessage').remove();
        $('#postTitle').val('');
        $('#postAuthor').val('');
        $('#postHeading').val('');
        $('#postSubHeading').val('');
        $('#postContent').val('');
        $('#uploadProgress').css('width', '0%');
        $("#fileHelp").val('');
      }, 1000);
      imagesUploaded = [];
    });
  } else {
    const message = dangerMessage('Try Again!', 'Incomplete Form Fields');
    $('#alertMessage').append(message);
  }
}

const getImageUrls = (metadatas) => {
  for (let i in metadatas) {
    const imageInfo = {
      alt: metadatas[i].metadata.name,
      url: metadatas[i].metadata.downloadURLs[0]
    }
    imagesUploaded.push(imageInfo);
    (i == (metadatas.length - 1))
      ? $('#uploadProgress').css('width', '100%')
      : '';
  }
}
