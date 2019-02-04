function openCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
}

function contactMe() {
    var $email = $('.email').val();
    var $subject = $('.subject').val();
    var $message = $('.message').val();
    console.log($email);

    var link = `https://mail.google.com/mail/?view=cm&fs=1&to=${$email}&su=${$subject}&body=${$message}`    
window.open(link, '_blank');
}




