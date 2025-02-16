import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  schemaLoginForm,
  LoginFormValues,
} from "../../validation/authFormSchema";
import { useLoginMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schemaLoginForm),
  });

  const [loginUser, state] = useLoginMutation();

  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    loginUser(data)
      .unwrap()
      .then((res) => {
        toast.success("Connexion réussie");
        console.log(res);
        dispatch(setCredentials(res));
      })
      .catch((err) => {
        console.log(err);
        if (err?.data?.error === "USER NOT FOUND") {
          toast.error("Cet email n'existe pas");
        } else if (err?.data?.error === "INVALID PASSWORD") {
          toast.error("Mot de passe incorrect");
        } else {
          toast.error("Erreur lors de la connexion");
        }
      });
  };

  return (
    <div>
      <div>
        <header className="w-full h-12">header</header>

        <div className="w-1/2 m-auto mt-4 border-2 box-border px-6 rounded-sm">
          <h1 className="my-4 text-center text-2xl font-semibold text-gray-800">
            Connexion
          </h1>

          <div className="mt-4 w-3/4 m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <button
                className="w-full shadow-sm shadow-blue-500 p-2 mb-7 bg-blue-500 hover:bg-blue-700 transition-all text-white font-semibold rounded-sm text-sm"
                disabled={state.isLoading}
              >
                {state.isLoading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
