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
const statusLabel = document.createElement('label');
statusLabel.style.display = 'none';
const statusMessage = document.createElement('div');
statusMessage.classList.add('status-message');

let hasSubmitted = false;

const showFormButton = document.getElementById('showFormButton');
const container = document.getElementById('containerId');
const buttonContainer = document.getElementById('topButton');

showFormButton.addEventListener('click', function() {
  buttonContainer.style.display = 'none';
  container.style.display = 'block';
  document.body.style.backgroundImage = "url('init.jpg')";
  if (window.innerWidth <= 768) {
    // Mobile phone mode
    document.body.style.backgroundImage = "url('background-mobile.jpg')";
    document.body.style.marginTop = '5px';
  } else {
    // Desktop website
    document.body.style.backgroundImage = "url('init.jpg')";
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (hasSubmitted) {
    return;
  }

  hasSubmitted = true;

  submitButton.style.display = 'none';
  statusLabel.textContent = 'Submitting...';
  statusLabel.style.display = 'inline-block';

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
      statusLabel.textContent = 'Submit successful!';
      statusMessage.classList.add('success');
      form.querySelectorAll('input, textarea').forEach(field => {
        field.disabled = true; // 禁用所有字段
      });

      // 在提交成功後添加“Submit Again”按鈕
      const submitAgainButton = document.createElement('button');
      submitAgainButton.textContent = 'Submit Again';
      submitAgainButton.addEventListener('click', () => {
        form.reset(); // 重置表單
        statusLabel.style.display = 'none'; // 隱藏提交狀態的標籤
        submitButton.style.display = 'inline-block'; // 顯示提交按鈕
        submitAgainButton.style.display = 'none'; // 隱藏 Submit Again 按鈕
        form.querySelectorAll('input, textarea').forEach(field => {
          field.disabled = false; // 啟用所有字段
        });
        window.location.reload(); // 重新加載網頁
      });

      // 添加到表單中
      form.appendChild(submitAgainButton);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    statusLabel.textContent = 'Error! Please try again later.';
    statusMessage.classList.add('error');
    hasSubmitted = false;
  }
});

// 將字段的值設置為其當前值，以便在禁用後保持不變
form.querySelectorAll('input, textarea').forEach(field => {
  field.value = field.value;
});

form.appendChild(statusLabel);
form.appendChild(statusMessage);