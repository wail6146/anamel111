// تنفيذ الكود عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الأقسام والقائمة الجانبية
    initSections();
    
    // تهيئة أزرار العودة إلى لوحة القيادة
    initBackButtons();
    
    // تهيئة الإشعارات
    initNotifications();
    
    // تهيئة قسم الرسائل
    initMessages();
    
    // تهيئة قسم الإعدادات
    initSettings();
    
    // تهيئة قسم الإحصائيات
    initStatistics();
});

// تهيئة الأقسام والقائمة الجانبية
function initSections() {
    // الحصول على جميع روابط القائمة الجانبية
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    // إضافة مستمع حدث لكل رابط
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للرابط
            
            // الحصول على معرف القسم المستهدف من خلال سمة href
            const targetId = this.getAttribute('href').substring(1); // إزالة علامة # من بداية المعرف
            
            // إذا كان الرابط له قائمة فرعية، فقط قم بتبديل حالة القائمة الفرعية
            if (this.classList.contains('has-dropdown')) {
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('submenu')) {
                    submenu.classList.toggle('show');
                    return; // الخروج من الدالة لتجنب تغيير الأقسام
                }
            }
            
            // إزالة الفئة النشطة من جميع الروابط
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط الحالي
            this.classList.add('active');
            
            // عرض القسم المطلوب وإخفاء باقي الأقسام
            showSection(targetId);
        });
    });
    
    // عرض قسم لوحة القيادة افتراضيًا
    showSection('dashboard');
}

// عرض القسم المطلوب وإخفاء باقي الأقسام
function showSection(sectionId) {
    // الحصول على جميع أقسام لوحة التحكم
    const sections = document.querySelectorAll('.dashboard-section');
    
    // إخفاء جميع الأقسام
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    
    // عرض القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    }
    
    // إغلاق القائمة الجانبية في الشاشات الصغيرة
    if (window.innerWidth < 992) {
        document.body.classList.add('sidebar-collapsed');
    }
}

// تهيئة أزرار العودة إلى لوحة القيادة
function initBackButtons() {
    // إنشاء أزرار العودة لكل قسم (ما عدا لوحة القيادة نفسها)
    const sections = document.querySelectorAll('.dashboard-section:not(#dashboard)');
    
    sections.forEach(section => {
        // التحقف من عدم وجود زر العودة مسبقًا
        if (!section.querySelector('.back-to-dashboard')) {
            // إنشاء زر العودة
            const backButton = document.createElement('button');
            backButton.className = 'btn btn-outline-primary back-to-dashboard';
            backButton.innerHTML = '<i class="fas fa-arrow-right"></i> العودة إلى لوحة القيادة';
            
            // إضافة مستمع حدث للزر
            backButton.addEventListener('click', function() {
                // عرض قسم لوحة القيادة
                showSection('dashboard');
                
                // تحديث الرابط النشط في القائمة الجانبية
                const dashboardLink = document.querySelector('.sidebar-nav a[href="#dashboard"]');
                if (dashboardLink) {
                    const allLinks = document.querySelectorAll('.sidebar-nav a');
                    allLinks.forEach(link => link.classList.remove('active'));
                    dashboardLink.classList.add('active');
                }
            });
            
            // إضافة الزر إلى بداية القسم (بعد العنوان)
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.appendChild(backButton);
            } else {
                // إذا لم يكن هناك عنوان، أضف الزر إلى بداية القسم
                section.prepend(backButton);
            }
        }
    });
}

// تهيئة الإشعارات
function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع انتشار الحدث
            notificationDropdown.classList.toggle('show');
        });
        
        // إغلاق القائمة المنسدلة عند النقر في أي مكان آخر
        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // تعيين جميع الإشعارات كمقروءة
    const markAllReadBtn = document.querySelector('.notification-header a');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
            
            // إزالة شارة العدد
            const badge = document.querySelector('.notification-btn .badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }
}

