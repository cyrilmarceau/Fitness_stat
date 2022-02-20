import * as Yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Le champs email est requis").email("L'email est invalide"),
    password: Yup.string()
        .required("Le champs mot de passe est requis")
        .min(8, "Le mot de passe est trop court. 8 caractères minimum"),
});

const signupValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Le champs prénom est requis"),
    lastname: Yup.string().required("Le champs nom est requis"),
    email: Yup.string().required("Le champs email est requis").email("L'email est invalide"),
    phone: Yup.string()
        .required("Le champs téléphone est requis")
        .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide"),

    password: Yup.string()
        .required("Le champs mot de passe est requis")
        .min(8, "Le mot de passe est trop court. 8 caractères minimum"),
    passwordVerify: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Le mot de passe n'est pas indentiques"
    ),
});

export { loginValidationSchema, signupValidationSchema };
