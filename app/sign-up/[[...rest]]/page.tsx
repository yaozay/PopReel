// app/sign-up/[[...rest]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
