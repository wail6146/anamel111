class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.togglePassword = document.getElementById('togglePassword');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.spinner = this.submitButton.querySelector('.spinner-border');
        this.buttonText = this.submitButton.querySelector('.button-text');
        this.errorDiv = document.getElementById('loginError');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.togglePassword.addEventListener('click', this.togglePasswordVisibility.bind(this));
        this.form.addEventListener('input', this.handleInput.bind(this));
    }

    togglePasswordVisibility() {
        const type = this.password.getAttribute('type') === 'password' ? 'text' : 'password';
        this.password.setAttribute('type', type);
        this.togglePassword.querySelector('i').classList.toggle('fa-eye');
        this.togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    }

    handleInput(event) {
        const input = event.target;
        if (input.validity.valid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    }

    validateForm() {
        let isValid = true;
        [this.email, this.password].forEach(input => {
            if (!input.validity.valid) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        });
        return isValid;
    }

    showLoading(loading) {
        this.submitButton.disabled = loading;
        this.spinner.classList.toggle('d-none', !loading);
        this.buttonText.textContent = loading ? 'جاري التحقق...' : 'تسجيل الدخول';
    }

    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.classList.remove('d-none');
    }

    hideError() {
        this.errorDiv.classList.add('d-none');
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.hideError();

        if (!this.validateForm()) {
            return;
        }

        this.showLoading(true);

        try {
            const formData = new FormData(this.form);
            const response = await fetch('Untitled-1.php', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });

            const data = await response.json();

            if (data.success) {
                // تخزين معلومات المستخدم بشكل آمن
                sessionStorage.setItem('userInfo', JSON.stringify({
                    id: data.user_id,
                    name: data.user_name,
                    email: data.email,
                    type: data.user_type
                }));

                // توجيه المستخدم حسب نوعه
                window.location.href = data.user_type === 'seller' ? '../seller-dashboard.html' : '../index.html';
            } else {
                this.showError(data.message || 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        } finally {
            this.showLoading(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new LoginForm());