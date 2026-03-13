/**
 * Application Principale
 * ======================
 * Initialisation et gestion des evenements
 */

// Systeme de Notifications Toast
const Toast = {
    show: function(message, type = 'info') {
        const $container = $('#toast-container');
        const id = 'toast_' + Date.now();
        
        const $toast = $(`
            <div class="toast ${type}" id="${id}">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="Toast.close('${id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `);
        
        $container.append($toast);
        
        // Auto-dismiss apres 4 secondes
        setTimeout(() => this.close(id), 4000);
    },
    
    close: function(id) {
        const $toast = $('#' + id);
        $toast.css('animation', 'slideIn 0.3s ease reverse');
        setTimeout(() => $toast.remove(), 300);
    },
    
    success: function(message) { this.show(message, 'success'); },
    error: function(message) { this.show(message, 'error'); },
    warning: function(message) { this.show(message, 'warning'); },
    info: function(message) { this.show(message, 'info'); }
};

// Systeme de Modal
const Modal = {
    callback: null,
    
    show: function(title, message, onConfirm) {
        $('#modal-title').text(title);
        $('#modal-message').text(message);
        this.callback = onConfirm;
        $('#confirm-modal').removeClass('hidden');
    },
    
    hide: function() {
        $('#confirm-modal').addClass('hidden');
        this.callback = null;
    },
    
    confirm: function() {
        if (this.callback) {
            this.callback();
        }
        this.hide();
    }
};

