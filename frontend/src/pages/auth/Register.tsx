import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  schemaRegisterForm,
  RegisterFormValues,
} from "../../validation/authFormSchema";
import { useRegisterMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schemaRegisterForm),
  });

  const [registerUser, state] = useRegisterMutation();

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
    registerUser(data)
      .unwrap()
      .then((res) => {
        toast.success("Inscription réussie");
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err?.data?.error === "NAME ERROR") {
          toast.error("Ce pseudo est déjà utilisé");
        } else if (err?.data?.error === "EMAIL ERROR") {
          toast.error("Cet email est déjà utilisé");
        } else {
          toast.error("Erreur lors de l'inscription");
        }
      });
  };

  return (
    <div>
      <header className="w-full h-12">header</header>

      <div className="w-1/2 m-auto mt-4 border-2 box-border px-6 rounded-sm">
        <h1 className="my-4 text-center text-2xl font-semibold text-gray-800">
          Inscription
        </h1>

        <div className="mt-4 w-3/4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-7 flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-800"
              >
                Pseudo
              </label>
              <input
                type="text"
                className="outline-none py-2 px-3 rounded-sm bg-gray-100 text-sm border-b-2 border-b-gray-400 text-gray-800"
                placeholder="Votre pseudo"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-7 flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="outline-none py-2 px-3 rounded-sm bg-gray-100 text-sm border-b-2 border-b-gray-400 text-gray-800"
                placeholder="Votre email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-7 flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-800"
              >
                Mot de passe
              </label>
              <input
                type="password"
                className="outline-none py-2 px-3 rounded-sm bg-gray-100 text-sm border-b-2 border-b-gray-400 text-gray-800"
                placeholder="Votre mot de passe"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-7 flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-800"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="outline-none py-2 px-3 rounded-sm bg-gray-100 text-sm border-b-2 border-b-gray-400 text-gray-800"
                placeholder="confirmer votre mot de passe"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <button
              className="w-full p-2 mb-7 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold rounded-sm text-sm"
              disabled={state.isLoading}
            >
              {state.isLoading ? "Chargement..." : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
