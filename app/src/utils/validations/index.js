import * as Yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Le champ email est requis"),
    password: Yup.string()
        .required("Le champ mot de passe est requis")
});

const signupValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Le champ prénom est requis"),
    lastname: Yup.string().required("Le champ nom est requis"),
    email: Yup.string().required("Le champ email est requis"),
    phone: Yup.string()
        .required("Le champ téléphone est requis")
        .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide"),

    password1: Yup.string().required("Le champ mot de passe est requis"),
    
    password2: Yup.string().required("Le champ mot de passe est requis")
});

const accountValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Le champ prénom est requis"),
    lastname: Yup.string().required("Le champ nom est requis"),
    email: Yup.string().required("Le champ email est requis"),
    phone: Yup.string()
        .required("Le champ téléphone est requis")
        .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide"),

    new_password1: Yup.string().required("Le champ mot de passe est requis"),
    
    new_password2: Yup.string().required("Le champ de confirmation du mot de passe est requis")
});

const resetValidationSchema = Yup.object().shape({
    email: Yup.string().required("Le champ email est requis"),
});

export { loginValidationSchema, signupValidationSchema, resetValidationSchema, accountValidationSchema };