// دالة مساعدة لعرض إشعارات للمستخدم
function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    const notificationsContainer = document.querySelector('.notifications-container');
    if (!notificationsContainer) {
        // إنشاء حاوية الإشعارات إذا لم تكن موجودة
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
        container.appendChild(notification);
    } else {
        notificationsContainer.appendChild(notification);
    }
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // إزالة الإشعار تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// تهيئة قسم الإحصائيات
function initStatistics() {
    // تهيئة مخططات الإحصائيات التفاعلية
    if (document.getElementById('sales-trend-chart')) {
        const salesTrendOptions = {
            series: [{
                name: 'المبيعات',
                data: [3100, 4000, 2800, 5100, 4200, 8200, 5600, 4500, 6000, 5400, 6200, 7800]
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                    }
                },
                fontFamily: 'Tajawal, sans-serif',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                labels: {
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return val.toFixed(0) + ' دج';
                    },
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val.toFixed(0) + ' دج';
                    }
                }
            },
            colors: ['#2ecc71']
        };

        const salesTrendChart = new ApexCharts(document.getElementById('sales-trend-chart'), salesTrendOptions);
        salesTrendChart.render();
    }
    
    // مخطط المنتجات الأكثر مبيعاً
    if (document.getElementById('top-products-chart')) {
        const topProductsOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: '100%',
                height: 350,
                type: 'pie',
                fontFamily: 'Tajawal, sans-serif',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                },
                events: {
                    dataPointSelection: function(event, chartContext, config) {
                        // عرض معلومات إضافية عند النقر على قطاع
                        const products = ['زيت زيتون', 'عسل طبيعي', 'جبن بلدي', 'تمر دقلة نور', 'زعتر بلدي'];
                        const selectedProduct = products[config.dataPointIndex];
                        showNotification(`المنتج: ${selectedProduct} - المبيعات: ${config.w.config.series[config.dataPointIndex]} وحدة`);
                    }
                }
            },
            labels: ['زيت زيتون', 'عسل طبيعي', 'جبن بلدي', 'تمر دقلة نور', 'زعتر بلدي'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6'],
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + ' وحدة';
                    }
                }
            },
            legend: {
                position: 'bottom',
                fontFamily: 'Tajawal, sans-serif',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    radius: 12
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                }
            }
        };

        const topProductsChart = new ApexCharts(document.getElementById('top-products-chart'), topProductsOptions);
        topProductsChart.render();
    }
    
    // مخطط العملاء الجدد
    if (document.getElementById('new-customers-chart')) {
        const newCustomersOptions = {
            series: [{
                name: 'العملاء الجدد',
                data: [5, 8, 12, 14, 16, 19, 22, 25, 28, 30, 33, 35]
            }],
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: true
                },
                fontFamily: 'Tajawal, sans-serif',
                animations: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top'
                    },
                    columnWidth: '60%',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 10,
                            color: '#9b59b6'
                        }, {
                            from: 11,
                            to: 20,
                            color: '#3498db'
                        }, {
                            from: 21,
                            to: 50,
                            color: '#2ecc71'
                        }]
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                    return val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"],
                    fontFamily: 'Tajawal, sans-serif'
                }
            },
            xaxis: {
                categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                position: 'bottom',
                labels: {
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            colors: ['#9b59b6']
        };

        const newCustomersChart = new ApexCharts(document.getElementById('new-customers-chart'), newCustomersOptions);
        newCustomersChart.render();
    }
    
    // مخطط الإيرادات حسب التصنيف
    if (document.getElementById('revenue-by-category-chart')) {
        const revenueByCategoryOptions = {
            series: [{
                name: 'الإيرادات',
                data: [5500, 4200, 3800, 2900, 1800]
            }],
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: true
                },
                fontFamily: 'Tajawal, sans-serif',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
                animations: {
                    enabled: true
                }
            },
            stroke: {
                width: 2
            },
            fill: {
                opacity: 0.1
            },
            markers: {
                size: 5,
                hover: {
                    size: 8
                }
            },
            xaxis: {
                categories: ['زيوت', 'عسل', 'منتجات ألبان', 'تمور', 'أعشاب'],
                labels: {
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return val.toFixed(0) + ' دج';
                    },
                    style: {
                        fontFamily: 'Tajawal, sans-serif'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val.toFixed(0) + ' دج';
                    }
                }
            },
            colors: ['#3498db']
        };

        const revenueByCategoryChart = new ApexCharts(document.getElementById('revenue-by-category-chart'), revenueByCategoryOptions);
        revenueByCategoryChart.render();
    }
    
    // إضافة مستمع حدث لتغيير الفترة الزمنية
    const statsPeriod = document.getElementById('stats-period');
    if (statsPeriod) {
        statsPeriod.addEventListener('change', function() {
            // محاكاة تحديث البيانات عند تغيير الفترة الزمنية
            showNotification('تم تحديث البيانات للفترة: ' + this.options[this.selectedIndex].text);
            
            // هنا يمكن إضافة كود لتحديث المخططات بناءً على الفترة المختارة
            // في التطبيق الحقيقي، ستقوم بجلب البيانات من الخادم
        });
    }
}
