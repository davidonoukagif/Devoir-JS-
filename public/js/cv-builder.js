/**
 * Module CV Builder
 * =================
 * Gestion des donnees du CV et sauvegarde
 */

const CVBuilder = {
    // Structure des donnees du CV
    data: {
        personal: {
            prenom: '',
            nom: '',
            titre: '',
            email: '',
            telephone: '',
            adresse: '',
            profil: '',
            photo: ''
        },
        education: [],
        experience: [],
        skills: [],
        languages: [],
        interests: []
    },
    
    // Template selectionne
    currentTemplate: 'modern',
    
    // Zoom actuel
    zoomLevel: 100,
    
    // Compteur pour les IDs uniques
    idCounter: 0,
    
    /**
     * Genere un ID unique
     * @returns {string}
     */
    generateId: function() {
        return 'item_' + Date.now() + '_' + (++this.idCounter);
    },
    
    /**
     * Initialise le builder
     */
    init: function() {
        // Charger depuis localStorage d'abord (pour recuperation rapide)
        this.loadFromLocalStorage();
        
        // Mettre a jour l'apercu
        this.updatePreview();
    },
    
    /**
     * Met a jour une donnee personnelle
     * @param {string} field 
     * @param {string} value 
     */
    updatePersonal: function(field, value) {
        this.data.personal[field] = value;
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Ajoute une formation
     * @returns {string} ID de la formation ajoutee
     */
    addEducation: function() {
        const id = this.generateId();
        this.data.education.push({
            id: id,
            diplome: '',
            etablissement: '',
            ville: '',
            dateDebut: '',
            dateFin: '',
            description: ''
        });
        this.saveToLocalStorage();
        return id;
    },
    
    /**
     * Met a jour une formation
     * @param {string} id 
     * @param {string} field 
     * @param {string} value 
     */
    updateEducation: function(id, field, value) {
        const item = this.data.education.find(e => e.id === id);
        if (item) {
            item[field] = value;
            this.saveToLocalStorage();
            this.updatePreview();
        }
    },
    
    /**
     * Supprime une formation
     * @param {string} id 
     */
    removeEducation: function(id) {
        this.data.education = this.data.education.filter(e => e.id !== id);
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Ajoute une experience
     * @returns {string} ID de l'experience ajoutee
     */
    addExperience: function() {
        const id = this.generateId();
        this.data.experience.push({
            id: id,
            poste: '',
            entreprise: '',
            ville: '',
            dateDebut: '',
            dateFin: '',
            description: ''
        });
        this.saveToLocalStorage();
        return id;
    },
    
    /**
     * Met a jour une experience
     * @param {string} id 
     * @param {string} field 
     * @param {string} value 
     */
    updateExperience: function(id, field, value) {
        const item = this.data.experience.find(e => e.id === id);
        if (item) {
            item[field] = value;
            this.saveToLocalStorage();
            this.updatePreview();
        }
    },
    
    /**
     * Supprime une experience
     * @param {string} id 
     */
    removeExperience: function(id) {
        this.data.experience = this.data.experience.filter(e => e.id !== id);
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Ajoute une competence
     * @returns {string} ID de la competence ajoutee
     */
    addSkill: function() {
        const id = this.generateId();
        this.data.skills.push({
            id: id,
            nom: '',
            niveau: 3 // 1-5
        });
        this.saveToLocalStorage();
        return id;
    },
    
    /**
     * Met a jour une competence
     * @param {string} id 
     * @param {string} field 
     * @param {string} value 
     */
    updateSkill: function(id, field, value) {
        const item = this.data.skills.find(s => s.id === id);
        if (item) {
            item[field] = field === 'niveau' ? parseInt(value) : value;
            this.saveToLocalStorage();
            this.updatePreview();
        }
    },
    
    /**
     * Supprime une competence
     * @param {string} id 
     */
    removeSkill: function(id) {
        this.data.skills = this.data.skills.filter(s => s.id !== id);
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Ajoute une langue
     * @returns {string} ID de la langue ajoutee
     */
    addLanguage: function() {
        const id = this.generateId();
        this.data.languages.push({
            id: id,
            langue: '',
            niveau: 'Intermediaire'
        });
        this.saveToLocalStorage();
        return id;
    },
    
    /**
     * Met a jour une langue
     * @param {string} id 
     * @param {string} field 
     * @param {string} value 
     */
    updateLanguage: function(id, field, value) {
        const item = this.data.languages.find(l => l.id === id);
        if (item) {
            item[field] = value;
            this.saveToLocalStorage();
            this.updatePreview();
        }
    },
    
    /**
     * Supprime une langue
     * @param {string} id 
     */
    removeLanguage: function(id) {
        this.data.languages = this.data.languages.filter(l => l.id !== id);
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Ajoute un centre d'interet
     * @param {string} interest 
     */
    addInterest: function(interest) {
        if (interest && interest.trim() !== '' && !this.data.interests.includes(interest.trim())) {
            this.data.interests.push(interest.trim());
            this.saveToLocalStorage();
            this.updatePreview();
            return true;
        }
        return false;
    },
    
    /**
     * Supprime un centre d'interet
     * @param {string} interest 
     */
    removeInterest: function(interest) {
        this.data.interests = this.data.interests.filter(i => i !== interest);
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Change le template
     * @param {string} template 
     */
    setTemplate: function(template) {
        this.currentTemplate = template;
        this.saveToLocalStorage();
        this.updatePreview();
    },
    
    /**
     * Change le niveau de zoom
     * @param {number} delta 
     */
    changeZoom: function(delta) {
        this.zoomLevel = Math.min(150, Math.max(50, this.zoomLevel + delta));
        $('#zoom-level').text(this.zoomLevel + '%');
        $('.cv-preview').css('transform', 'scale(' + (this.zoomLevel / 100) + ')');
    },
    
    /**
     * Met a jour l'apercu du CV
     */
    updatePreview: function() {
        const html = Templates.render(this.currentTemplate, this.data);
        $('#cv-preview').html(html);
    },
    
    /**
     * Sauvegarde dans localStorage
     */
    saveToLocalStorage: function() {
        try {
            localStorage.setItem('cv_data', JSON.stringify(this.data));
            localStorage.setItem('cv_template', this.currentTemplate);
        } catch (e) {
            console.warn('Impossible de sauvegarder dans localStorage:', e);
        }
    },
    
    /**
     * Charge depuis localStorage
     */
    loadFromLocalStorage: function() {
        try {
            const savedData = localStorage.getItem('cv_data');
            const savedTemplate = localStorage.getItem('cv_template');
            
            if (savedData) {
                this.data = JSON.parse(savedData);
            }
            if (savedTemplate) {
                this.currentTemplate = savedTemplate;
                $('#template-select').val(savedTemplate);
            }
        } catch (e) {
            console.warn('Impossible de charger depuis localStorage:', e);
        }
    },
    
    /**
     * Sauvegarde dans Firebase
     * @returns {Promise}
     */
    saveToFirebase: async function() {
        if (!Auth.currentUser) {
            Toast.error('Vous devez etre connecte pour sauvegarder');
            return { success: false };
        }
        
        try {
            await db.collection('cvs').doc(Auth.currentUser.uid).set({
                data: this.data,
                template: this.currentTemplate,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Toast.success('CV sauvegarde avec succes!');
            return { success: true };
        } catch (error) {
            console.error('Erreur sauvegarde Firebase:', error);
            Toast.error('Erreur lors de la sauvegarde');
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Charge depuis Firebase
     * @returns {Promise}
     */
    loadFromFirebase: async function() {
        if (!Auth.currentUser) {
            return { success: false };
        }
        
        try {
            const doc = await db.collection('cvs').doc(Auth.currentUser.uid).get();
            
            if (doc.exists) {
                const savedData = doc.data();
                this.data = savedData.data;
                this.currentTemplate = savedData.template || 'modern';
                
                // Mettre a jour l'interface
                $('#template-select').val(this.currentTemplate);
                this.populateFormFromData();
                this.updatePreview();
                
                // Sauvegarder aussi en local
                this.saveToLocalStorage();
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erreur chargement Firebase:', error);
            // Utiliser les donnees locales comme fallback
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Remplit les formulaires avec les donnees chargees
     */
    populateFormFromData: function() {
        // Informations personnelles
        Object.keys(this.data.personal).forEach(field => {
            const value = this.data.personal[field];
            if (field === 'photo' && value) {
                $('#photo-preview').html('<img src="' + value + '" alt="Photo">');
                $('#photo-remove').removeClass('hidden');
            } else {
                $('[data-field="' + field + '"]').val(value);
            }
        });
        
        // Formations
        $('#education-list').empty();
        this.data.education.forEach(edu => {
            UI.addEducationItem(edu);
        });
        
        // Experiences
        $('#experience-list').empty();
        this.data.experience.forEach(exp => {
            UI.addExperienceItem(exp);
        });
        
        // Competences
        $('#skills-list').empty();
        this.data.skills.forEach(skill => {
            UI.addSkillItem(skill);
        });
        
        // Langues
        $('#languages-list').empty();
        this.data.languages.forEach(lang => {
            UI.addLanguageItem(lang);
        });
        
        // Centres d'interet
        UI.renderInterestsTags();
    },
    
    /**
     * Exporte le CV en PDF
     */
    exportPDF: async function() {
        const { jsPDF } = window.jspdf;
        
        Toast.info('Generation du PDF en cours...');
        
        try {
            const cvElement = document.getElementById('cv-preview');
            
            // Temporairement retirer le zoom pour l'export
            const originalTransform = cvElement.style.transform;
            cvElement.style.transform = 'none';
            
            const canvas = await html2canvas(cvElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            
            // Restaurer le zoom
            cvElement.style.transform = originalTransform;
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            let heightLeft = imgHeight;
            let position = 0;
            
            // Premiere page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Pages supplementaires si necessaire
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Nom du fichier
            const nom = this.data.personal.nom || 'CV';
            const prenom = this.data.personal.prenom || '';
            const fileName = 'CV_' + prenom + '_' + nom + '.pdf';
            
            pdf.save(fileName.replace(/\s+/g, '_'));
            
            Toast.success('PDF telecharge avec succes!');
        } catch (error) {
            console.error('Erreur export PDF:', error);
            Toast.error('Erreur lors de l\'export PDF');
        }
    }
};
