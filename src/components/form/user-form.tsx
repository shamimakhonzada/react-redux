import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { userSchema } from "@/lib/zod/userSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";

type FormData = z.infer<typeof userSchema>;

interface FormField {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "03001234567",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];

export default function UserFormComponent() {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 600));
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
  };

  // Success state
  if (submitted) {
    return (
      <Card className="mx-auto w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-3">
          <CheckCircle className="size-12 text-emerald-500" />
          <CardTitle className="text-xl">Submitted Successfully!</CardTitle>
          <CardDescription>Your information has been saved.</CardDescription>
          <Button variant="outline" onClick={handleReset} className="mt-2">
            Submit Another
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">User Information</CardTitle>
        <CardDescription>
          Fill in the details below. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {formFields.map((field) => {
            const isPassword = field.type === "password";
            const inputType = isPassword
              ? showPassword
                ? "text"
                : "password"
              : field.type;

            return (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={inputType}
                    placeholder={field.placeholder}
                    aria-invalid={!!errors[field.name]}
                    {...register(field.name)}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  )}
                </div>
                {errors[field.name] && (
                  <p className="text-xs text-destructive">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            );
          })}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {isSubmitting ? "Submitting…" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
