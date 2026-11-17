import type { Metadata } from "next";
import DeploymentInfographic from "@/components/infographic/DeploymentInfographic";

export const metadata: Metadata = {
  title: "Modelos de despliegue de la nube · Cloud Computing SENA",
  description:
    "Infografía interactiva sobre las nubes pública, privada e híbrida: características, ventajas, desventajas y comparación.",
};

export default function ModelosDespliegue() {
  return <DeploymentInfographic />;
}
