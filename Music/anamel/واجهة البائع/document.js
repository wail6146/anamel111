document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المخططات البيانية
    initCharts();
    
    // تهيئة الأحداث للقائمة الجانبية
    initSidebar();
    
    // تهيئة نموذج إضافة المنتج
    initProductForm();
    
    // إضافة أزرار العودة إلى لوحة القيادة
    addBackToDashboardButtons();
    
    // تحميل المنتجات
    loadProducts();
});

// تهيئة المخططات البيانية
function initCharts() {
    // مخطط المبيعات
    if (document.getElementById('sales-chart')) {
        const salesChartOptions = {
            series: [{
                name: 'المبيعات',
                data: [31, 40, 28, 51, 42, 82, 56]
            }],
            chart: {
                height: 100,
                type: 'area',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: true
                },
                fontFamily: 'Tajawal, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                }
            },
            colors: ['#2ecc71']
        };

        const salesChart = new ApexCharts(document.getElementById('sales-chart'), salesChartOptions);
        salesChart.render();
    }
    
    // مخطط الطلبات
    if (document.getElementById('orders-chart')) {
        const ordersChartOptions = {
            series: [{
                name: 'الطلبات',
                data: [10, 15, 8, 14, 12, 18, 16]
            }],
            chart: {
                height: 100,
                type: 'area',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: true
                },
                fontFamily: 'Tajawal, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                }
            },
            colors: ['#3498db']
        };

        const ordersChart = new ApexCharts(document.getElementById('orders-chart'), ordersChartOptions);
        ordersChart.render();
    }
    
    // مخطط العملاء
    if (document.getElementById('customers-chart')) {
        const customersChartOptions = {
            series: [{
                name: 'العملاء',
                data: [5, 8, 12, 14, 16, 19, 22]
            }],
            chart: {
                height: 100,
                type: 'area',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: true
                },
                fontFamily: 'Tajawal, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                }
            },
            colors: ['#9b59b6']
        };

        const customersChart = new ApexCharts(document.getElementById('customers-chart'), customersChartOptions);
        customersChart.render();
    }
    
    // مخطط المنتجات
    if (document.getElementById('products-chart')) {
        const productsChartOptions = {
            series: [{
                name: 'المنتجات',
                data: [8, 10, 12, 14, 15, 15, 15]
            }],
            chart: {
                height: 100,
                type: 'area',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: true
                },
                fontFamily: 'Tajawal, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                }
            },
            colors: ['#f39c12']
        };

        const productsChart = new ApexCharts(document.getElementById('products-chart'), productsChartOptions);
        productsChart.render();
    }
    
    // مخطط أفضل المنتجات
    if (document.getElementById('top-products-chart')) {
        const topProductsOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: '100%',
                height: 350,
                type: 'pie',
                fontFamily: 'Tajawal, sans-serif',
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
            colors: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6']
        };

        const topProductsChart = new ApexCharts(document.getElementById('top-products-chart'), topProductsOptions);
        topProductsChart.render();
    }
    
    // مخطط الإحصائيات
    if (document.getElementById('statistics-chart')) {
        const statisticsOptions = {
            series: [{
                name: 'المبيعات',
                data: [31, 40, 28, 51, 42, 82, 56, 45, 60, 54, 62, 78]
            }, {
                name: 'الطلبات',
                data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42]
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
                fontFamily: 'Tajawal, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'category',
                categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
            colors: ['#2ecc71', '#3498db']
        };

        const statisticsChart = new ApexCharts(document.getElementById('statistics-chart'), statisticsOptions);
        statisticsChart.render();
    }
}

