// وظائف النوافذ المنبثقة
function showPaymentOptions() {
    document.getElementById('payment-options-modal').style.display = 'block';
}

function showCashOnDeliveryForm() {
    closeModal('payment-options-modal');
    document.getElementById('cash-on-delivery-modal').style.display = 'block';
}

function showCreditCardForm() {
    closeModal('payment-options-modal');
    document.getElementById('credit-card-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// إغلاق النوافذ المنبثقة عند النقر خارجها
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
}

// تحديث عرض بطاقة الائتمان
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود العناصر قبل إضافة مستمعي الأحداث
    const cardNumberInput = document.getElementById('card-number');
    const cardHolderInput = document.getElementById('card-holder');
    const expiryDateInput = document.getElementById('expiry-date');
    const ccvInput = document.getElementById('ccv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            this.value = value;
            document.getElementById('card-number-display').textContent = value || '**** **** **** ****';
        });
    }
    
    if (cardHolderInput) {
        cardHolderInput.addEventListener('input', function() {
            document.getElementById('card-holder-display').textContent = this.value || 'اسم حامل البطاقة';
        });
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
            document.getElementById('card-expiry-display').textContent = value || 'MM/YY';
        });
    }
    
    if (ccvInput) {
        ccvInput.addEventListener('input', function() {
            document.getElementById('ccv-display').textContent = this.value || '***';
        });
        
        ccvInput.addEventListener('focus', function() {
            document.querySelector('.card').classList.add('flipped');
        });
        
        ccvInput.addEventListener('blur', function() {
            document.querySelector('.card').classList.remove('flipped');
        });
    }
    
    // معالجة نموذج الدفع عند الاستلام
    const deliveryForm = document.getElementById('delivery-form');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // هنا يمكنك إضافة كود لإرسال البيانات إلى قاعدة البيانات
            // في الوقت الحالي سنعرض رسالة تأكيد فقط
            showOrderConfirmation();
        });
    }
    
    // معالجة نموذج بطاقة الائتمان
    const creditCardForm = document.getElementById('credit-card-form');
    if (creditCardForm) {
        creditCardForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // هنا يمكنك إضافة كود للتحقق من بطاقة الائتمان وإجراء عملية الدفع
            // في الوقت الحالي سنعرض رسالة تأكيد فقط
            showOrderConfirmation();
        });
    }
});

// عرض رسالة تأكيد الطلب
function showOrderConfirmation() {
    // إنشاء رقم طلب عشوائي
    const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('order-number').textContent = orderNumber;
    
    // إغلاق جميع النوافذ المنبثقة وعرض رسالة التأكيد
    closeModal('cash-on-delivery-modal');
    closeModal('credit-card-modal');
    document.getElementById('order-confirmation-modal').style.display = 'block';
    
    // تفريغ سلة التسوق
    clearCart();
}

// تفريغ سلة التسوق بعد إتمام الطلب
function clearCart() {
    cartItems = [];
    updateCartDisplay();
}

// تعديل وظيفة checkout الحالية
function checkout() {
    // بدلاً من التنبيه، نعرض خيارات الدفع
    showPaymentOptions();
}