// Gestion de l'interface utilisateur
const UI = {
    /**
     * Ajoute un element de formation
     * @param {object} data 
     */
    addEducationItem: function(data = null) {
        const id = data ? data.id : CVBuilder.addEducation();
        const edu = data || CVBuilder.data.education.find(e => e.id === id);
        
        const html = `
            <div class="item-card" data-id="${id}">
                <div class="item-header" data-item-toggle="${id}">
                    <div>
                        <div class="item-title">${edu.diplome || 'Nouvelle formation'}</div>
                        <div class="item-subtitle">${edu.etablissement || 'Etablissement'}</div>
                    </div>
                    <div class="item-actions">
                        <button type="button" class="btn btn-ghost btn-icon" data-delete="education" data-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="item-content" id="item-${id}">
                    <div class="form-group">
                        <label>Diplome / Formation *</label>
                        <input type="text" data-education="${id}" data-field="diplome" value="${edu.diplome || ''}" placeholder="Ex: Licence en Informatique">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Etablissement *</label>
                            <input type="text" data-education="${id}" data-field="etablissement" value="${edu.etablissement || ''}" placeholder="Nom de l'ecole/universite">
                        </div>
                        <div class="form-group">
                            <label>Ville</label>
                            <input type="text" data-education="${id}" data-field="ville" value="${edu.ville || ''}" placeholder="Ville">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date de debut</label>
                            <input type="text" data-education="${id}" data-field="dateDebut" value="${edu.dateDebut || ''}" placeholder="Ex: 2020">
                        </div>
                        <div class="form-group">
                            <label>Date de fin</label>
                            <input type="text" data-education="${id}" data-field="dateFin" value="${edu.dateFin || ''}" placeholder="Ex: 2023">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea data-education="${id}" data-field="description" rows="2" placeholder="Details supplementaires...">${edu.description || ''}</textarea>
                    </div>
                </div>
            </div>
        `;
        
        $('#education-list').append(html);
        
        if (!data) {
            // Ouvrir l'element ajoute
            $('#item-' + id).addClass('open');
        }
    },
    
    /**
     * Ajoute un element d'experience
     * @param {object} data 
     */
    addExperienceItem: function(data = null) {
        const id = data ? data.id : CVBuilder.addExperience();
        const exp = data || CVBuilder.data.experience.find(e => e.id === id);
        
        const html = `
            <div class="item-card" data-id="${id}">
                <div class="item-header" data-item-toggle="${id}">
                    <div>
                        <div class="item-title">${exp.poste || 'Nouvelle experience'}</div>
                        <div class="item-subtitle">${exp.entreprise || 'Entreprise'}</div>
                    </div>
                    <div class="item-actions">
                        <button type="button" class="btn btn-ghost btn-icon" data-delete="experience" data-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="item-content" id="item-${id}">
                    <div class="form-group">
                        <label>Poste / Fonction *</label>
                        <input type="text" data-experience="${id}" data-field="poste" value="${exp.poste || ''}" placeholder="Ex: Developpeur Web">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Entreprise *</label>
                            <input type="text" data-experience="${id}" data-field="entreprise" value="${exp.entreprise || ''}" placeholder="Nom de l'entreprise">
                        </div>
                        <div class="form-group">
                            <label>Ville</label>
                            <input type="text" data-experience="${id}" data-field="ville" value="${exp.ville || ''}" placeholder="Ville">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date de debut</label>
                            <input type="text" data-experience="${id}" data-field="dateDebut" value="${exp.dateDebut || ''}" placeholder="Ex: Jan 2022">
                        </div>
                        <div class="form-group">
                            <label>Date de fin</label>
                            <input type="text" data-experience="${id}" data-field="dateFin" value="${exp.dateFin || ''}" placeholder="Ex: Present">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description des taches</label>
                        <textarea data-experience="${id}" data-field="description" rows="3" placeholder="Decrivez vos responsabilites...">${exp.description || ''}</textarea>
                    </div>
                </div>
            </div>
        `;
        
        $('#experience-list').append(html);
        
        if (!data) {
            $('#item-' + id).addClass('open');
        }
    },
    
    /**
     * Ajoute un element de competence
     * @param {object} data 
     */
    addSkillItem: function(data = null) {
        const id = data ? data.id : CVBuilder.addSkill();
        const skill = data || CVBuilder.data.skills.find(s => s.id === id);
        
        const html = `
            <div class="item-card" data-id="${id}">
                <div class="item-header">
                    <div style="flex: 1; display: flex; align-items: center; gap: 1rem;">
                        <input type="text" data-skill="${id}" data-field="nom" value="${skill.nom || ''}" placeholder="Nom de la competence" style="flex: 1;">
                        <select data-skill="${id}" data-field="niveau" style="width: 120px;">
                            <option value="1" ${skill.niveau === 1 ? 'selected' : ''}>Debutant</option>
                            <option value="2" ${skill.niveau === 2 ? 'selected' : ''}>Basique</option>
                            <option value="3" ${skill.niveau === 3 ? 'selected' : ''}>Intermediaire</option>
                            <option value="4" ${skill.niveau === 4 ? 'selected' : ''}>Avance</option>
                            <option value="5" ${skill.niveau === 5 ? 'selected' : ''}>Expert</option>
                        </select>
                    </div>
                    <div class="item-actions">
                        <button type="button" class="btn btn-ghost btn-icon" data-delete="skill" data-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        $('#skills-list').append(html);
    },
    
    /**
     * Ajoute un element de langue
     * @param {object} data 
     */
    addLanguageItem: function(data = null) {
        const id = data ? data.id : CVBuilder.addLanguage();
        const lang = data || CVBuilder.data.languages.find(l => l.id === id);
        
        const html = `
            <div class="item-card" data-id="${id}">
                <div class="item-header">
                    <div style="flex: 1; display: flex; align-items: center; gap: 1rem;">
                        <input type="text" data-language="${id}" data-field="langue" value="${lang.langue || ''}" placeholder="Ex: Francais" style="flex: 1;">
                        <select data-language="${id}" data-field="niveau" style="width: 140px;">
                            <option value="Debutant" ${lang.niveau === 'Debutant' ? 'selected' : ''}>Debutant</option>
                            <option value="Intermediaire" ${lang.niveau === 'Intermediaire' ? 'selected' : ''}>Intermediaire</option>
                            <option value="Avance" ${lang.niveau === 'Avance' ? 'selected' : ''}>Avance</option>
                            <option value="Courant" ${lang.niveau === 'Courant' ? 'selected' : ''}>Courant</option>
                            <option value="Natif" ${lang.niveau === 'Natif' ? 'selected' : ''}>Natif</option>
                        </select>
                    </div>
                    <div class="item-actions">
                        <button type="button" class="btn btn-ghost btn-icon" data-delete="language" data-id="${id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        $('#languages-list').append(html);
    },
    
    /**
     * Affiche les tags des centres d'interet
     */
    renderInterestsTags: function() {
        const $container = $('#interests-tags');
        $container.empty();
        
        CVBuilder.data.interests.forEach(interest => {
            const $tag = $(`
                <span class="interest-tag">
                    ${interest}
                    <button type="button" data-remove-interest="${interest}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </span>
            `);
            $container.append($tag);
        });
    }
};

