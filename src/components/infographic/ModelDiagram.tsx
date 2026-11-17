"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ModelId } from "@/data/deployment-models";

const INK = "#0b1226";
const TEXT = "#cfd8ff";

function Packet({
  path,
  color,
  dur = 2.4,
  begin = 0,
  show,
}: {
  path: string;
  color: string;
  dur?: number;
  begin?: number;
  show: boolean;
}) {
  if (!show) return null;
  return (
    <g>
      <circle r="9" fill={color} opacity="0.25">
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="4.5" fill={color}>
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      </circle>
    </g>
  );
}

function Rack({
  x,
  y,
  w = 56,
  h = 130,
  color,
  delay = 0,
  blink,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  color: string;
  delay?: number;
  blink: boolean;
}) {
  const slots = Math.floor((h - 16) / 24);
  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <rect x={x} y={y} width={w} height={h} rx={9} fill={INK} stroke={color} strokeWidth={2} />
      {Array.from({ length: slots }).map((_, i) => (
        <g key={i}>
          <rect x={x + 8} y={y + 10 + i * 24} width={w - 16} height={15} rx={3} fill={color} opacity={0.18} />
          <motion.circle
            cx={x + w - 15}
            cy={y + 17.5 + i * 24}
            r={2.6}
            fill={color}
            animate={blink ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={{ duration: 1.6, delay: i * 0.3, repeat: Infinity }}
          />
        </g>
      ))}
    </motion.g>
  );
}

function Label({
  x,
  y,
  children,
  size = 15,
  weight = 600,
  fill = TEXT,
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  weight?: number;
  fill?: string;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={fill} fontSize={size} fontWeight={weight}>
      {children}
    </text>
  );
}

function PublicDiagram({ color, motionOn }: { color: string; motionOn: boolean }) {
  const orgs = [
    { c: "#38bdf8", label: "Empresa A", y: 40 },
    { c: "#f472b6", label: "Startup B", y: 115 },
    { c: "#fbbf24", label: "Usuario C", y: 190 },
  ];
  const sliceY = [70, 140, 210];
  return (
    <>
      <motion.rect
        x={290}
        y={20}
        width={210}
        height={260}
        rx={22}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "395px 150px" }}
      />
      <Label x={395} y={50} fill={color} size={14} weight={700}>
        NUBE PÚBLICA
      </Label>
      {orgs.map((o, i) => {
        const oc = o.y + 30;
        const sc = sliceY[i] + 28;
        const path = `M130 ${oc} C 210 ${oc}, 230 ${sc}, 310 ${sc}`;
        return (
          <g key={o.label}>
            <motion.g
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
            >
              <rect x={20} y={o.y} width={110} height={60} rx={12} fill={INK} stroke={o.c} strokeWidth={2} />
              <Label x={75} y={o.y + 36} size={14}>
                {o.label}
              </Label>
            </motion.g>
            <path d={path} stroke={o.c} strokeWidth={2} strokeDasharray="5 6" opacity={0.55} fill="none" />
            <motion.g
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <rect x={310} y={sliceY[i]} width={170} height={56} rx={11} fill={o.c} fillOpacity={0.14} stroke={o.c} strokeWidth={2} />
              <Label x={395} y={sc + 5} size={14}>
                {`Recursos de ${o.label.split(" ")[1]}`}
              </Label>
            </motion.g>
            <Packet path={path} color={o.c} begin={i * 0.7} show={motionOn} />
          </g>
        );
      })}
    </>
  );
}

function PrivateDiagram({ color, motionOn }: { color: string; motionOn: boolean }) {
  const bus = "M120 150 L 480 150";
  return (
    <>
      <motion.g initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
        <rect x={20} y={105} width={100} height={90} rx={14} fill={INK} stroke={color} strokeWidth={2} />
        <Label x={70} y={145} size={14}>
          Tu
        </Label>
        <Label x={70} y={165} size={14}>
          organización
        </Label>
      </motion.g>
      <motion.rect
        x={170}
        y={20}
        width={330}
        height={260}
        rx={22}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="9 6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "335px 150px" }}
      />
      <Label x={335} y={48} fill={color} size={14} weight={700}>
        CENTRO DE DATOS DEDICADO
      </Label>
      <path d={bus} stroke={color} strokeWidth={2} strokeDasharray="5 6" opacity={0.55} fill="none" />
      {[200, 272, 344, 416].map((x, i) => (
        <Rack key={x} x={x} y={72} h={160} color={color} delay={0.15 + i * 0.1} blink={motionOn} />
      ))}
      <Packet path={bus} color={color} dur={3} show={motionOn} />
      <Packet path={bus} color={color} dur={3} begin={1.5} show={motionOn} />
      {/* candado en la entrada */}
      <circle cx={170} cy={150} r={19} fill={INK} stroke={color} strokeWidth={2} />
      <rect x={162} y={149} width={16} height={12} rx={2.5} fill={color} />
      <path d="M165 149 v-4 a5 5 0 0 1 10 0 v4" stroke={color} strokeWidth={2} fill="none" />
      <Label x={335} y={262} size={14} fill={color}>
        Un solo inquilino
      </Label>
    </>
  );
}

