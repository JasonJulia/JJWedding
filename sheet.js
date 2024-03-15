const scriptURL = 'https://script.google.com/macros/s/AKfycbwhjz0OXaTNTEk-G1QiDC7bs-bdgxijmDSn-9PpVL7GlLO8SfeBrv2iqofIbnBfoxkUYw/exec'

const form = document.forms['contact-form'];
const submitButton = form.querySelector('input[type="submit"]');
const statusLabel = document.createElement('label');
statusLabel.style.display = 'none';
const statusMessage = document.createElement('div');
statusMessage.classList.add('status-message');

let hasSubmitted = false;

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