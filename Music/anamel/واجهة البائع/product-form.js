// مصفوفة لتخزين المنتجات المضافة
let products = [];

// انتظار تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على العناصر
    const addProductBtn = document.getElementById('add-product-btn');
    const closeFormBtn = document.getElementById('close-form-btn');
    const addProductForm = document.getElementById('add-product-form');
    const saveProductBtn = document.getElementById('save-product-btn');
    const cancelProductBtn = document.getElementById('cancel-product-btn');
    const productImage = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    const productsList = document.getElementById('products-list');
    
    // إضافة مستمعي الأحداث
    addProductBtn.addEventListener('click', showForm);
    closeFormBtn.addEventListener('click', hideForm);
    cancelProductBtn.addEventListener('click', hideForm);
    saveProductBtn.addEventListener('click', saveProduct);
    productImage.addEventListener('change', previewImage);
    
    // إظهار النموذج
    function showForm() {
        addProductForm.style.display = 'block';
        resetForm();
    }
    
    // إخفاء النموذج
    function hideForm() {
        addProductForm.style.display = 'none';
    }
    
    // معاينة الصورة المختارة
    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreview.innerHTML = '';
            };
            reader.readAsDataURL(file);
        }
    }
    
    // حفظ المنتج
    function saveProduct() {
        // الحصول على قيم الحقول
        const title = document.getElementById('product-title').value;
        const description = document.getElementById('product-description').value;
        const price = document.getElementById('product-price').value;
        const minQuantity = document.getElementById('product-min-quantity').value;
        const category = document.getElementById('product-category').value;
        const imageFile = document.getElementById('product-image').files[0];
        
        // التحقق من الحقول المطلوبة
        if (!title || !description || !price || !minQuantity || !category) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // إنشاء كائن المنتج
        const product = {
            id: Date.now(), // استخدام الطابع الزمني كمعرف فريد
            title,
            description,
            price: price ? `${price} دج` : 'غير محدد',
            minQuantity: minQuantity ? minQuantity : '1',
            category,
            image: imageFile ? URL.createObjectURL(imageFile) : null
        };
        
        // إضافة المنتج إلى المصفوفة
        products.push(product);
        
        // عرض المنتج في القائمة
        renderProducts();
        
        // إعادة تعيين النموذج وإخفائه
        resetForm();
        hideForm();
    }
    
    // عرض المنتجات في القائمة
    function renderProducts() {
        productsList.innerHTML = '';
        
        if (products.length === 0) {
            productsList.innerHTML = '<p class="no-products">لا توجد منتجات مضافة بعد</p>';
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image || 'https://via.placeholder.com/300x180?text=لا+توجد+صورة'}')">
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.title}</h4>
                    <p class="product-description">${product.description}</p>
                    <p class="product-category"><i class="fas fa-tag"></i> ${getCategoryName(product.category)}</p>
                    <div class="product-price">${product.price}</div>
                    <div class="product-min-quantity">أقل كمية: ${product.minQuantity}</div>
                    <div class="product-actions">
                        <button class="action-btn edit" data-id="${product.id}"><i class="fas fa-edit"></i> تعديل</button>
                        <button class="action-btn delete" data-id="${product.id}"><i class="fas fa-trash"></i> حذف</button>
                    </div>
                </div>
            `;
            productsList.appendChild(productCard);
            
            // إضافة مستمعي أحداث لأزرار التعديل والحذف
            productCard.querySelector('.action-btn.edit').addEventListener('click', () => editProduct(product.id));
            productCard.querySelector('.action-btn.delete').addEventListener('click', () => deleteProduct(product.id));
        });
    }
    
    // الحصول على اسم التصنيف بناءً على قيمته
    function getCategoryName(categoryValue) {
        const categories = {
            'oil': 'زيوت',
            'honey': 'عسل',
            'dairy': 'منتجات ألبان',
            'dates': 'تمور',
            'herbs': 'أعشاب وتوابل',
            'fruits': 'فواكه'
        };
        return categories[categoryValue] || 'غير محدد';
    }
    
    // تعديل منتج
    function editProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;
        
        // ملء النموذج بمعلومات المنتج
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price.replace(' دج', '');
        document.getElementById('product-min-quantity').value = product.minQuantity;
        document.getElementById('product-category').value = product.category;
        
        if (product.image) {
            imagePreview.style.backgroundImage = `url(${product.image})`;
            imagePreview.innerHTML = '';
        }
        
        // تغيير وظيفة زر الحفظ لتحديث المنتج بدلاً من إضافة منتج جديد
        saveProductBtn.removeEventListener('click', saveProduct);
        saveProductBtn.addEventListener('click', function updateProduct() {
            // تحديث المنتج
            product.title = document.getElementById('product-title').value;
            product.description = document.getElementById('product-description').value;
            product.price = document.getElementById('product-price').value ? `${document.getElementById('product-price').value} دج` : 'غير محدد';
            product.minQuantity = document.getElementById('product-min-quantity').value;
            product.category = document.getElementById('product-category').value;
            
            const imageFile = document.getElementById('product-image').files[0];
            if (imageFile) {
                product.image = URL.createObjectURL(imageFile);
            }
            
            // إعادة عرض المنتجات
            renderProducts();
            
            // إعادة تعيين النموذج وإخفائه
            resetForm();
            hideForm();
            
            // إعادة تعيين مستمع الحدث الأصلي
            saveProductBtn.removeEventListener('click', updateProduct);
            saveProductBtn.addEventListener('click', saveProduct);
        });
        
        // إظهار النموذج
        addProductForm.style.display = 'block';
    }
    
    // حذف منتج
    function deleteProduct(id) {
        if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
            products = products.filter(p => p.id !== id);
            renderProducts();
        }
    }
    
    // إعادة تعيين النموذج
    function resetForm() {
        document.getElementById('product-title').value = '';
        document.getElementById('product-description').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-min-quantity').value = '';
        document.getElementById('product-category').value = '';
        document.getElementById('product-image').value = '';
        imagePreview.style.backgroundImage = '';
        imagePreview.innerHTML = '<i class="fas fa-image"></i><span>اختر صورة</span>';
    }
    
    // عرض المنتجات عند تحميل الصفحة
    renderProducts();
});