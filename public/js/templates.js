/**
 * Module Templates
 * ================
 * Templates HTML pour la generation du CV
 */

const Templates = {
    /**
     * Rendu du template selectionne
     * @param {string} templateName 
     * @param {object} data 
     * @returns {string} HTML
     */
    render: function(templateName, data) {
        switch (templateName) {
            case 'classic':
                return this.renderClassic(data);
            case 'modern':
            default:
                return this.renderModern(data);
        }
    },
    
    /**
     * Template Moderne
     * @param {object} data 
     * @returns {string} HTML
     */
    renderModern: function(data) {
        const { personal, education, experience, skills, languages, interests } = data;
        const fullName = (personal.prenom + ' ' + personal.nom).trim() || 'Votre Nom';
        
        let html = '<div class="cv-modern">';
        
        // Header
        html += '<div class="cv-header">';
        if (personal.photo) {
            html += '<img src="' + personal.photo + '" alt="Photo" class="cv-photo">';
        }
        html += '<div class="cv-header-info">';
        html += '<h1>' + this.escapeHtml(fullName) + '</h1>';
        if (personal.titre) {
            html += '<div class="cv-title">' + this.escapeHtml(personal.titre) + '</div>';
        }
        html += '<div class="cv-contact">';
        if (personal.email) {
            html += '<span class="cv-contact-item">' + this.iconEmail() + ' ' + this.escapeHtml(personal.email) + '</span>';
        }
        if (personal.telephone) {
            html += '<span class="cv-contact-item">' + this.iconPhone() + ' ' + this.escapeHtml(personal.telephone) + '</span>';
        }
        if (personal.adresse) {
            html += '<span class="cv-contact-item">' + this.iconLocation() + ' ' + this.escapeHtml(personal.adresse) + '</span>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        // Body
        html += '<div class="cv-body">';
        
        // Main content
        html += '<div class="cv-main">';
        
        // Profil
        if (personal.profil) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Profil</h2>';
            html += '<p style="font-size: 0.875rem; line-height: 1.6; color: #475569;">' + this.escapeHtml(personal.profil) + '</p>';
            html += '</div>';
        }
        
        // Experience
        if (experience.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Experience Professionnelle</h2>';
            experience.forEach(exp => {
                html += '<div class="cv-item">';
                html += '<div class="cv-item-header">';
                html += '<span class="cv-item-title">' + this.escapeHtml(exp.poste || 'Poste') + '</span>';
                html += '<span class="cv-item-date">' + this.formatDateRange(exp.dateDebut, exp.dateFin) + '</span>';
                html += '</div>';
                html += '<div class="cv-item-subtitle">' + this.escapeHtml(exp.entreprise || '') + (exp.ville ? ' - ' + this.escapeHtml(exp.ville) : '') + '</div>';
                if (exp.description) {
                    html += '<div class="cv-item-description">' + this.escapeHtml(exp.description) + '</div>';
                }
                html += '</div>';
            });
            html += '</div>';
        }
        
        // Education
        if (education.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Formation</h2>';
            education.forEach(edu => {
                html += '<div class="cv-item">';
                html += '<div class="cv-item-header">';
                html += '<span class="cv-item-title">' + this.escapeHtml(edu.diplome || 'Diplome') + '</span>';
                html += '<span class="cv-item-date">' + this.formatDateRange(edu.dateDebut, edu.dateFin) + '</span>';
                html += '</div>';
                html += '<div class="cv-item-subtitle">' + this.escapeHtml(edu.etablissement || '') + (edu.ville ? ' - ' + this.escapeHtml(edu.ville) : '') + '</div>';
                if (edu.description) {
                    html += '<div class="cv-item-description">' + this.escapeHtml(edu.description) + '</div>';
                }
                html += '</div>';
            });
            html += '</div>';
        }
        
        html += '</div>'; // End main
        
        // Sidebar
        html += '<div class="cv-sidebar">';
        
        // Competences
        if (skills.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Competences</h2>';
            skills.forEach(skill => {
                const percentage = (skill.niveau / 5) * 100;
                html += '<div class="cv-skill">';
                html += '<div class="cv-skill-name"><span>' + this.escapeHtml(skill.nom || 'Competence') + '</span></div>';
                html += '<div class="cv-skill-bar"><div class="cv-skill-level" style="width: ' + percentage + '%"></div></div>';
                html += '</div>';
            });
            html += '</div>';
        }
        
        // Langues
        if (languages.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Langues</h2>';
            languages.forEach(lang => {
                html += '<div class="cv-language">';
                html += '<span>' + this.escapeHtml(lang.langue || 'Langue') + '</span>';
                html += '<span>' + this.escapeHtml(lang.niveau) + '</span>';
                html += '</div>';
            });
            html += '</div>';
        }
        
        // Centres d'interet
        if (interests.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Centres d\'interet</h2>';
            html += '<div class="cv-interests">';
            interests.forEach(interest => {
                html += '<span class="cv-interest">' + this.escapeHtml(interest) + '</span>';
            });
            html += '</div>';
            html += '</div>';
        }
        
        html += '</div>'; // End sidebar
        html += '</div>'; // End body
        html += '</div>'; // End cv-modern
        
        return html;
    },
    
    /**
     * Template Classique
     * @param {object} data 
     * @returns {string} HTML
     */
    renderClassic: function(data) {
        const { personal, education, experience, skills, languages, interests } = data;
        const fullName = (personal.prenom + ' ' + personal.nom).trim() || 'Votre Nom';
        
        let html = '<div class="cv-classic">';
        
        // Header
        html += '<div class="cv-header">';
        if (personal.photo) {
            html += '<img src="' + personal.photo + '" alt="Photo" class="cv-photo">';
        }
        html += '<h1>' + this.escapeHtml(fullName) + '</h1>';
        if (personal.titre) {
            html += '<div class="cv-title">' + this.escapeHtml(personal.titre) + '</div>';
        }
        html += '<div class="cv-contact">';
        if (personal.email) {
            html += '<span class="cv-contact-item">' + this.iconEmail() + ' ' + this.escapeHtml(personal.email) + '</span>';
        }
        if (personal.telephone) {
            html += '<span class="cv-contact-item">' + this.iconPhone() + ' ' + this.escapeHtml(personal.telephone) + '</span>';
        }
        if (personal.adresse) {
            html += '<span class="cv-contact-item">' + this.iconLocation() + ' ' + this.escapeHtml(personal.adresse) + '</span>';
        }
        html += '</div>';
        html += '</div>';
        
        // Profil
        if (personal.profil) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Profil</h2>';
            html += '<p class="cv-profile">' + this.escapeHtml(personal.profil) + '</p>';
            html += '</div>';
        }
        
        // Experience
        if (experience.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Experience Professionnelle</h2>';
            experience.forEach(exp => {
                html += '<div class="cv-item">';
                html += '<div class="cv-item-header">';
                html += '<span class="cv-item-title">' + this.escapeHtml(exp.poste || 'Poste') + '</span>';
                html += '<span class="cv-item-date">' + this.formatDateRange(exp.dateDebut, exp.dateFin) + '</span>';
                html += '</div>';
                html += '<div class="cv-item-subtitle">' + this.escapeHtml(exp.entreprise || '') + (exp.ville ? ', ' + this.escapeHtml(exp.ville) : '') + '</div>';
                if (exp.description) {
                    html += '<div class="cv-item-description">' + this.escapeHtml(exp.description) + '</div>';
                }
                html += '</div>';
            });
            html += '</div>';
        }
        
        // Education
        if (education.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Formation</h2>';
            education.forEach(edu => {
                html += '<div class="cv-item">';
                html += '<div class="cv-item-header">';
                html += '<span class="cv-item-title">' + this.escapeHtml(edu.diplome || 'Diplome') + '</span>';
                html += '<span class="cv-item-date">' + this.formatDateRange(edu.dateDebut, edu.dateFin) + '</span>';
                html += '</div>';
                html += '<div class="cv-item-subtitle">' + this.escapeHtml(edu.etablissement || '') + (edu.ville ? ', ' + this.escapeHtml(edu.ville) : '') + '</div>';
                if (edu.description) {
                    html += '<div class="cv-item-description">' + this.escapeHtml(edu.description) + '</div>';
                }
                html += '</div>';
            });
            html += '</div>';
        }
        
        // Two columns section
        html += '<div class="cv-two-columns">';
        
        // Column 1: Competences
        html += '<div>';
        if (skills.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Competences</h2>';
            skills.forEach(skill => {
                html += '<div class="cv-skill">';
                html += '<span class="cv-skill-name">' + this.escapeHtml(skill.nom || 'Competence') + '</span>';
                html += '<span class="cv-skill-dots">';
                for (let i = 1; i <= 5; i++) {
                    html += '<span class="cv-skill-dot' + (i <= skill.niveau ? ' filled' : '') + '"></span>';
                }
                html += '</span>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        // Column 2: Langues
        html += '<div>';
        if (languages.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Langues</h2>';
            languages.forEach(lang => {
                html += '<div class="cv-language">';
                html += '<span>' + this.escapeHtml(lang.langue || 'Langue') + '</span>';
                html += '<span>' + this.escapeHtml(lang.niveau) + '</span>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        html += '</div>'; // End two-columns
        
        // Centres d'interet
        if (interests.length > 0) {
            html += '<div class="cv-section">';
            html += '<h2 class="cv-section-title">Centres d\'interet</h2>';
            html += '<div class="cv-interests">';
            interests.forEach(interest => {
                html += '<span class="cv-interest">' + this.escapeHtml(interest) + '</span>';
            });
            html += '</div>';
            html += '</div>';
        }
        
        html += '</div>'; // End cv-classic
        
        return html;
    },
    
    /**
     * Formate une plage de dates
     * @param {string} start 
     * @param {string} end 
     * @returns {string}
     */
    formatDateRange: function(start, end) {
        if (!start && !end) return '';
        if (start && !end) return start + ' - Present';
        if (!start && end) return end;
        return start + ' - ' + end;
    },
    
    /**
     * Echappe les caracteres HTML
     * @param {string} text 
     * @returns {string}
     */
    escapeHtml: function(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Icones SVG
    iconEmail: function() {
        return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
    },
    
    iconPhone: function() {
        return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
    },
    
    iconLocation: function() {
        return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
    }
};
