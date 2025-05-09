document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (email === 'admin@vnua.com' && password === '123456a@') {
        window.location.href = 'home.html';
      } else {
        alert('Email hoặc mật khẩu không đúng.');
      }
    });
  }

  const logoutIcon = document.getElementById('log_out');
  if (logoutIcon) {
    logoutIcon.addEventListener('click', function () {
      window.location.href = 'dangnhap.html';
    });
  }

  function loadContent(page) {
    fetch(`pages/${page}`)
      .then(res => {
        if (!res.ok) throw new Error("Không thể tải nội dung");
        return res.text();
      })
      .then(html => {
        const content = document.getElementById('content-area');
        if (content) {
          content.innerHTML = html;

          loadNotificationsAndEvents();
          if (typeof Chart !== 'undefined') {
            initCharts();
          }

          if (page === 'khoa.html') {
            initKhoaManagement();
          }
        }
      })
      .catch(err => {
        console.error("Lỗi khi tải nội dung:", err);
        const content = document.getElementById('content-area');
        if (content) {
          content.innerHTML = "<p>Lỗi khi tải nội dung.</p>";
        }
      });
  }

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      if (page) {
        loadContent(page);
      }
    });
  });

  function initCharts() {
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: context => `${context.dataset.label}: ${context.raw} người`
          }
        }
      }
    };

    createChart('studentGenderChart', {
      type: 'bar',
      data: {
        labels: ['CNTT', 'HTTT', 'KHMT'],
        datasets: [
          {
            label: 'Sinh viên Nam',
            data: [1300, 1200, 800],
            backgroundColor: '#2E8B57'
          },
          {
            label: 'Sinh viên Nữ',
            data: [1000, 800, 850],
            backgroundColor: '#1E90FF'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            max: 2000,
            ticks: {
              stepSize: 500,
              callback: v => v === 2000 ? '2000 người' : v + ' người'
            }
          }
        },
        plugins: { title: { display: true, text: 'THỐNG KÊ SINH VIÊN', font: { size: 16 } } }
      }
    });

    createChart('teacherGenderChart', {
      type: 'bar',
      data: {
        labels: ['CNTT', 'HTTT', 'KHMT'],
        datasets: [
          {
            label: 'Giáo viên Nam',
            data: [20, 30, 25],
            backgroundColor: '#3CB371'
          },
          {
            label: 'Giáo viên Nữ',
            data: [30, 25, 30],
            backgroundColor: '#D2691E'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              stepSize: 10,
              callback: v => v + ' người'
            }
          }
        },
        plugins: { title: { display: true, text: 'THỐNG KÊ GIÁO VIÊN', font: { size: 16 } } }
      }
    });
  }

  function createChart(id, config) {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();

    try {
      ctx.chart = new Chart(ctx.getContext('2d'), config);
    } catch (e) {
      console.error(`Lỗi khi tạo biểu đồ ${id}:`, e);
    }
  }

  function loadNotificationsAndEvents() {
    const notifications = [
      { date: "07/05/2025", content: "Thông báo tuyển sinh đào tạo trình độ thạc sĩ năm 2025" },
      { date: "07/05/2025", content: "Xét tuyển nghiên cứu sinh năm 2025" },
      { date: "10/05/2025", content: "Thông báo thu học phí học kì II năm 2025" },
      { date: "15/05/2025", content: "Thông báo thu học phí đối với nghiên cứu sinh" },
      { date: "21/05/2025", content: "Đăng kí nguyện vọng lớp học hè năm 2025" }
    ];

    const events = [
      { date: "05/05/2025", content: "Ngày hội việc làm năm 2025" },
      { date: "07/05/2025", content: "Kỉ niệm 71 năm chiến thắng Điện Biên Phủ" },
      { date: "10-18/05/2025", content: "Festival hoa, cây cảnh VNUA 2025" }
    ];

    const notificationList = document.getElementById('notificationList');
    const eventList = document.getElementById('eventList');

    if (notificationList) {
      notificationList.innerHTML = '';
      notifications.forEach(n => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${n.date}:</strong> ${n.content}`;
        notificationList.appendChild(li);
      });
    }

    if (eventList) {
      eventList.innerHTML = '';
      events.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${e.date}:</strong> ${e.content}`;
        eventList.appendChild(li);
      });
    }
  }

  if (typeof Chart !== 'undefined') {
    loadContent("trangchu.html");
  } else {
    console.error("Vui lòng nhúng Chart.js!");
  }
});

function initKhoaManagement() {
  let khoaData = JSON.parse(localStorage.getItem('khoaData')) || [
    { maKhoa: 'CNTT', tenKhoa: 'Công nghệ thông tin' }
  ];

  function saveKhoaData() {
    localStorage.setItem('khoaData', JSON.stringify(khoaData));
  }

  function renderKhoaTable() {
    const tbody = document.querySelector('#khoaTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    khoaData.forEach((khoa, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${khoa.maKhoa}</td>
        <td>${khoa.tenKhoa}</td>
        <td>
          <button class="action-btn btn-edit" data-index="${index}"><i class="bx bx-edit"></i> Sửa</button>
          <button class="action-btn btn-delete" data-index="${index}"><i class="bx bx-trash-alt"></i> Xóa</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => openKhoaModal(true, parseInt(btn.dataset.index)));
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm("Bạn có chắc muốn xóa?")) {
          khoaData.splice(parseInt(btn.dataset.index), 1);
          saveKhoaData();
          renderKhoaTable();
        }
      });
    });
  }

  window.openKhoaModal = function (isEdit = false, index = -1) {
    const modal = document.getElementById('khoaModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = isEdit ? 'Sửa Khoa' : 'Thêm Khoa';

    if (isEdit && index >= 0) {
      document.getElementById('maKhoa').value = khoaData[index].maKhoa;
      document.getElementById('tenKhoa').value = khoaData[index].tenKhoa;
      document.getElementById('editingRowIndex').value = index;
    } else {
      document.getElementById('khoaForm').reset();
      document.getElementById('editingRowIndex').value = '';
    }

    modal.style.display = 'flex';
  };

  window.closeKhoaModal = function () {
    const modal = document.getElementById('khoaModal');
    if (modal) modal.style.display = 'none';
  };

  document.getElementById('khoaModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'khoaModal') {
      closeKhoaModal();
    }
  });

  const form = document.getElementById('khoaForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const maKhoa = document.getElementById('maKhoa').value.trim();
      const tenKhoa = document.getElementById('tenKhoa').value.trim();
      const index = document.getElementById('editingRowIndex').value;

      if (!maKhoa || !tenKhoa) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }

      if (index === '' && khoaData.some(k => k.maKhoa === maKhoa)) {
        alert('Mã khoa đã tồn tại');
        return;
      }

      if (index !== '') {
        khoaData[index] = { maKhoa, tenKhoa };
      } else {
        khoaData.push({ maKhoa, tenKhoa });
      }

      saveKhoaData();
      renderKhoaTable();
      closeKhoaModal();
    });
  }

  renderKhoaTable();
}