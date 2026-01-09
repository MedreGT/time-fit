"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import LeadForm from "./_components/LeadForm";

export default function Home() {
  return (
    <section className="min-h-screen stronix-gradient-bg stronix-diagonal-accent relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 min-h-[90vh] flex flex-col">
        <header className="w-full py-4 md:py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Image
              src="/logo-stronix.png"
              alt="Stronix Academia"
              width={200}
              height={100}
            />
          </div>
        </header>

        <main className="flex-1 flex items-center py-6 md:py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="space-y-5 animate-slide-right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-foreground uppercase tracking-wide">
                    NOVA UNIDADE • STRONIX ACADEMIA
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-balance text-foreground font-medium">
                    UMA ACADEMIA TOTALMENTE RENOVADA,
                    PROJETADA PARA MELHORAR OS RESULTADOS
                    DOS NOSSOS ALUNOS
                  </h1>
                  <p className="text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
                    A Stronix nasce como a evolução da Time
                    Fit, trazendo uma estrutura mais mais
                    completa, novos espaços de treino e o
                    mesmo padrão na qualidade do
                    atendimento.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foreground/80">
                      Avaliação no Google
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:justify-self-end w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
                <LeadForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
