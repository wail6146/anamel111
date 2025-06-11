// متغيرات عامة
let cart = [];
let totalPrice = 0;

// تهيئة المتجر بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحقق مما إذا كانت هناك سلة محفوظة في التخزين المحلي
    const savedCart = localStorage.getItem('storeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartTotal();
        updateCart();
    }
    
    // تنشيط أزرار التصفية
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');
            // يمكن إضافة منطق التصفية هنا لاحقاً
        });
    });
    
    // إضافة مستمعي الأحداث لأزرار العرض السريع
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // استرجاع معلومات المنتج من العنصر الأصل
            const productElement = this.closest('.product');
            const productName = productElement.querySelector('h3').innerText;
            const productImage = productElement.querySelector('img').src;
            const productPrice = productElement.querySelector('.price').innerText;
            const productDescription = productElement.querySelector('p').innerText;
            
            // عرض نافذة العرض السريع
            showQuickView(productName, productImage, productPrice, productDescription);
        });
    });
    
    // مستمع الأحداث لنموذج النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // إظهار رسالة تأكيد
                alert('شكراً لاشتراكك في نشرتنا البريدية!');
                emailInput.value = '';
            }
        });
    }
});

// إضافة منتج إلى السلة
function addToCart(name, price) {
    // التحقق مما إذا كان المنتج موجوداً بالفعل في السلة
    const existingProductIndex = cart.findIndex(item => item.name === name);
    
    if (existingProductIndex !== -1) {
        // إذا كان المنتج موجوداً بالفعل، قم بزيادة الكمية
        cart[existingProductIndex].quantity += 1;
    } else {
        // إذا لم يكن المنتج موجوداً، أضفه بكمية 1
        cart.push({ name, price, quantity: 1 });
    }
    
    // تحديث السلة والمجموع
    updateCartTotal();
    updateCart();
    
    // حفظ السلة في التخزين المحلي
    saveCart();
    
    // إظهار رسالة تأكيد
    showNotification(`تمت إضافة ${name} إلى السلة`);
    
    // فتح السلة
    toggleCart(true);
}

// تحديث قيمة إجمالي السلة
function updateCartTotal() {
    totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// تحديث عرض السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    
    // مسح محتويات السلة الحالية
    cartItems.innerHTML = "";
    
    // التحقق مما إذا كانت السلة فارغة
    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-cart">السلة فارغة</li>';
    } else {
        // إنشاء عناصر قائمة لكل منتج في السلة
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            
            const itemInfo = document.createElement('div');
            itemInfo.className = 'item-info';
            
            const itemName = document.createElement('span');
            itemName.className = 'item-name';
            itemName.textContent = item.name;
            
            const itemPrice = document.createElement('span');
            itemPrice.className = 'item-price';
            itemPrice.textContent = `${item.price} دج × ${item.quantity}`;
            
            itemInfo.appendChild(itemName);
            itemInfo.appendChild(itemPrice);
            
            const itemActions = document.createElement('div');
            itemActions.className = 'item-actions';
            
            const decreaseBtn = document.createElement('button');
            decreaseBtn.className = 'quantity-btn';
            decreaseBtn.textContent = '-';
            decreaseBtn.onclick = () => decreaseQuantity(index);
            
            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'quantity';
            quantitySpan.textContent = item.quantity;
            
            const increaseBtn = document.createElement('button');
            increaseBtn.className = 'quantity-btn';
            increaseBtn.textContent = '+';
            increaseBtn.onclick = () => increaseQuantity(index);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.onclick = () => removeFromCart(index);
            
            itemActions.appendChild(decreaseBtn);
            itemActions.appendChild(quantitySpan);
            itemActions.appendChild(increaseBtn);
            itemActions.appendChild(removeBtn);
            
            li.appendChild(itemInfo);
            li.appendChild(itemActions);
            
            cartItems.appendChild(li);
        });
    }
    
    // تحديث المجموع وعدد العناصر
    totalPriceEl.textContent = totalPrice;
    cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
}

// إزالة منتج من السلة
function removeFromCart(index) {
    // طرح سعر المنتج المزال من الإجمالي
    const removedItem = cart[index];
    totalPrice -= removedItem.price * removedItem.quantity;
    
    // إزالة المنتج من السلة
    cart.splice(index, 1);
    
    // تحديث السلة وحفظها
    updateCart();
    saveCart();
}

// زيادة كمية منتج في السلة
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartTotal();
    updateCart();
    saveCart();
}

// نقص كمية منتج في السلة
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        // إذا وصلت الكمية إلى 1، قم بإزالة المنتج
        removeFromCart(index);
        return;
    }
    
    updateCartTotal();
    updateCart();
    saveCart();
}

// عرض/إخفاء السلة
function toggleCart(show = null) {
    const cartElement = document.getElementById('cart');
    
    if (show === true) {
        cartElement.classList.add('active');
    } else if (show === false) {
        cartElement.classList.remove('active');
    } else {
        cartElement.classList.toggle('active');
    }
}

// إتمام عملية الشراء
function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة. الرجاء إضافة منتجات للسلة أولاً.');
        return;
    }
    
    alert(`تم إتمام الشراء بنجاح! المجموع: ${totalPrice} دج`);
    
    // تفريغ السلة بعد الشراء
    cart = [];
    totalPrice = 0;
    updateCart();
    saveCart();
    
    // إغلاق السلة
    toggleCart(false);
}

