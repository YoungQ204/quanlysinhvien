document.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi mặc định

    // Lấy giá trị email và mật khẩu
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Kiểm tra thông tin đăng nhập (thay thế bằng logic của bạn)
    if (email === 'admin@vnua.com' && password === '123456a@') {
        // Nếu đúng, chuyển hướng đến trang khác
        window.location.href = 'home.html'; 
    } else {
        // Nếu sai, hiển thị thông báo lỗi
        alert('Email hoặc mật khẩu không đúng.');
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const contentArea = document.getElementById("content-area");

  function loadContent(page) {
    fetch(`pages/${page}`)
      .then(response => {
        if (!response.ok) throw new Error("Không thể tải nội dung");
        return response.text();
      })
      .then(html => {
        contentArea.innerHTML = html;
      })
      .catch(error => {
        contentArea.innerHTML = "<p>Lỗi khi tải nội dung.</p>";
        console.error(error);
      });
  }

  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      loadContent(page);
    });
  });

  // Load mặc định nội dung Trang chủ
  loadContent("trangchu.html");

  // Xử lý logout
  const logoutIcon = document.getElementById("log_out");
  if (logoutIcon) {
    logoutIcon.addEventListener("click", () => {
      window.location.href = "dangnhap.html";
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const logoutIcon = document.getElementById('log_out');
  
    if (logoutIcon) {
      logoutIcon.addEventListener('click', function() {
        console.log('Biểu tượng đăng xuất đã được nhấp!');
        window.location.href = 'dangnhap.html';
      });
    } else {
      console.error("Không tìm thấy biểu tượng đăng xuất với ID 'log_out'.");
    }
  });
  