// Contact Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.submit-btn i');

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'El nombre debe tener al menos 2 caracteres y solo contener letras'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'El apellido debe tener al menos 2 caracteres y solo contener letras'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingresa un email válido'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Por favor ingresa un número de teléfono válido'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'El mensaje debe tener al menos 10 caracteres'
        },
        terms: {
            required: true,
            message: 'Debes aceptar los términos y condiciones'
        }
    };

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName, field));
            field.addEventListener('input', () => clearFieldError(fieldName, field));
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Validate individual field
    function validateField(fieldName, field) {
        const rule = validationRules[fieldName];
        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        
        // Clear previous error
        clearFieldError(fieldName, field);
        
        // Check if required field is empty
        if (rule.required && (!value || value === '')) {
            showFieldError(fieldName, field, `Este campo es requerido`);
            return false;
        }
        
        // Skip validation for empty optional fields
        if (!rule.required && (!value || value === '')) {
            return true;
        }
        
        // Check minimum length
        if (rule.minLength && value.length < rule.minLength) {
            showFieldError(fieldName, field, rule.message);
            return false;
        }
        
        // Check pattern
        if (rule.pattern && !rule.pattern.test(value)) {
            showFieldError(fieldName, field, rule.message);
            return false;
        }
        
        // Special validation for checkbox
        if (field.type === 'checkbox' && rule.required && !value) {
            showFieldError(fieldName, field, rule.message);
            return false;
        }
        
        return true;
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !validateField(fieldName, field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Show field error
    function showFieldError(fieldName, field, message) {
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'flex';
        errorElement.style.alignItems = 'center';
        errorElement.style.gap = '0.5rem';
        
        // Add error icon
        const errorIcon = document.createElement('i');
        errorIcon.className = 'fas fa-exclamation-circle';
        errorElement.insertBefore(errorIcon, errorElement.firstChild);
        
        // Add error styling to field
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
        
        // Append error message
        formGroup.appendChild(errorElement);
        
        // Animate error message
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorElement.style.transition = 'all 0.3s ease';
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    // Clear field error
    function clearFieldError(fieldName, field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        // Reset field styling
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        field.style.boxShadow = 'none';
    }

    // Submit form
    function submitForm() {
        // Show loading state
        setSubmitButtonState('loading');
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add checkbox values
        data.newsletter = document.getElementById('newsletter').checked;
        data.terms = document.getElementById('terms').checked;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would typically send data to your backend
            console.log('Form data:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            setSubmitButtonState('success');
            
            // Reset button to normal after 3 seconds
            setTimeout(() => {
                setSubmitButtonState('normal');
            }, 3000);
            
        }, 2000); // Simulate network delay
    }

    // Set submit button state
    function setSubmitButtonState(state) {
        switch(state) {
            case 'loading':
                submitBtn.disabled = true;
                btnText.textContent = 'Enviando...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                submitBtn.style.opacity = '0.7';
                break;
                
            case 'success':
                submitBtn.disabled = false;
                btnText.textContent = 'Enviado';
                btnIcon.className = 'fas fa-check';
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(45deg, #10B981, #059669)';
                break;
                
            case 'normal':
            default:
                submitBtn.disabled = false;
                btnText.textContent = 'Enviar Mensaje';
                btnIcon.className = 'fas fa-paper-plane';
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(45deg, #8B5CF6, #A855F7)';
                break;
        }
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideSuccessMessage();
        }, 5000);
    }

    // Hide success message
    function hideSuccessMessage() {
        successMessage.classList.remove('show');
    }

    // Click outside success message to close
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            hideSuccessMessage();
        }
    });

    // Handle escape key to close success message
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successMessage.classList.contains('show')) {
            hideSuccessMessage();
        }
    });

    // Smooth scrolling for form focus
    function scrollToElement(element) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // Focus on first invalid field
    function focusFirstInvalidField() {
        const firstInvalidField = document.querySelector('.error-message');
        if (firstInvalidField) {
            const field = firstInvalidField.closest('.form-group').querySelector('input, select, textarea');
            if (field) {
                field.focus();
                scrollToElement(field);
            }
        }
    }

    // Enhanced form validation with scroll to error
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        } else {
            // Focus on first invalid field
            setTimeout(focusFirstInvalidField, 100);
        }
    });

    // Character counter for textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '0.9rem';
        charCounter.style.color = '#888';
        charCounter.style.marginTop = '0.5rem';
        
        messageTextarea.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const current = messageTextarea.value.length;
            const min = 10;
            const max = 500;
            
            charCounter.textContent = `${current}/${max} caracteres`;
            
            if (current < min) {
                charCounter.style.color = '#ef4444';
            } else if (current > max * 0.9) {
                charCounter.style.color = '#f59e0b';
            } else {
                charCounter.style.color = '#10b981';
            }
        }
        
        messageTextarea.addEventListener('input', updateCharCounter);
        messageTextarea.addEventListener('input', function() {
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
                updateCharCounter();
            }
        });
        
        updateCharCounter();
    }

    // Auto-resize textarea
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }

    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentNode.classList.add('focused');
        }
    });

    // Add loading overlay styles
    const style = document.createElement('style');
    style.textContent = `
        .form-group.focused label {
            color: #8B5CF6;
        }
        
        .char-counter {
            transition: color 0.3s ease;
        }
        
        .error-message {
            animation: errorSlideIn 0.3s ease;
        }
        
        @keyframes errorSlideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .submit-btn:disabled {
            cursor: not-allowed;
        }
        
        .submit-btn .fas.fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Export functions for potential external use
window.ContactForm = {
    validateForm: function() {
        const form = document.getElementById('contactForm');
        return form && form.checkValidity();
    },
    
    resetForm: function() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
            // Clear any error messages
            document.querySelectorAll('.error-message').forEach(error => error.remove());
        }
    },
    
    showSuccess: function() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('show');
        }
    }
}; 