// تهيئة القائمة الجانبية
function initSidebar() {
    // تبديل القائمة الجانبية
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }
    
    // تنشيط روابط القائمة الجانبية
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على الهدف من الرابط
            const targetId = this.getAttribute('href').substring(1);
            
            // إذا كان الرابط له قائمة فرعية، نتوقف هنا
            if (this.classList.contains('has-dropdown')) {
                return;
            }
            
            // إزالة الفئة النشطة من جميع الروابط
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط المضغوط
            this.classList.add('active');
            
            // إخفاء جميع أقسام لوحة التحكم
            const dashboardSections = document.querySelectorAll('.dashboard-section');
            dashboardSections.forEach(section => {
                section.classList.add('d-none');
            });
            
            // إظهار القسم المطلوب
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('d-none');
            }
            
            // إغلاق القائمة الجانبية في الشاشات الصغيرة
            if (window.innerWidth < 992) {
                document.body.classList.add('sidebar-collapsed');
            }
        });
    });
    
    // فتح/إغلاق القوائم الفرعية
    const submenuToggles = document.querySelectorAll('.has-dropdown');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('submenu-open');
        });
    });
    
    // تنشيط روابط القائمة الفرعية
    const submenuLinks = document.querySelectorAll('.submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على الهدف من الرابط
            const targetId = this.getAttribute('href').substring(1);
            
            // إزالة الفئة النشطة من جميع الروابط
            sidebarLinks.forEach(l => l.classList.remove('active'));
            submenuLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط المضغوط
            this.classList.add('active');
            
            // إخفاء جميع أقسام لوحة التحكم
            const dashboardSections = document.querySelectorAll('.dashboard-section');
            dashboardSections.forEach(section => {
                section.classList.add('d-none');
            });
            
            // إظهار القسم المطلوب
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('d-none');
            }
            
            // إغلاق القائمة الجانبية في الشاشات الصغيرة
            if (window.innerWidth < 992) {
                document.body.classList.add('sidebar-collapsed');
            }
        });
    });
}

// إضافة أزرار العودة إلى لوحة القيادة
function addBackToDashboardButtons() {
    // الأقسام التي نريد إضافة زر العودة لها
    const sections = [
        'profile',
        'products',
        'orders',
        'messages',
        'statistics',
        'settings'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            // التحقق من وجود زر العودة بالفعل
            if (!section.querySelector('.back-to-dashboard')) {
                // إنشاء زر العودة
                const backButton = document.createElement('button');
                backButton.className = 'btn btn-outline-primary back-to-dashboard';
                backButton.innerHTML = '<i class="fas fa-arrow-right"></i> العودة إلى لوحة القيادة';
                
                // إضافة حدث النقر
                backButton.addEventListener('click', function() {
                    // إخفاء جميع الأقسام
                    const dashboardSections = document.querySelectorAll('.dashboard-section');
                    dashboardSections.forEach(s => {
                        s.classList.add('d-none');
                    });
                    
                    // إظهار لوحة القيادة
                    const dashboard = document.getElementById('dashboard');
                    if (dashboard) {
                        dashboard.classList.remove('d-none');
                    }
                    
                    // تحديث الرابط النشط في القائمة الجانبية
                    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
                    sidebarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#dashboard') {
                            link.classList.add('active');
                        }
                    });
                });
                
                // إضافة الزر إلى القسم
                const sectionHeader = section.querySelector('.section-header');
                if (sectionHeader) {
                    sectionHeader.appendChild(backButton);
                }
            }
        }
    });
}

// تهيئة نموذج إضافة المنتج
function initProductForm() {
    const productImagesInput = document.getElementById('productImages');
    const imagesPreview = document.getElementById('imagesPreview');
    const addProductForm = document.getElementById('addProductForm');
    
    if (productImagesInput && imagesPreview) {
        productImagesInput.addEventListener('change', function() {
            previewImages(this.files);
        });
    }
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
    
    // فتح نافذة إضافة منتج جديد
    const addProductBtn = document.querySelector('[data-bs-target="#addProductModal"]');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            resetProductForm();
        });
    }
}

// عرض معاينة للصور المختارة
function previewImages(files) {
    const imagesPreview = document.getElementById('imagesPreview');
    if (!imagesPreview) return;
    
    // التحقق من عدد الصور (الحد الأقصى 5)
    if (files.length > 5) {
        alert('يمكنك تحميل 5 صور كحد أقصى');
        return;
    }
    
    // مسح المعاينات السابقة
    imagesPreview.innerHTML = '';
    
    // إنشاء معاينة لكل صورة
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'معاينة الصورة';
            
            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-image';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.addEventListener('click', function() {
                previewItem.remove();
            });
            
            // إضافة شارة للصورة الرئيسية
            if (index === 0) {
                const primaryBadge = document.createElement('span');
                primaryBadge.className = 'primary-badge';
                primaryBadge.textContent = 'رئيسية';
                previewItem.appendChild(primaryBadge);
            }
            
            previewItem.appendChild(img);
            previewItem.appendChild(removeBtn);
            imagesPreview.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    });
}