function HybridDiagram({ color, motionOn }: { color: string; motionOn: boolean }) {
  const violet = "#a78bfa";
  const sky = "#38bdf8";
  const fwd = "M210 140 L310 140";
  const back = "M310 160 L210 160";
  return (
    <>
      <motion.rect
        x={10}
        y={20}
        width={200}
        height={260}
        rx={22}
        fill={violet}
        fillOpacity={0.08}
        stroke={violet}
        strokeWidth={2}
        strokeDasharray="9 6"
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
      />
      <Label x={110} y={48} fill={violet} size={14} weight={700}>
        PRIVADA
      </Label>
      <Rack x={40} y={70} h={150} color={violet} delay={0.15} blink={motionOn} />
      <Rack x={114} y={70} h={150} color={violet} delay={0.25} blink={motionOn} />
      <Label x={110} y={256} size={14} fill={violet}>
        Datos sensibles
      </Label>

      <motion.rect
        x={310}
        y={20}
        width={200}
        height={260}
        rx={22}
        fill={sky}
        fillOpacity={0.08}
        stroke={sky}
        strokeWidth={2}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
      />
      <Label x={410} y={48} fill={sky} size={14} weight={700}>
        PÚBLICA
      </Label>
      {[70, 140].map((y, i) => (
        <motion.g key={y} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}>
          <rect x={330} y={y} width={160} height={56} rx={11} fill={sky} fillOpacity={0.14} stroke={sky} strokeWidth={2} />
          <Label x={410} y={y + 33} size={14}>
            {i === 0 ? "Servicios elásticos" : "Respaldo y picos"}
          </Label>
        </motion.g>
      ))}
      <Label x={410} y={256} size={14} fill={sky}>
        Capacidad bajo demanda
      </Label>

      <path d={fwd} stroke={color} strokeWidth={2} strokeDasharray="5 5" opacity={0.7} fill="none" />
      <path d={back} stroke={color} strokeWidth={2} strokeDasharray="5 5" opacity={0.7} fill="none" />
      <Packet path={fwd} color={violet} dur={1.8} show={motionOn} />
      <Packet path={fwd} color={violet} dur={1.8} begin={0.9} show={motionOn} />
      <Packet path={back} color={sky} dur={1.8} begin={0.45} show={motionOn} />
      <Packet path={back} color={sky} dur={1.8} begin={1.35} show={motionOn} />
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.5 }}
        style={{ transformOrigin: "260px 150px" }}
      >
        <circle cx={260} cy={150} r={20} fill={INK} stroke={color} strokeWidth={2.5} />
        <text x={260} y={157} textAnchor="middle" fill={color} fontSize={22} fontWeight={700}>
          ⇄
        </text>
      </motion.g>
      <Label x={260} y={196} size={13} fill={color}>
        VPN / enlace
      </Label>
    </>
  );
}

export default function ModelDiagram({ id, color }: { id: ModelId; color: string }) {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const caption: Record<ModelId, string> = {
    public: "Varios clientes comparten la infraestructura del proveedor a través de Internet.",
    private: "Una sola organización usa una infraestructura dedicada y aislada.",
    hybrid: "Un entorno privado y uno público conectados: los datos y las cargas viajan entre ambos.",
  };
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 520 300"
        role="img"
        aria-label={caption[id]}
        className="h-auto w-full"
      >
        {id === "public" && <PublicDiagram color={color} motionOn={motionOn} />}
        {id === "private" && <PrivateDiagram color={color} motionOn={motionOn} />}
        {id === "hybrid" && <HybridDiagram color={color} motionOn={motionOn} />}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted">{caption[id]}</figcaption>
    </figure>
  );
}
