/**
 * Module d'Authentification
 * =========================
 * Gestion de la connexion et de l'inscription avec Firebase Auth
 */

const Auth = {
    currentUser: null,
    
    /**
     * Initialise l'ecouteur d'etat d'authentification
     */
    init: function() {
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            if (user) {
                // Utilisateur connecte
                this.onUserLoggedIn(user);
            } else {
                // Utilisateur deconnecte
                this.onUserLoggedOut();
            }
        });
    },
    
    /**
     * Appelé quand l'utilisateur est connecte
     * @param {object} user 
     */
    onUserLoggedIn: function(user) {
        $('#user-email').text(user.email);
        $('#auth-page').removeClass('active');
        $('#builder-page').addClass('active');
        
        // Charger les donnees du CV
        CVBuilder.loadFromFirebase();
    },
    
    /**
     * Appele quand l'utilisateur est deconnecte
     */
    onUserLoggedOut: function() {
        $('#builder-page').removeClass('active');
        $('#auth-page').addClass('active');
        
        // Reinitialiser le formulaire
        Validation.clearAllErrors('login-form');
        Validation.clearAllErrors('register-form');
        $('#login-form')[0].reset();
        $('#register-form')[0].reset();
    },
    
    /**
     * Inscription d'un nouvel utilisateur
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}
     */
    register: async function(name, email, password) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Mettre a jour le profil avec le nom
            await userCredential.user.updateProfile({
                displayName: name
            });
            
            // Creer un document utilisateur dans Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Toast.success('Inscription reussie! Bienvenue ' + name);
            return { success: true, user: userCredential.user };
            
        } catch (error) {
            let message = 'Une erreur est survenue';
            
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'Cet email est deja utilise';
                    break;
                case 'auth/invalid-email':
                    message = 'Email invalide';
                    break;
                case 'auth/operation-not-allowed':
                    message = 'Inscription desactivee';
                    break;
                case 'auth/weak-password':
                    message = 'Mot de passe trop faible';
                    break;
            }
            
            return { success: false, error: message };
        }
    },
    
    /**
     * Connexion d'un utilisateur existant
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}
     */
    login: async function(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            Toast.success('Connexion reussie!');
            return { success: true, user: userCredential.user };
            
        } catch (error) {
            let message = 'Une erreur est survenue';
            
            switch (error.code) {
                case 'auth/invalid-email':
                    message = 'Email invalide';
                    break;
                case 'auth/user-disabled':
                    message = 'Compte desactive';
                    break;
                case 'auth/user-not-found':
                    message = 'Aucun compte avec cet email';
                    break;
                case 'auth/wrong-password':
                    message = 'Mot de passe incorrect';
                    break;
                case 'auth/invalid-credential':
                    message = 'Email ou mot de passe incorrect';
                    break;
            }
            
            return { success: false, error: message };
        }
    },
    
    /**
     * Deconnexion de l'utilisateur
     * @returns {Promise}
     */
    logout: async function() {
        try {
            await auth.signOut();
            Toast.info('Vous avez ete deconnecte');
            return { success: true };
        } catch (error) {
            Toast.error('Erreur lors de la deconnexion');
            return { success: false, error: error.message };
        }
    }
};