// إعادة تعيين نموذج إضافة المنتج
function resetProductForm() {
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.reset();
    }
    
    const imagesPreview = document.getElementById('imagesPreview');
    if (imagesPreview) {
        imagesPreview.innerHTML = '';
    }
}

// حفظ المنتج (محاكاة بدون خلفية)
function saveProduct() {
    // جمع بيانات النموذج
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productUnit = document.getElementById('productUnit').value;
    const productDiscount = document.getElementById('productDiscount').value || null;
    const productDescription = document.getElementById('productDescription').value;
    
    // محاكاة حفظ المنتج (بدون خلفية)
    setTimeout(() => {
        // إغلاق النافذة المنبثقة
        const modal = document.getElementById('addProductModal');
        if (modal && typeof bootstrap !== 'undefined') {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        }
        
        // عرض رسالة نجاح
        showNotification('تم حفظ المنتج بنجاح');
        
        // إعادة تعيين النموذج
        resetProductForm();
        
        // إضافة المنتج إلى القائمة (محاكاة)
        addProductToGrid({
            name: productName,
            category: productCategory,
            price: productPrice,
            quantity: productQuantity,
            unit: productUnit,
            discount: productDiscount,
            description: productDescription,
            image: '../imag/Oliveoli.jpg' // صورة افتراضية
        });
    }, 1000);
}

// إضافة منتج إلى الشبكة
function addProductToGrid(product) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
                <button class="edit-product"><i class="fas fa-edit"></i></button>
                <button class="delete-product"><i class="fas fa-trash"></i></button>
            </div>
            <span class="product-status active">نشط</span>
        </div>
        <div class="product-details">
            <h4>${product.name}</h4>
            <p class="product-category"><i class="fas fa-tag"></i> ${product.category}</p>
            <div class="product-meta">
                <span class="product-price">${product.price} دج</span>
                <span class="product-stock"><i class="fas fa-cubes"></i> ${product.quantity} ${product.unit}</span>
            </div>
        </div>
    `;
    
    // إضافة أحداث للأزرار
    const editBtn = productCard.querySelector('.edit-product');
    const deleteBtn = productCard.querySelector('.delete-product');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            // محاكاة تحرير المنتج
            alert('تحرير المنتج: ' + product.name);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            // محاكاة حذف المنتج
            if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                productCard.remove();
                showNotification('تم حذف المنتج بنجاح');
            }
        });
    }
    
    // إضافة البطاقة إلى الشبكة
    productsGrid.prepend(productCard);
}

// عرض إشعار
function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إضافة حدث إغلاق الإشعار
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
    }
    
    // إزالة الإشعار تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// تحميل المنتجات (محاكاة)
// تحسين وظيفة تحميل المنتجات
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // إضافة فلتر البحث
    const searchFilter = document.querySelector('.search-filter input');
    if (searchFilter) {
        searchFilter.addEventListener('input', function() {
            filterProducts();
        });
    }
    
    // إضافة فلتر التصنيف
    const categoryFilter = document.querySelector('.category-filter select');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // إضافة فلتر الحالة
    const statusFilter = document.querySelector('.status-filter select');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // وظيفة فلترة المنتجات
    function filterProducts() {
        const searchTerm = searchFilter ? searchFilter.value.trim().toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        const status = statusFilter ? statusFilter.value : '';
        
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h4').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            const productStatus = card.querySelector('.product-status').classList.contains('active') ? 'active' : 
                                card.querySelector('.product-status').classList.contains('out-of-stock') ? 'out-of-stock' : 'inactive';
            
            // تطبيق الفلاتر
            const matchesSearch = searchTerm === '' || productName.includes(searchTerm);
            const matchesCategory = category === '' || productCategory.includes(category);
            const matchesStatus = status === '' || productStatus === status;
            
            // إظهار أو إخفاء البطاقة
            if (matchesSearch && matchesCategory && matchesStatus) {
                card.style.display = 'block';
                // إضافة تأثير حركي للبطاقات المعروضة
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // عرض رسالة إذا لم يتم العثور على منتجات
        const visibleProducts = document.querySelectorAll('.product-card[style="display: block"]');
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (visibleProducts.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.textContent = 'لم يتم العثور على منتجات مطابقة للفلاتر المحددة';
                productsGrid.appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    
    // تحسين بطاقات المنتجات
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // إضافة تأثير حركي عند التحويم
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // إضافة وظيفة العرض السريع
        const productImage = card.querySelector('.product-image img');
        if (productImage) {
            productImage.addEventListener('click', function() {
                const productName = card.querySelector('h4').textContent;
                const productCategory = card.querySelector('.product-category').textContent;
                const productPrice = card.querySelector('.product-price').textContent;
                
                // إنشاء نافذة العرض السريع
                showQuickView({
                    name: productName,
                    category: productCategory,
                    price: productPrice,
                    image: this.src
                });
            });
        }
    });
}

// وظيفة العرض السريع للمنتج
function showQuickView(product) {
    // إنشاء عنصر العرض السريع
    const quickView = document.createElement('div');
    quickView.className = 'quick-view-modal';
    
    quickView.innerHTML = `
        <div class="quick-view-content">
            <button class="close-quick-view"><i class="fas fa-times"></i></button>
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <h3>${product.name}</h3>
                <p class="quick-view-category">${product.category}</p>
                <p class="quick-view-price">${product.price}</p>
                <div class="quick-view-actions">
                    <button class="btn btn-primary edit-product-btn"><i class="fas fa-edit"></i> تعديل المنتج</button>
                    <button class="btn btn-danger delete-product-btn"><i class="fas fa-trash"></i> حذف المنتج</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة العنصر إلى الصفحة
    document.body.appendChild(quickView);
    
    // إظهار العنصر بتأثير حركي
    setTimeout(() => {
        quickView.classList.add('show');
    }, 10);
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeBtn = quickView.querySelector('.close-quick-view');
    closeBtn.addEventListener('click', function() {
        quickView.classList.remove('show');
        setTimeout(() => {
            quickView.remove();
        }, 300);
    });
    
    // إضافة مستمع حدث لزر التعديل
    const editBtn = quickView.querySelector('.edit-product-btn');
    editBtn.addEventListener('click', function() {
        // محاكاة فتح نافذة تعديل المنتج
        alert('تحرير المنتج: ' + product.name);
        quickView.classList.remove('show');
        setTimeout(() => {
            quickView.remove();
        }, 300);
    });
    
    // إضافة مستمع حدث لزر الحذف
    const deleteBtn = quickView.querySelector('.delete-product-btn');
    deleteBtn.addEventListener('click', function() {
        // محاكاة حذف المنتج
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            showNotification('تم حذف المنتج بنجاح');
            quickView.classList.remove('show');
            setTimeout(() => {
                quickView.remove();
            }, 300);
        }
    });
}

