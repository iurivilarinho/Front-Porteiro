import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { usePostLogin } from "@/lib/api/tanstackQuery/login";
import useValidation from "@/lib/hooks/useValidation";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  // const { setIsLoading } = useLoadingScreenContext();

  // const { isPasswordVisible, handlePasswordVisibility } = useHandlePassword();
  const { values, handleChange, validateField, validateForm, errors } =
    useValidation(
      {
        login: (value) => (value ? null : "Insira seu login"),
        senha: (value) => (value ? null : "Insira sua senha"),
      },
      { login: "", senha: "" }
    );
  const {
    mutate: authenticateUser,
    data: userData,
    isPending: isAuthenticationPending,
    isSuccess: isAuthenticationSuccess,
  } = usePostLogin();

  // useEffect(() => {
  //   setIsLoading(isAuthenticationPending);
  // }, [isAuthenticationPending]);

  const submitForm = () => {
    if (validateForm()) {
      authenticateUser(values);
    }
  };

  useEffect(() => {
    if (isAuthenticationSuccess && userData) {
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/home");
    }
  }, [isAuthenticationSuccess, userData]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-6 p-6">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <h1 className="tracking-tigh text-2xl font-semibold text-foreground">
            Bem-vindo!
          </h1>
        </div>
        <p className="text-center text-sm font-normal text-muted-foreground">
          Digite seu login e senha para acessar o painel fiscal.
        </p>
      </div>
      <Input
        label="Login"
        value={values.login}
        onChange={(e) => handleChange("login", e.target.value)}
        onBlur={() => validateField("login", values.login)}
        notification={{
          isError: Boolean(errors.login),
          notification: errors.login ?? "",
        }}
      />
      <Input
        label="Senha"
        value={values.senha}
        onChange={(e) => handleChange("senha", e.target.value)}
        onBlur={() => validateField("senha", values.senha)}
        notification={{
          isError: Boolean(errors.senha),
          notification: errors.senha ?? "",
        }}
      />
      <div className="flex justify-end">
        <Link
          to="/recuperar-senha"
          className="text-sm text-foreground hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>
      <Button onClick={submitForm}>Login</Button>
    </div>
  );
};

export default LoginForm;
