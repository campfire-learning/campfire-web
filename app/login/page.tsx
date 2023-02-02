import { CampfireLogo } from "../../components/assets/CampfireLogo";
import { LoginForm } from "../../components/login/LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex h-screen min-h-full flex-col items-center justify-center py-12 px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <CampfireLogo className="mx-auto h-16 w-auto fill-amber-700 hover:cursor-pointer hover:fill-amber-800" />
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-amber-400">
            Welcome to Campfire!
          </h2>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
