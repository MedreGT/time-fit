import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  objetivo: string;
  horario: string;
  lgpdConsent: boolean;
}

interface FormErrors {
  nome?: string;
  whatsapp?: string;
  objetivo?: string;
  horario?: string;
  lgpdConsent?: string;
}

const WHATSAPP_LINK =
  "https://chat.whatsapp.com/SEU-LINK-AQUI";
const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL || "";

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    email: "",
    objetivo: "",
    horario: "",
    lgpdConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (
      !/^\d{10,11}$/.test(
        formData.whatsapp.replace(/\D/g, "")
      )
    ) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    if (!formData.objetivo) {
      newErrors.objetivo = "Selecione seu objetivo";
    }

    if (!formData.horario) {
      newErrors.horario = "Selecione o melhor horário";
    }

    if (!formData.lgpdConsent) {
      newErrors.lgpdConsent =
        "Você precisa concordar para continuar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (WEBHOOK_URL) {
        const whatsappNumbers = formData.whatsapp.replace(
          /\D/g,
          ""
        );

        const payload = {
          nome: formData.nome,
          whatsapp: whatsappNumbers,
          email: formData.email || null,
          objetivo: formData.objetivo,
          horario: formData.horario,
          lgpdConsent: formData.lgpdConsent,
          timestamp: new Date().toISOString(),
        };

        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar dados");
        }
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setIsSubmitting(false);
      setSubmitError(
        "Erro ao processar sua inscrição. Por favor, tente novamente."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const handleWhatsAppChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData((prev) => ({
      ...prev,
      whatsapp: formatted,
    }));
    if (errors.whatsapp) {
      setErrors((prev) => ({
        ...prev,
        whatsapp: undefined,
      }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.href = WHATSAPP_LINK;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-medium text-card-foreground">
              INSCRIÇÃO CONFIRMADA!
            </h3>
            <p className="text-muted-foreground">
              Você será redirecionado para o grupo em
              instantes...
            </p>
          </div>
          <Button asChild size="lg" className="w-full">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrar no grupo agora
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-lg">
      <h3 className="text-xl md:text-2xl font-medium text-card-foreground mb-6 text-center">
        GARANTA SEU ACESSO NO GRUPO VIP
      </h3>

      {submitError && (
        <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            name="nome"
            placeholder="Nome completo *"
            value={formData.nome}
            onChange={handleChange}
            aria-invalid={!!errors.nome}
          />
          {errors.nome && (
            <p className="text-sm text-destructive">
              {errors.nome}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp (11) 99999-9999 *"
            value={formData.whatsapp}
            onChange={handleWhatsAppChange}
            aria-invalid={!!errors.whatsapp}
          />
          {errors.whatsapp && (
            <p className="text-sm text-destructive">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            placeholder="E-mail (opcional)"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Select
            value={formData.objetivo}
            onValueChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                objetivo: value,
              }));
              if (errors.objetivo) {
                setErrors((prev) => ({
                  ...prev,
                  objetivo: undefined,
                }));
              }
            }}
          >
            <SelectTrigger
              className="w-full"
              aria-invalid={!!errors.objetivo}
            >
              <SelectValue placeholder="Qual seu objetivo? *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emagrecer">
                Emagrecer
              </SelectItem>
              <SelectItem value="hipertrofia">
                Hipertrofia
              </SelectItem>
              <SelectItem value="condicionamento">
                Condicionamento
              </SelectItem>
              <SelectItem value="reabilitacao">
                Reabilitação
              </SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
          {errors.objetivo && (
            <p className="text-sm text-destructive">
              {errors.objetivo}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Select
            value={formData.horario}
            onValueChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                horario: value,
              }));
              if (errors.horario) {
                setErrors((prev) => ({
                  ...prev,
                  horario: undefined,
                }));
              }
            }}
          >
            <SelectTrigger
              className="w-full"
              aria-invalid={!!errors.horario}
            >
              <SelectValue placeholder="Melhor horário pra contato? *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manha">Manhã</SelectItem>
              <SelectItem value="tarde">Tarde</SelectItem>
              <SelectItem value="noite">Noite</SelectItem>
            </SelectContent>
          </Select>
          {errors.horario && (
            <p className="text-sm text-destructive">
              {errors.horario}
            </p>
          )}
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="lgpdConsent"
              checked={formData.lgpdConsent}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({
                  ...prev,
                  lgpdConsent: checked === true,
                }));
                if (errors.lgpdConsent) {
                  setErrors((prev) => ({
                    ...prev,
                    lgpdConsent: undefined,
                  }));
                }
              }}
              aria-invalid={!!errors.lgpdConsent}
              className="mt-0.5"
            />
            <Label
              htmlFor="lgpdConsent"
              className="text-sm text-card-foreground leading-tight cursor-pointer"
            >
              Concordo em receber contato e comunicações da
              Time Fit.
            </Label>
          </div>
          {errors.lgpdConsent && (
            <p className="text-sm text-destructive">
              {errors.lgpdConsent}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Quero entrar no grupo
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Ao enviar, você será direcionado automaticamente
          para o grupo de WhatsApp.
        </p>
      </form>
    </div>
  );
}
