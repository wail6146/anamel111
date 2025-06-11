class PasswordRecovery {
    constructor() {
        // النماذج
        this.emailForm = document.getElementById('emailForm');
        this.verificationForm = document.getElementById('verificationForm');
        this.resetPasswordForm = document.getElementById('resetPasswordForm');
        
        // مؤشرات الخطوات
        this.step1 = document.getElementById('step1');
        this.step2 = document.getElementById('step2');
        this.step3 = document.getElementById('step3');
        
        // حقول الإدخال
        this.email = document.getElementById('email');
        this.verificationInputs = document.querySelectorAll('.verification-input');
        this.newPassword = document.getElementById('newPassword');
        this.confirmPassword = document.getElementById('confirmPassword');
        
        // عناصر أخرى
        this.passwordStrengthBar = document.getElementById('passwordStrengthBar');
        this.passwordStrengthText = document.getElementById('passwordStrengthText');
        this.togglePassword = document.getElementById('togglePassword');
        this.toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        this.resendCode = document.getElementById('resendCode');
        this.resendTimer = document.getElementById('resendTimer');
        this.timer = document.getElementById('timer');
        
        // أزرار التقديم والأخطاء
        this.submitButtons = document.querySelectorAll('.btn-submit');
        this.spinners = document.querySelectorAll('.spinner-border');
        this.buttonTexts = document.querySelectorAll('.button-text');
        this.errorDivs = {
            email: document.getElementById('emailError'),
            verification: document.getElementById('verificationError'),
            resetPassword: document.getElementById('resetPasswordError')
        };
        
        // متغيرات الحالة
        this.currentStep = 1;
        this.timerInterval = null;
        this.timerValue = 60;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // استماع لأحداث تقديم النماذج
        this.emailForm.addEventListener('submit', this.handleEmailSubmit.bind(this));
        this.verificationForm.addEventListener('submit', this.handleVerificationSubmit.bind(this));
        this.resetPasswordForm.addEventListener('submit', this.handleResetPasswordSubmit.bind(this));
        
        // استماع لأحداث حقول الإدخال
        this.email.addEventListener('input', this.validateInput.bind(this));
        this.newPassword.addEventListener('input', this.checkPasswordStrength.bind(this));
        this.confirmPassword.addEventListener('input', this.validateInput.bind(this));
        
        // استماع لأحداث التحقق
        this.setupVerificationInputs();
        
        // استماع لأحداث إظهار/إخفاء كلمة المرور
        this.togglePassword.addEventListener('click', () => this.togglePasswordVisibility(this.newPassword, this.togglePassword));
        this.toggleConfirmPassword.addEventListener('click', () => this.togglePasswordVisibility(this.confirmPassword, this.toggleConfirmPassword));
        
        // استماع لحدث إعادة إرسال الرمز
        this.resendCode.addEventListener('click', this.handleResendCode.bind(this));
    }
    
    setupVerificationInputs() {
        // التنقل التلقائي بين حقول رمز التحقق
        this.verificationInputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (e.key >= '0' && e.key <= '9') {
                    input.value = e.key;
                    if (index < this.verificationInputs.length - 1) {
                        this.verificationInputs[index + 1].focus();
                    }
                } else if (e.key === 'Backspace') {
                    input.value = '';
                    if (index > 0) {
                        this.verificationInputs[index - 1].focus();
                    }
                }
                this.validateVerificationCode();
            });
            
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text');
                const numbers = pasteData.match(/\d/g);
                
                if (numbers) {
                    this.verificationInputs.forEach((input, i) => {
                        if (i < numbers.length) {
                            input.value = numbers[i];
                        }
                    });
                    this.validateVerificationCode();
                }
            });
        });
    }
    
    validateInput(event) {
        const input = event.target;
        if (input.validity.valid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
        
        // التحقق من تطابق كلمات المرور
        if (input.id === 'confirmPassword') {
            if (input.value !== this.newPassword.value) {
                input.setCustomValidity('كلمات المرور غير متطابقة');
                input.classList.add('is-invalid');
            } else {
                input.setCustomValidity('');
            }
        }
    }
    
    validateVerificationCode() {
        const isComplete = Array.from(this.verificationInputs).every(input => input.value.length === 1);
        const submitButton = this.verificationForm.querySelector('.btn-submit');
        submitButton.disabled = !isComplete;
    }
    
    checkPasswordStrength(event) {
        const password = event.target.value;
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
        if (password.match(/\d/)) strength += 1;
        if (password.match(/[^a-zA-Z\d]/)) strength += 1;
        
        switch (strength) {
            case 0:
                this.passwordStrengthBar.style.width = '0%';
                this.passwordStrengthBar.className = 'progress-bar';
                feedback = 'ضعيفة جداً';
                break;
            case 1:
                this.passwordStrengthBar.style.width = '25%';
                this.passwordStrengthBar.className = 'progress-bar bg-danger';
                feedback = 'ضعيفة';
                break;
            case 2:
                this.passwordStrengthBar.style.width = '50%';
                this.passwordStrengthBar.className = 'progress-bar bg-warning';
                feedback = 'متوسطة';
                break;
            case 3:
                this.passwordStrengthBar.style.width = '75%';
                this.passwordStrengthBar.className = 'progress-bar bg-info';
                feedback = 'جيدة';
                break;
            case 4:
                this.passwordStrengthBar.style.width = '100%';
                this.passwordStrengthBar.className = 'progress-bar bg-success';
                feedback = 'قوية';
                break;
        }
        
        this.passwordStrengthText.textContent = feedback;
    }
    
    togglePasswordVisibility(passwordInput, toggleButton) {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleButton.querySelector('i').classList.toggle('fa-eye');
        toggleButton.querySelector('i').classList.toggle('fa-eye-slash');
    }
    
    startResendTimer() {
        this.timerValue = 60;
        this.timer.textContent = this.timerValue;
        this.resendTimer.classList.remove('d-none');
        this.resendCode.classList.add('d-none');
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timerValue--;
            this.timer.textContent = this.timerValue;
            
            if (this.timerValue <= 0) {
                clearInterval(this.timerInterval);
                this.resendTimer.classList.add('d-none');
                this.resendCode.classList.remove('d-none');
            }
        }, 1000);
    }
    
    showLoading(step, loading) {
        const form = this.getFormByStep(step);
        const submitButton = form.querySelector('.btn-submit');
        const spinner = submitButton.querySelector('.spinner-border');
        const buttonText = submitButton.querySelector('.button-text');
        
        submitButton.disabled = loading;
        spinner.classList.toggle('d-none', !loading);
        
        // تغيير نص الزر حسب الخطوة
        if (!loading) {
            switch (step) {
                case 1:
                    buttonText.textContent = 'إرسال رمز التحقق';
                    break;
                case 2:
                    buttonText.textContent = 'التحقق من الرمز';
                    break;
                case 3:
                    buttonText.textContent = 'تعيين كلمة المرور';
                    break;
            }
        } else {
            buttonText.textContent = 'جاري المعالجة...';
        }
    }
    
    showError(step, message) {
        const errorDiv = this.getErrorDivByStep(step);
        errorDiv.textContent = message;
        errorDiv.classList.remove('d-none');
    }
    
    hideError(step) {
        const errorDiv = this.getErrorDivByStep(step);
        errorDiv.classList.add('d-none');
    }
    
    getFormByStep(step) {
        switch (step) {
            case 1: return this.emailForm;
            case 2: return this.verificationForm;
            case 3: return this.resetPasswordForm;
        }
    }
    
    getErrorDivByStep(step) {
        switch (step) {
            case 1: return this.errorDivs.email;
            case 2: return this.errorDivs.verification;
            case 3: return this.errorDivs.resetPassword;
        }
    }
    
    goToStep(step) {
        // إخفاء جميع النماذج
        this.emailForm.classList.remove('active');
        this.verificationForm.classList.remove('active');
        this.resetPasswordForm.classList.remove('active');
        
        // إعادة تعيين مؤشرات الخطوات
        this.step1.classList.remove('active', 'completed');
        this.step2.classList.remove('active', 'completed');
        this.step3.classList.remove('active', 'completed');
        
        // تحديث الخطوة الحالية
        this.currentStep = step;
        
        // تحديث مؤشرات الخطوات
        for (let i = 1; i < step; i++) {
            document.getElementById(`step${i}`).classList.add('completed');
        }
        document.getElementById(`step${step}`).classList.add('active');
        
        // إظهار النموذج المناسب
        this.getFormByStep(step).classList.add('active');
    }
    
    async handleEmailSubmit(event) {
        event.preventDefault();
        this.hideError(1);
        
        if (!this.emailForm.checkValidity()) {
            this.emailForm.classList.add('was-validated');
            return;
        }
        
        this.showLoading(1, true);
        
        try {
            // محاكاة طلب API لإرسال رمز التحقق
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // في الإنتاج، استبدل هذا بطلب API حقيقي
            // const response = await fetch('api/send-verification-code', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: this.email.value })
            // });
            // const data = await response.json();
            // if (!data.success) throw new Error(data.message);
            
            // الانتقال إلى الخطوة التالية
            this.goToStep(2);
            this.startResendTimer();
            
            // تركيز أول حقل إدخال للرمز
            this.verificationInputs[0].focus();
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(1, error.message || 'حدث خطأ أثناء إرسال رمز التحقق. يرجى المحاولة مرة أخرى.');
        } finally {
            this.showLoading(1, false);
        }
    }
    
    async handleVerificationSubmit(event) {
        event.preventDefault();
        this.hideError(2);
        
        const code = Array.from(this.verificationInputs).map(input => input.value).join('');
        if (code.length !== 6) {
            this.showError(2, 'يرجى إدخال رمز التحقق المكون من 6 أرقام');
            return;
        }
        
        this.showLoading(2, true);
        
        try {
            // محاكاة طلب API للتحقق من الرمز
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // في الإنتاج، استبدل هذا بطلب API حقيقي
            // const response = await fetch('api/verify-code', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ 
            //         email: this.email.value,
            //         code: code
            //     })
            // });
            // const data = await response.json();
            // if (!data.success) throw new Error(data.message);
            
            // الانتقال إلى الخطوة التالية
            this.goToStep(3);
            
            // تركيز حقل كلمة المرور الجديدة
            this.newPassword.focus();
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(2, error.message || 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
        } finally {
            this.showLoading(2, false);
        }
    }
    
    async handleResetPasswordSubmit(event) {
        event.preventDefault();
        this.hideError(3);
        
        if (!this.resetPasswordForm.checkValidity()) {
            this.resetPasswordForm.classList.add('was-validated');
            return;
        }
        
        if (this.newPassword.value !== this.confirmPassword.value) {
            this.showError(3, 'كلمات المرور غير متطابقة');
            return;
        }
        
        this.showLoading(3, true);
        
        try {
            // محاكاة طلب API لتعيين كلمة المرور الجديدة
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // في الإنتاج، استبدل هذا بطلب API حقيقي
            // const response = await fetch('api/reset-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ 
            //         email: this.email.value,
            //         password: this.newPassword.value
            //     })
            // });
            // const data = await response.json();
            // if (!data.success) throw new Error(data.message);
            
            // إظهار رسالة النجاح
            document.querySelector('.steps-container').innerHTML = `
                <div class="success-message">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>تم تغيير كلمة المرور بنجاح</h3>
                    <p>يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة</p>
                    <a href="../تسجيل الدخول/Untitled-1.html" class="btn btn-primary">تسجيل الدخول</a>
                </div>
            `;
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(3, error.message || 'حدث خطأ أثناء تعيين كلمة المرور الجديدة. يرجى المحاولة مرة أخرى.');
        } finally {
            this.showLoading(3, false);
        }
    }
    
    async handleResendCode(event) {
        event.preventDefault();
        this.hideError(2);
        
        try {
            // محاكاة طلب API لإعادة إرسال رمز التحقق
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // في الإنتاج، استبدل هذا بطلب API حقيقي
            // const response = await fetch('api/resend-verification-code', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: this.email.value })
            // });
            // const data = await response.json();
            // if (!data.success) throw new Error(data.message);
            
            // إعادة تشغيل المؤقت
            this.startResendTimer();
            
            // مسح حقول الإدخال
            this.verificationInputs.forEach(input => input.value = '');
            this.verificationInputs[0].focus();
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(2, error.message || 'حدث خطأ أثناء إعادة إرسال الرمز. يرجى المحاولة مرة أخرى.');
        }
    }
}

// تهيئة النموذج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const passwordRecovery = new PasswordRecovery();
});