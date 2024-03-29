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
const submitButton = form.querySelector('input[type="submit"]');
const statusLabel = document.querySelector('.submited-text');

let hasSubmitted = false;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (hasSubmitted) {
    return;
  }
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

    const invitationRadios = form.querySelectorAll('input[name="invitation"]');
    let invitationChecked = false;
    invitationRadios.forEach(function(radio) {
        if (radio.checked) {
            invitationChecked = true;
        }
    });

    if (!invitationChecked) {
        statusLabel.style.display = 'block'
        statusLabel.style.color = 'red'
        statusLabel.textContent = '請填寫是否需要紙本喜帖'
        return;
    } 

    const stayRadios = form.querySelectorAll('input[name="stay"]');
    let stayChecked = false;
    stayRadios.forEach(function(radio) {
        if (radio.checked) {
            stayChecked = true;
        }
    });

    if (!stayChecked) {
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
  statusLabel.textContent = '提交中 請稍等片刻';
  
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
        statusLabel.style.animation = 'none';
        statusLabel.textContent = '提交成功 9/7號與您相見';
        form.querySelectorAll('input, textarea').forEach(field => {
        field.disabled = true; // 禁用所有字段
        });
      // 在提交成功後添加“Submit Again”按鈕
      submitButton.value = '提交成功！';
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


