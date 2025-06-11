document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customerRegistrationForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // قائمة الولايات والبلديات (يمكن تحميلها من ملف JSON منفصل)
    const wilayaSelect = document.getElementById('wilaya');
    const communeSelect = document.getElementById('commune');

    // التحقق من تطابق كلمات المرور
    function validatePassword() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    password.addEventListener('change', validatePassword);
    confirmPassword.addEventListener('keyup', validatePassword);

    // التحقق من صحة النموذج قبل الإرسال
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (form.checkValidity()) {
            // إرسال البيانات إلى الخادم
            const formData = new FormData(form);
            fetch('process-customer-registration.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('تم التسجيل بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول.');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
            });
        }
    });
});