// تهيئة قسم الرسائل
function initMessages() {
    const messageItems = document.querySelectorAll('.message-item');
    if (messageItems.length > 0) {
        messageItems.forEach(item => {
            item.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع العناصر
                messageItems.forEach(i => i.classList.remove('active'));
                // إضافة الفئة النشطة للعنصر المضغوط
                this.classList.add('active');
                // إزالة فئة غير مقروء
                this.classList.remove('unread');
            });
        });
    }
    
    // إرسال رسالة جديدة
    const messageForm = document.querySelector('.messages-footer');
    const messageInput = messageForm ? messageForm.querySelector('input') : null;
    const sendBtn = messageForm ? messageForm.querySelector('.send-btn') : null;
    
    if (messageForm && messageInput && sendBtn) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
        
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
    }
    
    function sendMessage() {
        if (!messageInput.value.trim()) return;
        
        const messagesBody = document.querySelector('.messages-body');
        if (messagesBody) {
            // إنشاء عنصر الرسالة
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${messageInput.value}</p>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
            
            // إضافة الرسالة إلى المحادثة
            messagesBody.appendChild(messageElement);
            
            // تمرير إلى أسفل
            messagesBody.scrollTop = messagesBody.scrollHeight;
            
            // مسح حقل الإدخال
            messageInput.value = '';
            
            // محاكاة رد تلقائي بعد ثانيتين
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message received';
                replyElement.innerHTML = `
                    <div class="message-content">
                        <p>شكراً لتواصلك، سيتم الرد عليك قريباً.</p>
                        <span class="message-time">${getCurrentTime()}</span>
                    </div>
                `;
                
                messagesBody.appendChild(replyElement);
                messagesBody.scrollTop = messagesBody.scrollHeight;
            }, 2000);
        }
    }
    
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // تنسيق الوقت
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes;
    }
}

// استدعاء وظيفة تهيئة الرسائل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initMessages();
});