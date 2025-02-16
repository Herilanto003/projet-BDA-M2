import * as yup from "yup";

export const schemaRegisterForm = yup.object().shape({
  name: yup.string().required("Le pseudo est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      "Les mots de passe doivent correspondre"
    ),
});

export const schemaLoginForm = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
});

export type RegisterFormValues = yup.InferType<typeof schemaRegisterForm>;
export type LoginFormValues = yup.InferType<typeof schemaLoginForm>;
