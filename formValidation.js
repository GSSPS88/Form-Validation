const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password');
const password2 = document.getElementById('re-password');

// ຕົວທີ່ໃຊ້ໃນການເອີ້ນໃຊ້ງານແຕ່ລະ function ເມື່ອເຮົາກົດປູ່ມ submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    //
    checkInput([username,email,password1,password2])

    //email
    ///ສ່ວນນີ້ແມ່ນຈະສະແດງຜົນເວລາທີ່ເຮົາບໍ່ປ້ອນຂໍ້ມູນໃນຊ່ອງ email
    /// EM ຖ້າປ້ອນຂໍ້ມູນໃນສ່ວນ email ບໍ່ຖືກຕ້ອງຕາມທີ່ກຳນົດ ເຊັ່ນ: ບໍ່ມີ @ ຫຼື gmail ຈະສະແດງຂໍ້ຄວາມ error ຂຶ້ນ
    if (!validateEmail(email.value.trim())){
        showerror(email, 'ອີເມວບໍ່ຖືກຕ້ອງ');
    }
    else {
        showsuccess(email);
    }
    ///PW
    checkPassword(password1, password2);
    ///IN
    checkInputLength(username, 5, 25);
    checkInputLength(password1, 8, 25);
});


// ຕົວທີ່ໃຊ້ສະແດງຜົນເມື່ອປ້ອນຂໍ້ມູນຜິດ ຫຼື ບໍ່ຄົບຖ້ວນ
function showerror(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}


// ຕົວທີ່ໃຊ້ສະແດງຜົນເມື່ອປ້ອນຂໍ້ມູນສຳເລັດ ແລະ ຖືກຕ້ອງ
function showsuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";

}

/// EM ຖ້າປ້ອນຂໍ້ມູນໃນສ່ວນ email ບໍ່ຖືກຕ້ອງຕາມຮູບແບບຂອງ email ເຊັ່ນ: ບໍ່ມີ @ ຫຼື gmail ຈະສະແດງຂໍ້ຄວາມ error ຂຶ້ນ
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

//username, password1 and password2
function checkInput(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value.trim() === '') {
            showerror(input, `ກະລຸນາປ້ອນ ${getInputCase(input)}`);
        } else {
            showsuccess(input);
        }
    })
}

// ສ່ວນນີ້ແມ່ນຈະເຮັດໃຫ້ຕົວອັກສອນໂຕທຳອິດຂອງ getInputCase(input) ໃນ ຂໍ້ຄວາມ error ເປັນໂຈພິມໃຫຍ່
function getInputCase (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
/// PW ສ່ວນນີ້ແມ່ນໃຊ້ສະແດງ error ເມື່ອ password1 & password2 ບໍ່ຕົງກັນ
function checkPassword(password1, password2) {
    if(password1.value !== password2.value) {
        showerror(password2, 'ລະຫັດບໍ່ຖືກຕ້ອງ');
    }
}

/// IN ສ່ວນນີ້ແມ່ນໃຊ້ໃນການກວດສອບຄວາມຍາວສັ້ນຂອງຂໍ້ຄວາມໃນຊ່ອງ input ວ່າຖືກຕ້ອງຕາມກຳນົດບໍ່
function checkInputLength (input, min, max) {
    if(input.value.length <= min) {
        showerror(input, `${getInputCase(input)} ຕ້ອງຫຼາຍກວ່າ ${min} ຕົວອັກສອນ ຫຼຶ ຕົວເລກ`);
    } else if (input.value.length > max) {
        showerror(input, `${getInputCase(input)} ຕ້ອງບໍ່ເກີນ ${max} ຕົວອັກສອນ ຫຼຶ ຕົວເລກ`);
    } else {
        showsuccess(input);
    }
}