// 選擇所有的 checkbox
const checkboxes = document.querySelectorAll('.gender-options input[type="radio"]');

// 對每個 checkbox 添加事件監聽器
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // 檢查 checkbox 是否被選中
        if (this.checked) {
            // 將 checkbox 的父級標籤（label）的類名設置為 'checked'
            this.parentNode.classList.add('checked');
        } else {
            // 如果未選中，則移除 'checked' 類名
            this.parentNode.classList.remove('checked');
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbwhjz0OXaTNTEk-G1QiDC7bs-bdgxijmDSn-9PpVL7GlLO8SfeBrv2iqofIbnBfoxkUYw/exec'

const form = document.forms['contact-form'];
const submitButton = document.querySelector('input[type="submit"]');
const statusLabel = document.querySelector('.submited-text');

let hasSubmitted = false;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (hasSubmitted) {
    return;
  }
  const notAttendingCheckbox = document.getElementById('adot-2');
  const needInvitation = document.getElementById('idot-1');
  var addressInput = document.querySelector('input[name="address"]');
// 获取需要根据复选框状态显示/隐藏的元素
const additionalElements = document.querySelectorAll('.hideable');
  let attend = true;
  if(notAttendingCheckbox.checked)
    attend = false;

  statusLabel.style.display = 'none'
  statusLabel.style.color = 'black'
    const guestSideRadios = form.querySelectorAll('input[name="side"]');
    let guestSideChecked = false;
    guestSideRadios.forEach(function(radio) {
            if (radio.checked) {
                guestSideChecked = true;
            }
        });

        if (!guestSideChecked) {
            statusLabel.style.display = 'block'
            statusLabel.style.color = 'red'
            statusLabel.textContent = '請填寫關係欄'
            return;
        } 
    const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
    let attendanceChecked = false;
    attendanceRadios.forEach(function(radio) {
        if (radio.checked) {
            attendanceChecked = true;
        }
    });

    if (!attendanceChecked) {
        statusLabel.style.display = 'block'
        statusLabel.style.color = 'red'
        statusLabel.textContent = '請填寫是否出席婚宴'
        return;
    } 

    if (attend ) {
        var vegetarianSelect = document.getElementById('vegetarian');
        // 獲取葷食人數的select元素
        var nonVegetarianSelect = document.getElementById('nonVegetarian');

        // 獲取素食人數和葷食人數的值，並轉換為數字
        var vegetarianCount = parseInt(vegetarianSelect.value, 10);
        var nonVegetarianCount = parseInt(nonVegetarianSelect.value, 10);

        // 計算總量
        var total = vegetarianCount + nonVegetarianCount;
        if(total==0){
            statusLabel.style.display = 'block'
            statusLabel.style.color = 'red'
            statusLabel.textContent = '請填寫人數'
            return;
        }
        
    }

    const invitationRadios = form.querySelectorAll('input[name="invitation"]');
    let invitationChecked = false;
    invitationRadios.forEach(function(radio) {
        if (radio.checked) {
            invitationChecked = true;
        }
    });

    if (attend && !invitationChecked) {
        statusLabel.style.display = 'block'
        statusLabel.style.color = 'red'
        statusLabel.textContent = '請填寫是否需要紙本喜帖'
        return;
    } 

    if(attend && needInvitation.checked) {
        var addressValue = addressInput.value;
        // 判斷紙本喜帖寄送地址是否為空白
        if (addressValue.trim() === '') {
            statusLabel.style.display = 'block'
            statusLabel.style.color = 'red'
            statusLabel.textContent = '請填寫紙本喜帖寄送地址'
            return;
        }
    }


    const stayRadios = form.querySelectorAll('input[name="stay"]');
    let stayChecked = false;
    stayRadios.forEach(function(radio) {
        if (radio.checked) {
            stayChecked = true;
        }
    });

    if (attend && !stayChecked) {
        statusLabel.style.display = 'block'
        statusLabel.style.color = 'red'
        statusLabel.textContent = '請填寫是否需要住宿'
        return;
    } 

    
  hasSubmitted = true;
  submitButton.disabled = true;
  submitButton.classList.add('no-hover');
  statusLabel.style.display = 'block'
  submitButton.value = '提交中'
  statusLabel.innerHTML = '提交中 請稍等片刻';
  
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
        statusLabel.style.animation = 'none';
        if (!attend ) {
            statusLabel.innerHTML = '提交成功 感謝您的提交 <img src="https://res.cloudinary.com/dmxjvj0mh/image/upload/v1711734210/buddy_icon.png" alt="Icon" style="width: 50px; height: 45px;">';
        } else{
            statusLabel.innerHTML = '提交成功 九月七號與您相見 <img src="https://res.cloudinary.com/dmxjvj0mh/image/upload/v1711734210/buddy_icon.png" alt="Icon" style="width: 50px; height: 45px;">';

        }
        form.querySelectorAll('input, textarea').forEach(field => {
        field.disabled = true; // 禁用所有字段
        });
      // 在提交成功後添加“Submit Again”按鈕
      submitButton.value = '提交成功！';
      window.scrollTo(0, document.body.scrollHeight);
      // 添加到表單中
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    statusLabel.textContent = 'Error! Please try again later.';
    hasSubmitted = false;
  }
});

// 將字段的值設置為其當前值，以便在禁用後保持不變
form.querySelectorAll('input, textarea').forEach(field => {
  field.value = field.value;
});

form.appendChild(statusLabel);


// 獲取出席選項元素
var attendanceOption = document.getElementsByName('attendance');
// 獲取包含素食人數、葷食人數和兒童座椅數問題的容器元素
var mealDetails = document.getElementById('meal-details');

var invitationDetails = document.getElementById('invitation-details');


var stayDetails = document.getElementById('stay-details');



// 監聽出席選項的變化
for (var i = 0; i < attendanceOption.length; i++) {
  attendanceOption[i].addEventListener('change', function() {
    // 如果選擇"會出席"，則顯示問題容器，否則隱藏問題容器
    if (this.value === 'yes') {
      mealDetails.style.display = 'block';
      invitationDetails.style.display = 'block'
      stayDetails.style.display = 'block'
    } else {
      mealDetails.style.display = 'none';
      invitationDetails.style.display = 'none'
      stayDetails.style.display = 'none'
    }
  });
}


var invitationOption = document.getElementsByName('invitation');
var addressField = document.getElementById('addressField');

// 預設情況下隱藏地址欄位
addressField.style.display = 'none';

// 監聽是否需要紙本喜帖選項的變化
for (var i = 0; i < invitationOption.length; i++) {
  invitationOption[i].addEventListener('change', function() {
    // 如果選擇"是"，則顯示地址欄位
    if (this.value === 'yes') {
      addressField.style.display = 'block';
    } else {
      addressField.style.display = 'none';
    }
  });
}




