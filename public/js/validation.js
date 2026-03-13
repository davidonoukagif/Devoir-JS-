/**
 * Module de Validation
 * ====================
 * Fonctions de validation pour les formulaires
 */

const Validation = {
    // Expression reguliere pour email
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Expression reguliere pour telephone senegalais
    // Formats acceptes: 77 123 45 67, 77-123-45-67, 77.123.45.67, 771234567
    phoneRegex: /^(77|78|70|76|75)[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/,
    
    /**
     * Valide un email
     * @param {string} email 
     * @returns {object} {valid: boolean, message: string}
     */
    validateEmail: function(email) {
        if (!email || email.trim() === '') {
            return { valid: false, message: 'L\'email est requis' };
        }
        if (!this.emailRegex.test(email)) {
            return { valid: false, message: 'Format d\'email invalide' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Valide un mot de passe
     * @param {string} password 
     * @returns {object} {valid: boolean, message: string}
     */
    validatePassword: function(password) {
        if (!password || password.trim() === '') {
            return { valid: false, message: 'Le mot de passe est requis' };
        }
        if (password.length < 6) {
            return { valid: false, message: 'Le mot de passe doit contenir au moins 6 caracteres' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Valide la confirmation du mot de passe
     * @param {string} password 
     * @param {string} confirm 
     * @returns {object} {valid: boolean, message: string}
     */
    validatePasswordConfirm: function(password, confirm) {
        if (!confirm || confirm.trim() === '') {
            return { valid: false, message: 'Veuillez confirmer le mot de passe' };
        }
        if (password !== confirm) {
            return { valid: false, message: 'Les mots de passe ne correspondent pas' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Valide un nom
     * @param {string} name 
     * @returns {object} {valid: boolean, message: string}
     */
    validateName: function(name) {
        if (!name || name.trim() === '') {
            return { valid: false, message: 'Le nom est requis' };
        }
        if (name.trim().length < 2) {
            return { valid: false, message: 'Le nom doit contenir au moins 2 caracteres' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Valide un numero de telephone senegalais
     * @param {string} phone 
     * @returns {object} {valid: boolean, message: string}
     */
    validatePhone: function(phone) {
        if (!phone || phone.trim() === '') {
            return { valid: false, message: 'Le telephone est requis' };
        }
        // Nettoyer le numero
        const cleanPhone = phone.replace(/[\s.-]/g, '');
        if (!this.phoneRegex.test(phone) && !/^(77|78|70|76|75)\d{7}$/.test(cleanPhone)) {
            return { valid: false, message: 'Format invalide. Utilisez: 77/78/70/76/75 XXX XX XX' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Valide un champ requis
     * @param {string} value 
     * @param {string} fieldName 
     * @returns {object} {valid: boolean, message: string}
     */
    validateRequired: function(value, fieldName) {
        if (!value || value.trim() === '') {
            return { valid: false, message: fieldName + ' est requis' };
        }
        return { valid: true, message: '' };
    },
    
    /**
     * Affiche une erreur sur un champ
     * @param {string} inputId 
     * @param {string} message 
     */
    showError: function(inputId, message) {
        const $input = $('#' + inputId);
        const $error = $input.siblings('.error-message');
        
        $input.addClass('error');
        if ($error.length) {
            $error.text(message);
        }
    },
    
    /**
     * Efface l'erreur d'un champ
     * @param {string} inputId 
     */
    clearError: function(inputId) {
        const $input = $('#' + inputId);
        const $error = $input.siblings('.error-message');
        
        $input.removeClass('error');
        if ($error.length) {
            $error.text('');
        }
    },
    
    /**
     * Efface toutes les erreurs d'un formulaire
     * @param {string} formId 
     */
    clearAllErrors: function(formId) {
        const $form = $('#' + formId);
        $form.find('input, textarea, select').removeClass('error');
        $form.find('.error-message').text('');
    }
};
