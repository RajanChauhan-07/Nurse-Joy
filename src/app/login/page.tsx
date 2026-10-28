import { FullScreenLogin } from "@/components/ui/full-screen-login";

export const metadata = {
  title: "Login - HextaStudio",
  description: "Log in to your HextaStudio account",
};

export default function LoginPage() {
  return (
    <main>
      <FullScreenLogin />
    </main>
  );
}
