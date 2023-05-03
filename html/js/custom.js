$(function () {

  $('#template-contactform-check').change(function(){
    if ($(this).prop('checked')) {
      $('#template-contactform-submit').attr('disabled' , false);
    } else {
      $('#template-contactform-submit').attr('disabled' , true);
    }
  });

  /*$("form").submit(function (e) {
    e.preventDefault();

    var formData = {
      name: $("#quick-contact-form-name").val(),
      industry: $("#quick-contact-form-industry").val(),
      email: $("#quick-contact-form-email").val(),
      phone: $("#quick-contact-form-phone").val(),
      message: $("#quick-contact-form-message").val(),
    };

    var form = $(this);
    var actionUrl = form.attr('action');

    $.ajax({
      type: "POST",
      url: actionUrl,
      data: formData,
      beforeSend: function() {
        console.log(formData);
      },
      success: function(data)
      {
        alert(data); // show response from the php script.
      },
      error: function (data) {
        console.log('An error occurred.');
        console.log(data);
      },
    });

  });*/

})
