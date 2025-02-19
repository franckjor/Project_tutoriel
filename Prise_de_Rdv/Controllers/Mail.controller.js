const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

const user = require("../Models/User.model");
const Doctor = require("../Models/Doctor.model");

const days = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];
const months = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

let transporter = nodemailer.createTransport({
  host: process.env.EMAILSERVER_HOST,
  port: process.env.EMAILSERVER_HOST_PORT,
  secure: true,
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

transporter.use(
  "compile",
  pugEngine({
    templateDir: __dirname + "../Views/",
  })
);

exports.adminForgetPassword = (email, token, url) => {
  transporter
    .sendMail({
      from: `"Prise_Rdv, Renouvellemnt de votre mot de passe" <${config.email}>`,
      to: email,
      subject: "Récupération de votre compte",
      text: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante ${url}/renew/${token}`,
      template: "mail",
      ctx: {
        welcome: `Bonjour,`,
        title: "Récupération de votre compte",
        confirm: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante `,
        link: `${url}/renew/${token}`,
        footer:
          "attention le lien n'est valable que durant 1H, passé ce délai il aura expiré",
        bye: "A bienôt",
      },
    })
    .then(() => console.log("mail bien envoyé"))
    .catch(error => console.warn(error));
};

exports.userForgetPassword = (email, token, url) => {
  transporter
    .sendMail({
      from: `"Prise_Rdv, Renouvellemnt de votre mot de passe" <${config.email}>`,
      to: email, 
      subject: "Récupération de votre compte", 
      text: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante ${url}/renew/${token}`, // plain text body
      template: "mail",
      ctx: {
        welcome: `Bonjour,`,
        title: "Récupération de votre compte",
        confirm: `Pour renouveller votre mot de passe veuillez vous rendre à l'adresse suivante `,
        link: `${url}/renew/${token}`,
        footer:
          "attention le lien n'est valable que durant 1H, passé ce délai il aura expiré",
        bye: "A bienôt",
      },
    })
    .then(() => console.log("mail bien envoyé"))
    .catch(error => console.warn(error));
};

exports.appointmentConfirmMail = (appointment, userId) =>  {
    Doctor.findOne({ _id: appointment.doctorId})
      .then((doctor) => {
        User.findOne({ _id: userId })
          .then((user) => {
            if (user && (user.email !== null)) {
              const appointmentDate = new Date(appointment.startTime);
              const day = `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]}`
              const hour = `${(`0${appointmentDate.getHours()}`).substr(-2)}:${(`0${appointmentDate.getMinutes()}`).substr(-2)}`;
              transporter.sendMail({
                from: `"Prise_Rdv, votre rendez-vous" <${config.email}>`, 
                to: user.email, 
                subject: `Confirmation de votre rendez-vous avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // Subject line
                text: `Confirmation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // plain text body
                template: 'mail',
                ctx: {
                  welcome: `Bonjour ${user.firstname} ${user.lastname}`,
                  title: `Confirmation de votre rendez-vous du ${day}`,
                  confirm: `Nous avons bien enregistré votre rendez-vous le ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
                  footer: `Pour consulter ou annuler vos rendez-vous connectez-vous sur l'historique de votre compte à l'adresse suivante:`,
                  link: `https://medi-libre.fr/${doctor.slug}`,
                  bye: `à bientôt`
                },
              })
                .then(() => console.log('mail bien envoyé'));
            }
          })
        
      })
  }
  

  exports.appointmentCancelMail = (appointment, userId) =>  {
    Doctor.findOne({ _id: appointment.doctorId})
      .then((doctor) => {
        User.findOne({ _id: userId })
          .then((user) => {
            if (user.email) {
              const appointmentDate = new Date(appointment.startTime);
              const day = `${days[appointmentDate.getDay()]} ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]}`
              const hour = `${(`0${appointmentDate.getHours()}`).substr(-2)}:${(`0${appointmentDate.getMinutes()}`).substr(-2)}`;
              transporter.sendMail({
                from: `"Prise_Rdv, annulation de votre rendez-vous" <${config.email}>`, // sender address
                to: user.email, // list of receivers
                subject: `Annulation de votre rendez-vous ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname}`, // Subject line
                text: `Nous vous confirmons l'annulation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`, // plain text body
                template: 'mail',
                ctx: {
                  welcome: `Bonjour ${user.firstname} ${user.lastname}`,
                  title: `Annulation de votre rendez-vous ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname}`,
                  confirm: `Nous vous confirmons l'annulation de votre rendez-vous du ${day} à ${hour} avec ${doctor.firstname} ${doctor.lastname} votre ${doctor.job}`,
                  footer: `Pour consulter ou annuler vos rendez-vous connectez-vous sur l'historique de votre compte à l'adresse suivante:`,
                  link: `https://medi-libre.fr/${doctor.slug}`,
                  bye: `à bientôt`
                },
              })
                .then(() => console.log('mail bien envoyé'));
            }
          });
      });
  }
  

  exports.newUserConfirmMail = ( userId) =>  {
    User.findOne({ _id: userId })
      .then((user) => {
        transporter.sendMail({
          from: `"Prise_Rdv, Création de votre compte" <${config.email}>`, // sender address
          to: user.email, // list of receivers
          subject: "Création de votre compte", // Subject line
          text: `Nous avons le plaisir de vous confirmer la creation de votre compte patient au nom de ${user.firstname} ${user.lastname}`, // plain text body
          template: 'mail',
          ctx: {
            welcome: `Bonjour ${user.firstname} ${user.lastname}`,
            title: `Création de votre compte patient`,
            confirm: `Nous avons le plaisir de vous confirmer la creation de votre compte patient au nom de ${user.firstname} ${user.lastname}`,
            footer: `Vous pouvez desormais prendre rendez-vous avec votre praticien sur `,
            link: `https://medi-libre.fr`,
            bye: `à bientôt sur Prise_Rdv`
          },
        })
          .then(() => console.log('mail bien envoyé'));
      })
  }

  exports.modifyUserDatasMail = ( userId) =>  {
    User.findOne({ _id: userId })
      .then((user) => {
        transporter.sendMail({
          from: `"Prise_Rdv" <${config.email}>`, 
          to: user.email, 
          subject: "Modification des informations de votre compte", // Subject line
          text: `Vos données ont été modifiés`,
          template: 'mail',
          ctx: {
            welcome: `Bonjour ${user.firstname} ${user.lastname}`,
            title: `Modification de vos données`,
            confirm: `Des données vous concernant ont été modifiée dans votre compte MédiLibre`,
            bye: `à bientôt sur Prise_Rdv`
          },
        })
          .then(() => console.log('mail bien envoyé'));
      })
  }
  