// Initialisation de l'application
$(document).ready(function() {
    // Initialiser l'authentification
    Auth.init();
    
    // Initialiser le CV Builder
    CVBuilder.init();
    
    // ========================
    // EVENEMENTS AUTHENTIFICATION
    // ========================
    
    // Changement d'onglet auth
    $('.auth-tab').on('click', function() {
        const tab = $(this).data('tab');
        
        $('.auth-tab').removeClass('active');
        $(this).addClass('active');
        
        $('.auth-form').removeClass('active');
        $('#' + tab + '-form').addClass('active');
        
        // Effacer les erreurs
        Validation.clearAllErrors('login-form');
        Validation.clearAllErrors('register-form');
        $('.auth-error').addClass('hidden');
    });
    
    // Soumission formulaire de connexion
    $('#login-form').on('submit', async function(e) {
        e.preventDefault();
        
        const email = $('#login-email').val().trim();
        const password = $('#login-password').val();
        
        // Validation
        Validation.clearAllErrors('login-form');
        let isValid = true;
        
        const emailValidation = Validation.validateEmail(email);
        if (!emailValidation.valid) {
            Validation.showError('login-email', emailValidation.message);
            isValid = false;
        }
        
        const passwordValidation = Validation.validatePassword(password);
        if (!passwordValidation.valid) {
            Validation.showError('login-password', passwordValidation.message);
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Afficher le loader
        const $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true);
        $btn.find('.btn-text').addClass('hidden');
        $btn.find('.btn-loader').removeClass('hidden');
        
        // Connexion
        const result = await Auth.login(email, password);
        
        // Masquer le loader
        $btn.prop('disabled', false);
        $btn.find('.btn-text').removeClass('hidden');
        $btn.find('.btn-loader').addClass('hidden');
        
        if (!result.success) {
            $('#login-error').text(result.error).removeClass('hidden');
        }
    });
    
    // Soumission formulaire d'inscription
    $('#register-form').on('submit', async function(e) {
        e.preventDefault();
        
        const name = $('#register-name').val().trim();
        const email = $('#register-email').val().trim();
        const password = $('#register-password').val();
        const confirm = $('#register-confirm').val();
        
        // Validation
        Validation.clearAllErrors('register-form');
        let isValid = true;
        
        const nameValidation = Validation.validateName(name);
        if (!nameValidation.valid) {
            Validation.showError('register-name', nameValidation.message);
            isValid = false;
        }
        
        const emailValidation = Validation.validateEmail(email);
        if (!emailValidation.valid) {
            Validation.showError('register-email', emailValidation.message);
            isValid = false;
        }
        
        const passwordValidation = Validation.validatePassword(password);
        if (!passwordValidation.valid) {
            Validation.showError('register-password', passwordValidation.message);
            isValid = false;
        }
        
        const confirmValidation = Validation.validatePasswordConfirm(password, confirm);
        if (!confirmValidation.valid) {
            Validation.showError('register-confirm', confirmValidation.message);
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Afficher le loader
        const $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true);
        $btn.find('.btn-text').addClass('hidden');
        $btn.find('.btn-loader').removeClass('hidden');
        
        // Inscription
        const result = await Auth.register(name, email, password);
        
        // Masquer le loader
        $btn.prop('disabled', false);
        $btn.find('.btn-text').removeClass('hidden');
        $btn.find('.btn-loader').addClass('hidden');
        
        if (!result.success) {
            $('#register-error').text(result.error).removeClass('hidden');
        }
    });
    
    // Deconnexion
    $('#logout-btn').on('click', function() {
        Auth.logout();
    });
    
    // ========================
    // EVENEMENTS CV BUILDER
    // ========================
    
    // Toggle des sections
    $(document).on('click', '[data-toggle]', function() {
        const section = $(this).data('toggle');
        const $content = $('#' + section + '-content');
        const $header = $(this);
        
        $header.toggleClass('open');
        $content.slideToggle(200).toggleClass('open');
    });
    
    // Toggle des items (education, experience)
    $(document).on('click', '[data-item-toggle]', function(e) {
        if ($(e.target).closest('.item-actions').length) return;
        
        const id = $(this).data('item-toggle');
        const $content = $('#item-' + id);
        
        $content.slideToggle(200).toggleClass('open');
    });
    
    // Changement de template
    $('#template-select').on('change', function() {
        CVBuilder.setTemplate($(this).val());
    });
    
    // Mise a jour des champs personnels
    $(document).on('input', '[data-field]', function() {
        const field = $(this).data('field');
        const value = $(this).val();
        CVBuilder.updatePersonal(field, value);
    });
    
    // Validation du telephone en temps reel
    $('#telephone').on('blur', function() {
        const value = $(this).val().trim();
        if (value) {
            const validation = Validation.validatePhone(value);
            if (!validation.valid) {
                $(this).addClass('error');
                $(this).siblings('.error-message').text(validation.message);
            } else {
                $(this).removeClass('error');
                $(this).siblings('.error-message').text('');
            }
        }
    });
    
    // Validation email en temps reel
    $('#email').on('blur', function() {
        const value = $(this).val().trim();
        if (value) {
            const validation = Validation.validateEmail(value);
            if (!validation.valid) {
                $(this).addClass('error');
                $(this).siblings('.error-message').text(validation.message);
            } else {
                $(this).removeClass('error');
                $(this).siblings('.error-message').text('');
            }
        }
    });
    
    // Upload de photo
    $('#photo-btn').on('click', function() {
        $('#photo-input').click();
    });
    
    $('#photo-input').on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                Toast.error('La photo ne doit pas depasser 5 Mo');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                CVBuilder.updatePersonal('photo', dataUrl);
                $('#photo-preview').html('<img src="' + dataUrl + '" alt="Photo">');
                $('#photo-remove').removeClass('hidden');
            };
            reader.readAsDataURL(file);
        }
    });
    
    $('#photo-remove').on('click', function() {
        CVBuilder.updatePersonal('photo', '');
        $('#photo-preview').html(`
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
        `);
        $(this).addClass('hidden');
        $('#photo-input').val('');
    });
    
    // Ajout d'elements
    $('[data-add="education"]').on('click', function() {
        UI.addEducationItem();
    });
    
    $('[data-add="experience"]').on('click', function() {
        UI.addExperienceItem();
    });
    
    $('[data-add="skill"]').on('click', function() {
        UI.addSkillItem();
    });
    
    $('[data-add="language"]').on('click', function() {
        UI.addLanguageItem();
    });
    
    // Mise a jour des formations
    $(document).on('input', '[data-education]', function() {
        const id = $(this).data('education');
        const field = $(this).data('field');
        const value = $(this).val();
        CVBuilder.updateEducation(id, field, value);
        
        // Mettre a jour le titre de la carte
        if (field === 'diplome' || field === 'etablissement') {
            const $card = $(this).closest('.item-card');
            const diplome = $card.find('[data-field="diplome"]').val() || 'Nouvelle formation';
            const etablissement = $card.find('[data-field="etablissement"]').val() || 'Etablissement';
            $card.find('.item-title').text(diplome);
            $card.find('.item-subtitle').text(etablissement);
        }
    });
    
    // Mise a jour des experiences
    $(document).on('input', '[data-experience]', function() {
        const id = $(this).data('experience');
        const field = $(this).data('field');
        const value = $(this).val();
        CVBuilder.updateExperience(id, field, value);
        
        // Mettre a jour le titre de la carte
        if (field === 'poste' || field === 'entreprise') {
            const $card = $(this).closest('.item-card');
            const poste = $card.find('[data-field="poste"]').val() || 'Nouvelle experience';
            const entreprise = $card.find('[data-field="entreprise"]').val() || 'Entreprise';
            $card.find('.item-title').text(poste);
            $card.find('.item-subtitle').text(entreprise);
        }
    });
    
    // Mise a jour des competences
    $(document).on('input change', '[data-skill]', function() {
        const id = $(this).data('skill');
        const field = $(this).data('field');
        const value = $(this).val();
        CVBuilder.updateSkill(id, field, value);
    });
    
    // Mise a jour des langues
    $(document).on('input change', '[data-language]', function() {
        const id = $(this).data('language');
        const field = $(this).data('field');
        const value = $(this).val();
        CVBuilder.updateLanguage(id, field, value);
    });
    
    // Suppression d'elements
    $(document).on('click', '[data-delete]', function(e) {
        e.stopPropagation();
        const type = $(this).data('delete');
        const id = $(this).data('id');
        
        Modal.show(
            'Confirmer la suppression',
            'Etes-vous sur de vouloir supprimer cet element ?',
            function() {
                switch (type) {
                    case 'education':
                        CVBuilder.removeEducation(id);
                        break;
                    case 'experience':
                        CVBuilder.removeExperience(id);
                        break;
                    case 'skill':
                        CVBuilder.removeSkill(id);
                        break;
                    case 'language':
                        CVBuilder.removeLanguage(id);
                        break;
                }
                $('[data-id="' + id + '"]').slideUp(200, function() {
                    $(this).remove();
                });
            }
        );
    });
    
    // Ajout de centre d'interet
    function addInterest() {
        const value = $('#interest-input').val().trim();
        if (CVBuilder.addInterest(value)) {
            UI.renderInterestsTags();
            $('#interest-input').val('');
        }
    }
    
    $('#add-interest-btn').on('click', addInterest);
    
    $('#interest-input').on('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInterest();
        }
    });
    
    // Suppression de centre d'interet
    $(document).on('click', '[data-remove-interest]', function() {
        const interest = $(this).data('remove-interest');
        CVBuilder.removeInterest(interest);
        UI.renderInterestsTags();
    });
    
    // Zoom
    $('#zoom-in').on('click', function() {
        CVBuilder.changeZoom(10);
    });
    
    $('#zoom-out').on('click', function() {
        CVBuilder.changeZoom(-10);
    });
    
    // Sauvegarde
    $('#save-btn').on('click', async function() {
        const $btn = $(this);
        $btn.prop('disabled', true);
        
        await CVBuilder.saveToFirebase();
        
        $btn.prop('disabled', false);
    });
    
    // Export PDF
    $('#export-pdf-btn').on('click', function() {
        CVBuilder.exportPDF();
    });
    
    // Modal
    $('#modal-cancel, .modal-overlay').on('click', function() {
        Modal.hide();
    });
    
    $('#modal-confirm').on('click', function() {
        Modal.confirm();
    });
    
    // Remplir les formulaires avec les donnees existantes
    CVBuilder.populateFormFromData();
    UI.renderInterestsTags();
});
