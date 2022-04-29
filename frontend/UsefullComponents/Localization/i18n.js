import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ro: {
      translations: {
        /**Dashboard**/
        mainMessage: 'Bine ai venit pe pagina de început a firmei Salamander Sistem',
        /*Private & Public Route*/
        loadingMessagePrivateRoute: 'Loading...',
        loadingMessagePublicRoute: 'Loading...',

        /*Links*/
        masuriLink: 'Măsuri',
        ofertareLink: 'Ofertare',
        comenziLink: 'Comenzi',
        sticlaLink: 'Sticlă',
        montajLink: 'Montaj',
        bazaClientiLink: 'Bază Clienți',
        rameLink: 'Rame',
        detaliiClientiLink: 'Detalii Clienți',
        mainPage: 'Meniu Principal',
        reports: 'Rapoarte',
        employees: 'Angajați',
        roles: 'Roluri',

        /*Validation Errors*/
        emailInvalid: 'You must enter a valid email address',
        emailToLong: 'Must be shorter than 255',
        emailMissing: 'You must enter an email',
        passwordMissing: 'Enter a password',
        confirmPassordNotMatching: "Passwords doesn't match",
        confirmPassowrdMissingReset: 'Please confirm your password',
        /**Logout Button**/
        logoutButtonText: 'Log Out',
        /**Login Page**/
        loginButtonText: 'Log In',
        /**ResetPasswordPage**/
        pageTitleResetPasswordPage: 'Resetare Parolă',
        pageInstructionsResetPasswordPage:
          'Introduceți mail-ul aferent contului dvs, ' +
          'și veți primi un email cu toate instrucțiunile necesare resetării parolei.',
        resetPasswordEmailSentAlert: 'Verifică email-ul și urmează instrucțiunile.',
        resetPasswordEmailNotSentAlert:
          'Există anumite probleme tehnice. Contactează adminul paginii pentru alte instrucțiuni.',
        sendLinkButtonResetPasswordPage: 'Trimite Email',
        /**SetNewPasswordPage**/
        pageTitleSetNewPasswordPage: 'Confirmarea Noii Parole',
        pageInstructionsSetNewPasswordPage: 'Introdu noua parolă',
        errorSettingNewPassword:
          'Probleme tehnice. Ne cerem scuze, te rugăm să contactezi adminul pentru următoare instrucțiuni',
        changePasswordButton: 'Schimbă parola!',
      },
    },
  },
  fallbackLng: 'ro',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