// حفظ السلة في التخزين المحلي
function saveCart() {
    localStorage.setItem('storeCart', JSON.stringify(cart));
}

// عرض نافذة العرض السريع
function showQuickView(name, image, price, description) {
    // إنشاء العناصر
    const overlay = document.createElement('div');
    overlay.className = 'quick-view-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = closeQuickView;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'quick-view-content';
    
    const imgDiv = document.createElement('div');
    imgDiv.className = 'quick-view-image';
    
    const productImg = document.createElement('img');
    productImg.src = image;
    productImg.alt = name;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'quick-view-info';
    
    const productTitle = document.createElement('h2');
    productTitle.textContent = name;
    
    const productDesc = document.createElement('p');
    productDesc.textContent = description;
    
    const productPriceEl = document.createElement('p');
    productPriceEl.className = 'quick-view-price';
    productPriceEl.textContent = price;
    
    // استخراج قيمة السعر من النص
    const priceValue = parseInt(price.match(/\d+/)[0]);
    
    const addButton = document.createElement('button');
    addButton.className = 'buy-btn';
    addButton.innerHTML = '<i class="fas fa-cart-plus"></i> إضافة للسلة';
    addButton.onclick = () => {
        addToCart(name, priceValue);
        closeQuickView();
    };
    
    // بناء الهيكل
    imgDiv.appendChild(productImg);
    infoDiv.appendChild(productTitle);
    infoDiv.appendChild(productDesc);
    infoDiv.appendChild(productPriceEl);
    infoDiv.appendChild(addButton);
    
    contentDiv.appendChild(imgDiv);
    contentDiv.appendChild(infoDiv);
    
    modal.appendChild(closeBtn);
    modal.appendChild(contentDiv);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // إضافة فئة نشطة بعد إدراج العناصر في DOM
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // إضافة مستمع لإغلاق النافذة عند النقر خارجها
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeQuickView();
        }
    });
}

// إغلاق نافذة العرض السريع
function closeQuickView() {
    const overlay = document.querySelector('.quick-view-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// عرض إشعار
function showNotification(message) {
    // التحقق مما إذا كان هناك إشعار موجود بالفعل
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// إضافة تأثيرات الحركة عند التمرير
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // تأثير ظهور العناصر عند التمرير إليها
    const animateElements = document.querySelectorAll('.feature, .product');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > elementPosition - windowHeight + 100) {
            element.classList.add('visible');
        }
    });
});






// ... (الكود الموجود)

// دالة إتمام عملية الشراء
function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة. الرجاء إضافة منتجات للسلة أولاً.');
        return;
    }

    const paymentMethod = prompt("اختر طريقة الدفع:\n1. بطاقة ائتمان\n2. الدفع عند الاستلام");

    if (paymentMethod === '1') {
        showCreditCardForm(totalPrice);
    } else if (paymentMethod === '2') {
        showCheckoutModal(`المجموع: ${totalPrice} دج مع الدفع عند الاستلام.`);
        cart = [];
        totalPrice = 0;
        updateCart();
        saveCart();
        toggleCart(false);
    } else {
        alert('طريقة الدفع غير صحيحة.');
    }
}


// ... (الكود الموجود)
function showCreditCardForm(total) {
    const existing = document.querySelector('.credit-card-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'checkout-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'credit-card-modal';

    modal.innerHTML = `
        <h2>بيانات البطاقة الائتمانية</h2>
        <form id="credit-card-form">
            <input type="text" placeholder="الاسم على البطاقة" required />
            <input type="text" placeholder="رقم البطاقة" maxlength="16" required />
            <input type="text" placeholder="MM/YY" maxlength="5" required />
            <input type="text" placeholder="CVC" maxlength="4" required />
            <button type="submit">تأكيد الدفع (${total} دج)</button>
            <button type="button" class="modal-close-btn">إلغاء</button>
        </form>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    // إغلاق
    modal.querySelector('.modal-close-btn').onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };

    // عند التأكيد
    modal.querySelector('#credit-card-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // هنا يمكنك إرسال البيانات لسيرفر أو التحقق منها
        showCheckoutModal(`تم الدفع بنجاح! المجموع: ${total} دج باستخدام بطاقة ائتمان.`);

        cart = [];
        totalPrice = 0;
        updateCart();
        saveCart();
        toggleCart(false);

        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    });
}
  /*code jdid */
  function showCreditCardForm(total) {
    const existing = document.querySelector('.credit-card-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'checkout-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'credit-card-modal';

    modal.innerHTML = `
        <h2>بيانات البطاقة الائتمانية</h2>
        <form id="credit-card-form">
            <input type="text" placeholder="الاسم على البطاقة" required />
            <input type="text" placeholder="رقم البطاقة" maxlength="16" required />
            <input type="text" placeholder="MM/YY" maxlength="5" required />
            <input type="text" placeholder="CVC" maxlength="4" required />
            <button type="submit">تأكيد الدفع (${total} دج)</button>
            <button type="button" class="modal-close-btn">إلغاء</button>
        </form>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    // إغلاق
    modal.querySelector('.modal-close-btn').onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };

    // عند التأكيد
    modal.querySelector('#credit-card-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // هنا يمكنك إرسال البيانات لسيرفر أو التحقق منها
        showCheckoutModal(`تم الدفع بنجاح! المجموع: ${total} دج باستخدام بطاقة ائتمان.`);

        cart = [];
        totalPrice = 0;
        updateCart();
        saveCart();
        toggleCart(false);

        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    });
}


