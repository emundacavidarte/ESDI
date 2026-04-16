import { useState } from "react";
import { Search, Download, Filter, ChevronRight, ChevronLeft, MoreHorizontal, AlertTriangle, XCircle, CheckCircle2, Clock, Info, User, Calendar, MapPin, Home, Shield, Hospital, ChevronDown, Activity, Syringe, ClipboardCheck, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

// Mock Data with ESDI Range Logic
const TODAY = new Date("2026-04-14");

const MOCK_DATA = [
  { 
    id: "1", servicio: "SAF", distrito: "SANAGORAN", usuarioDni: "94069838", nombre: "BRAYAN ALEXIS ARENAS ANTICONA", edad: "16 Meses", ingreso: "03/03/2025", unidadTerritorial: "LA LIBERTAD", ciai: "-", seguroSalud: "SUBSIDIADO (SIS GRATUITO)", establecimiento: "SANAGORAN", esdiMin: "2026-04-01", esdiMax: "2026-04-30", esdiCompletado: false, 
    socioemocional: "Esperado", cognitiva: "Proceso", comunicativa: "Esperado", motora: "Destacado", adaptativa: "Esperado",
    socioemocional_interaccion: 45, 
    cognitiva_simbolica: 30, 
    cognitiva_resolucion: 48, 
    comunicativa_verbal: 55, 
    motora_gruesa: 75, 
    motora_fina: 58, 
    adaptativa_autonomia: 52, 
    nivelLogro: "Proceso" 
  },
  { 
    id: "2", servicio: "SCD", distrito: "TAMBO", usuarioDni: "94084613", nombre: "MARIA FERNANDA LOPEZ RUIZ", edad: "24 Meses", ingreso: "15/01/2025", unidadTerritorial: "CUSCO", ciai: "TAMBO AZUL", seguroSalud: "ESSALUD", establecimiento: "TAMBO", esdiMin: "2026-03-01", esdiMax: "2026-03-31", esdiCompletado: false, 
    socioemocional: "Proceso", cognitiva: "Proceso", comunicativa: "Proceso", motora: "Esperado", adaptativa: "Proceso",
    socioemocional_interaccion: 25, 
    cognitiva_simbolica: 35, 
    cognitiva_resolucion: 40, 
    comunicativa_verbal: 42, 
    motora_gruesa: 55, 
    motora_fina: 45, 
    adaptativa_autonomia: 38, 
    nivelLogro: "Proceso" 
  },
  { 
    id: "3", servicio: "SAF", distrito: "HUANOQUITE", usuarioDni: "94298646", nombre: "JUAN PABLO DIAZ TORRES", edad: "12 Meses", ingreso: "10/02/2025", unidadTerritorial: "CUSCO", ciai: "-", seguroSalud: "SUBSIDIADO (SIS GRATUITO)", establecimiento: "HUANOQUITE", esdiMin: "2026-05-01", esdiMax: "2026-05-31", esdiCompletado: false, 
    socioemocional: "Esperado", cognitiva: "Esperado", comunicativa: "Destacado", motora: "Esperado", adaptativa: "Esperado",
    socioemocional_interaccion: 55, 
    cognitiva_simbolica: 58, 
    cognitiva_resolucion: 52, 
    comunicativa_verbal: 75, 
    motora_gruesa: 62, 
    motora_fina: 65, 
    adaptativa_autonomia: 58, 
    nivelLogro: "Esperado" 
  },
  { 
    id: "4", servicio: "SCD", distrito: "PUQUIO", usuarioDni: "93886477", nombre: "ANA SOFIA RAMOS", edad: "36 Meses", ingreso: "01/12/2024", unidadTerritorial: "AYACUCHO", ciai: "PUQUIO CENTRO", seguroSalud: "SUBSIDIADO", establecimiento: "PUQUIO", esdiMin: "2025-12-01", esdiMax: "2025-12-31", esdiCompletado: true, 
    socioemocional: "Destacado", cognitiva: "Destacado", comunicativa: "Destacado", motora: "Destacado", adaptativa: "Destacado",
    socioemocional_interaccion: 85, 
    cognitiva_simbolica: 90, 
    cognitiva_resolucion: 88, 
    comunicativa_verbal: 95, 
    motora_gruesa: 80, 
    motora_fina: 82, 
    adaptativa_autonomia: 90, 
    nivelLogro: "Destacado" 
  },
  { 
    id: "5", servicio: "SAF", distrito: "SINGA", usuarioDni: "94286104", nombre: "CARLOS ANDRES MEZA", edad: "18 Meses", ingreso: "20/02/2025", unidadTerritorial: "HUANUCO", ciai: "-", seguroSalud: "SUBSIDIADO", establecimiento: "SINGA", esdiMin: "2026-04-10", esdiMax: "2026-04-20", esdiCompletado: false, 
    socioemocional: "Proceso", cognitiva: "Proceso", comunicativa: "Esperado", motora: "Proceso", adaptativa: "Proceso",
    socioemocional_interaccion: 40, 
    cognitiva_simbolica: 45, 
    cognitiva_resolucion: 42, 
    comunicativa_verbal: 55, 
    motora_gruesa: 48, 
    motora_fina: 40, 
    adaptativa_autonomia: 45, 
    nivelLogro: "Proceso" 
  },
  { 
    id: "6", servicio: "SAF", distrito: "RIPAN", usuarioDni: "93972837", nombre: "LUCIA VALENTINA PAREDES", edad: "9 Meses", ingreso: "05/01/2025", unidadTerritorial: "HUANUCO", ciai: "-", seguroSalud: "SUBSIDIADO", establecimiento: "RIPAN", esdiMin: "2026-02-01", esdiMax: "2026-02-28", esdiCompletado: false, 
    socioemocional: "Esperado", cognitiva: "Esperado", comunicativa: "Esperado", motora: "Esperado", adaptativa: "Esperado",
    socioemocional_interaccion: 55, 
    cognitiva_simbolica: 52, 
    cognitiva_resolucion: 58, 
    comunicativa_verbal: 50, 
    motora_gruesa: 60, 
    motora_fina: 55, 
    adaptativa_autonomia: 52, 
    nivelLogro: "Esperado" 
  },
  { 
    id: "7", servicio: "SAF", distrito: "YAUYA", usuarioDni: "94085072", nombre: "MIGUEL ANGEL CASTRO", edad: "6 Meses", ingreso: "12/03/2025", unidadTerritorial: "ANCASH", ciai: "-", seguroSalud: "SUBSIDIADO", establecimiento: "YAUYA", esdiMin: "2026-04-15", esdiMax: "2026-05-15", esdiCompletado: false, 
    socioemocional: "Proceso", cognitiva: "Esperado", comunicativa: "Proceso", motora: "Proceso", adaptativa: "Proceso",
    socioemocional_interaccion: 45, 
    cognitiva_simbolica: 55, 
    cognitiva_resolucion: 48, 
    comunicativa_verbal: 40, 
    motora_gruesa: 42, 
    motora_fina: 45, 
    adaptativa_autonomia: 40, 
    nivelLogro: "Proceso" 
  },
  { 
    id: "8", servicio: "SAF", distrito: "HUARMACA", usuarioDni: "94295134", nombre: "ELENA BEATRIZ SOLIS", edad: "4 Meses", ingreso: "01/04/2025", unidadTerritorial: "PIURA", ciai: "-", seguroSalud: "SUBSIDIADO", establecimiento: "HUARMACA", esdiMin: "2026-04-01", esdiMax: "2026-04-14", esdiCompletado: false, 
    socioemocional: "Esperado", cognitiva: "Esperado", comunicativa: "Esperado", motora: "Esperado", adaptativa: "Esperado",
    socioemocional_interaccion: 58, 
    cognitiva_simbolica: 55, 
    cognitiva_resolucion: 52, 
    comunicativa_verbal: 50, 
    motora_gruesa: 55, 
    motora_fina: 58, 
    adaptativa_autonomia: 55, 
    nivelLogro: "Esperado" 
  },
  { 
    id: "9", servicio: "SCD", distrito: "SAN MIGUEL", usuarioDni: "94083537", nombre: "JOSE LUIS VARGAS", edad: "28 Meses", ingreso: "15/10/2024", unidadTerritorial: "LIMA", ciai: "SAN MIGUEL", seguroSalud: "ESSALUD", establecimiento: "SAN MIGUEL", esdiMin: "2025-11-01", esdiMax: "2025-11-30", esdiCompletado: true, 
    socioemocional: "Proceso", cognitiva: "Proceso", comunicativa: "Proceso", motora: "Proceso", adaptativa: "Proceso",
    socioemocional_interaccion: 35, 
    cognitiva_simbolica: 40, 
    cognitiva_resolucion: 38, 
    comunicativa_verbal: 45, 
    motora_gruesa: 42, 
    motora_fina: 35, 
    adaptativa_autonomia: 40, 
    nivelLogro: "Proceso" 
  },
  { 
    id: "10", servicio: "SAF", distrito: "OROPESA", usuarioDni: "94051701", nombre: "VALERIA SOFIA NUÑEZ", edad: "32 Meses", ingreso: "20/01/2025", unidadTerritorial: "APURIMAC", ciai: "-", seguroSalud: "SUBSIDIADO", establecimiento: "OROPESA", esdiMin: "2026-03-15", esdiMax: "2026-04-15", esdiCompletado: false, 
    socioemocional: "Destacado", cognitiva: "Destacado", comunicativa: "Esperado", motora: "Destacado", adaptativa: "Destacado",
    socioemocional_interaccion: 80, 
    cognitiva_simbolica: 85, 
    cognitiva_resolucion: 82, 
    comunicativa_verbal: 55, 
    motora_gruesa: 88, 
    motora_fina: 85, 
    adaptativa_autonomia: 80, 
    nivelLogro: "Destacado" 
  },
];

const getEsdiStatus = (min: string, max: string, completed: boolean) => {
  if (completed) return { label: "Completado", color: "text-green-600", icon: CheckCircle2, bg: "bg-green-50" };
  const minDate = new Date(min);
  const maxDate = new Date(max);
  
  if (TODAY > maxDate) return { label: "Vencido - Pendiente", color: "text-red-600", icon: XCircle, bg: "bg-red-50" };
  if (TODAY >= minDate && TODAY <= maxDate) return { label: "En Rango - Pendiente", color: "text-orange-500", icon: AlertTriangle, bg: "bg-orange-50" };
  return { label: "Próximamente", color: "text-blue-500", icon: Clock, bg: "bg-blue-50" };
};

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function App() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getLogroValue = (logro: string) => {
    switch (logro) {
      case "Destacado": return 4;
      case "Esperado": return 3;
      case "Proceso": return 2;
      case "Inicio": return 1;
      default: return 0;
    }
  };

  const getConvertedScore = (logro: string) => {
    switch (logro) {
      case "Destacado": return 100;
      case "Esperado": return 75;
      case "Proceso": return 50;
      case "Inicio": return 25;
      default: return 0;
    }
  };

  const getBaremoLevel = (score: number) => {
    if (score > 60) return "Destacado";
    if (score >= 50) return "Esperado";
    return "Proceso";
  };

  const getBaremoColor = (score: number) => {
    const level = getBaremoLevel(score);
    switch (level) {
      case "Destacado": return "#3B82F6"; // Azul
      case "Esperado": return "#22C55E"; // Verde
      case "Proceso": return "#FBBF24"; // Amarillo
      default: return "#94A3B8";
    }
  };

  const chartData = selectedUser ? [
    { name: 'Interacción', value: selectedUser.socioemocional_interaccion, full: 100 },
    { name: 'F. Simbólica', value: selectedUser.cognitiva_simbolica, full: 100 },
    { name: 'Resolución P.', value: selectedUser.cognitiva_resolucion, full: 100 },
    { name: 'Comunicación', value: selectedUser.comunicativa_verbal, full: 100 },
    { name: 'Motora Gruesa', value: selectedUser.motora_gruesa, full: 100 },
    { name: 'Motora Fina', value: selectedUser.motora_fina, full: 100 },
    { name: 'Autonomía', value: selectedUser.adaptativa_autonomia, full: 100 },
  ] : [];

  const groupedData = selectedUser ? [
    { dimension: 'Socioemocional', items: [chartData[0]] },
    { dimension: 'Cognitiva', items: [chartData[1], chartData[2]] },
    { dimension: 'Comunicativa', items: [chartData[3]] },
    { dimension: 'Motora', items: [chartData[4], chartData[5]] },
    { dimension: 'Adaptativa', items: [chartData[6]] },
  ] : [];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F0F4F8] font-sans text-[#333]">
      {/* Header */}
      <header id="main-header" className="bg-[#0099FF] text-white p-4 shadow-md">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Cuidador360</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium opacity-90">Bienvenido, Usuario</span>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">U</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Main Content Area */}
        <div className="space-y-6">
          <Card id="filter-card" className="p-4 border-none shadow-sm bg-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 id="module-title" className="text-xl font-bold text-[#0099FF]">
                Modulo: <span className="text-[#FFD700]">ESDI - Desarrollo Infantil</span>
              </h2>
              <Button id="download-btn" className="bg-[#BADA55] hover:bg-[#A9C944] text-[#333] font-bold rounded-lg px-6 h-9 text-sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>

            {/* Filters Grid */}
            <div id="filters-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-6 w-full">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">Servicio</label>
                <Select defaultValue="Todos">
                  <SelectTrigger id="select-servicio" className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Saf">SAF</SelectItem>
                    <SelectItem value="Scd">SCD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">Departamento</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione Departame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lima">Lima</SelectItem>
                    <SelectItem value="Cusco">Cusco</SelectItem>
                    <SelectItem value="Arequipa">Arequipa</SelectItem>
                    <SelectItem value="La-libertad">La Libertad</SelectItem>
                    <SelectItem value="Puno">Puno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">UT/OCT</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione UT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ut-lima">UT Lima Metropolitana</SelectItem>
                    <SelectItem value="Ut-cusco">UT Cusco</SelectItem>
                    <SelectItem value="Ut-arequipa">UT Arequipa</SelectItem>
                    <SelectItem value="Ut-trujillo">UT Trujillo</SelectItem>
                    <SelectItem value="Ut-puno">UT Puno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">Provincia</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione Provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lima">Lima</SelectItem>
                    <SelectItem value="Cusco">Cusco</SelectItem>
                    <SelectItem value="Arequipa">Arequipa</SelectItem>
                    <SelectItem value="Trujillo">Trujillo</SelectItem>
                    <SelectItem value="Puno">Puno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">Distrito</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione Distrito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Miraflores">Miraflores</SelectItem>
                    <SelectItem value="San-borja">San Borja</SelectItem>
                    <SelectItem value="Cusco">Cusco</SelectItem>
                    <SelectItem value="Yanahuara">Yanahuara</SelectItem>
                    <SelectItem value="Victor-larco">Victor Larco Herrera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">C de Gestión</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione Comité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comite-01">Comité 01</SelectItem>
                    <SelectItem value="Comite-02">Comité 02</SelectItem>
                    <SelectItem value="Comite-03">Comité 03</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">C de Poblado</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione Centro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Centro-a">Centro Poblado A</SelectItem>
                    <SelectItem value="Centro-b">Centro Poblado B</SelectItem>
                    <SelectItem value="Centro-c">Centro Poblado C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block px-1">CIAI</label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-200 text-[11px] h-9 px-3 rounded-xl focus:ring-blue-500 shadow-none w-full">
                    <SelectValue placeholder="Seleccione CIAI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ciai-1">CIAI Los Angelitos</SelectItem>
                    <SelectItem value="ciai-2">CIAI Rayito de Sol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <Button className="bg-[#0099FF] text-white hover:bg-[#0088EE] rounded-full px-8 h-9 font-bold text-xs shadow-md transition-all hover:shadow-lg">
                Filtros avanzados
              </Button>
              <div className="flex items-center gap-2 flex-1 justify-end max-w-4xl">
                <Input placeholder="Buscar DNI..." className="rounded-xl border-gray-200 h-9 text-xs px-4 focus-visible:ring-blue-500 w-full max-w-md shadow-sm" />
                <Button className="bg-[#0099FF] hover:bg-[#0088EE] rounded-full px-8 h-9 font-bold text-xs shadow-md transition-all hover:shadow-lg">
                  <Search className="w-4 h-4 mr-2 stroke-[3px]" />
                  Buscar
                </Button>
                <button className="text-slate-500 hover:text-[#0099FF] font-bold text-xs px-4 transition-colors">
                  Limpiar
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-4 text-sm font-medium text-gray-600">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span>Completados (02)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Pendientes (06)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span>Vencidos (02)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FFC1C1] rounded"></div>
                  <span>Logro en proceso (05)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FFF4C1] rounded"></div>
                  <span>Logro esperado (03)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#C1FFC1] rounded"></div>
                  <span>Logro Destacado (02)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Table Card */}
          <Card id="results-table-container" className="overflow-hidden border-none shadow-sm bg-white rounded-xl">
            <Table>
              <TableHeader className="bg-[#0099FF] hover:bg-[#0099FF]">
                <TableRow className="hover:bg-transparent border-b border-white/20">
                  <TableHead colSpan={5} className="h-10"></TableHead>
                  <TableHead colSpan={5} className="text-white font-bold text-center h-10 border-x border-white/20">
                    Dimensión
                  </TableHead>
                </TableRow>
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-white font-bold h-12">Servicio</TableHead>
                  <TableHead className="text-white font-bold h-12">
                    <div className="flex items-center gap-1">
                      Localización del servicio <ChevronRight className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white font-bold h-12">
                    <div className="flex items-center gap-1">
                      Usuario <ChevronRight className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white font-bold h-12">ESDI Máx.</TableHead>
                  <TableHead className="text-white font-bold h-12">Estado ESDI</TableHead>
                  <TableHead className="text-white font-bold h-12">Socioemocional</TableHead>
                  <TableHead className="text-white font-bold h-12">Cognitiva</TableHead>
                  <TableHead className="text-white font-bold h-12">Comunicativa</TableHead>
                  <TableHead className="text-white font-bold h-12">Motora</TableHead>
                  <TableHead className="text-white font-bold h-12">Adaptativa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_DATA.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-b border-gray-100 hover:opacity-90 transition-opacity ${
                      row.nivelLogro === "Proceso" ? "bg-[#FFC1C1]" : 
                      row.nivelLogro === "Esperado" ? "bg-[#FFF4C1]" : 
                      row.nivelLogro === "Destacado" ? "bg-[#C1FFC1]" : "bg-white"
                    }`}
                  >
                    <TableCell className="font-medium">{row.servicio}</TableCell>
                    <TableCell>{row.distrito}</TableCell>
                    <TableCell 
                      className="text-blue-600 font-bold underline cursor-pointer"
                      onClick={() => handleUserClick(row)}
                    >
                      {row.usuarioDni}
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help border-b border-dotted border-gray-400 font-bold text-gray-700">
                            {formatDate(row.esdiMax)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-gray-800 border border-gray-200 shadow-lg">
                          <p className="text-xs font-medium">Fecha Mínima: <span className="text-blue-600">{formatDate(row.esdiMin)}</span></p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const status = getEsdiStatus(row.esdiMin, row.esdiMax, row.esdiCompletado);
                        const Icon = status.icon;
                        return (
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full w-fit ${status.bg} ${status.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-tight">{status.label}</span>
                          </div>
                        );
                      })()}
                    </TableCell>
                    <TableCell>{row.socioemocional}</TableCell>
                    <TableCell>{row.cognitiva}</TableCell>
                    <TableCell>{row.comunicativa}</TableCell>
                    <TableCell>{row.motora}</TableCell>
                    <TableCell>{row.adaptativa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="p-4 flex items-center justify-between bg-white border-t border-gray-100">
              <span className="text-sm text-gray-500">Total de resultados: 333833</span>
              <Pagination className="justify-end w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="border-gray-200" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="bg-[#0099FF] text-white border-none">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="border-gray-200">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="border-gray-200">33384</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="border-gray-200" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </div>
      </main>

      {/* User Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full lg:max-w-6xl h-[90vh] p-0 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xl flex flex-col">
          <DialogHeader className="p-4 lg:p-6 bg-[#0099FF] text-white flex-row items-center justify-between shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hidden sm:flex">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg lg:text-xl font-bold">Expediente Digital del Usuario</DialogTitle>
                <p className="text-[10px] lg:text-xs text-white/80 font-medium">Información detallada y seguimiento integral del desarrollo infantil</p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] flex-1 overflow-y-auto custom-scrollbar">
            {/* Left Column: Información General */}
            <div className="bg-[#F8FAFC] p-4 lg:p-6 border-r border-gray-100 space-y-5">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Usuario Seleccionado</p>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2.5">{selectedUser?.nombre}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600 border-none text-[9px] font-bold px-2 py-0">
                      {selectedUser?.servicio}
                    </Badge>
                    <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-none text-[9px] font-bold px-2 py-0">
                      {selectedUser?.distrito}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Información General
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { label: "DNI", value: selectedUser?.usuarioDni, icon: Shield, color: "text-blue-500" },
                    { label: "Edad", value: selectedUser?.edad, icon: Clock, color: "text-green-500" },
                    { label: "Fecha Ingreso", value: selectedUser?.ingreso, icon: Calendar, color: "text-purple-500" },
                    { label: "UT / OCT", value: selectedUser?.unidadTerritorial, icon: MapPin, color: "text-red-500" },
                    { label: "CIAI", value: selectedUser?.ciai, icon: Home, color: "text-indigo-500" },
                    { label: "Seguro Salud", value: selectedUser?.seguroSalud, icon: Activity, color: "text-emerald-500" },
                    { label: "Establecimiento", value: selectedUser?.establecimiento, icon: Hospital, color: "text-rose-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-default">
                      <div className="flex items-center gap-2 mb-0.5">
                        <item.icon className={`w-3 h-3 ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</span>
                      </div>
                      <p className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900">{item.value || "No registrado"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Perfil de Desarrollo & Recomendaciones */}
            <div className="p-6 lg:p-10 space-y-10 bg-white">
              {/* Perfil de Desarrollo (Radar Chart) */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#0099FF]" />
                    </div>
                    ESDI de Ingreso
                  </h4>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-bold">02/10/2025</Badge>
                </div>
                
                <div className="h-[350px] w-full bg-[#F8FAFC] rounded-3xl p-6 border border-gray-100 shadow-inner">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e2e8f0" />
                      <XAxis 
                        type="number"
                        domain={[0, 100]} 
                        ticks={[0, 25, 50, 60, 75, 100]} 
                        tick={{ fill: '#64748b', fontSize: 10 }} 
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category"
                        tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }}
                        width={80}
                      />
                      <RechartsTooltip 
                        cursor={{ fill: 'rgba(0, 153, 255, 0.05)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const level = getBaremoLevel(data.value);
                            return (
                              <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                                <p className="text-xs font-black text-gray-900 mb-1 uppercase">{data.name}</p>
                                <p className="text-[11px] font-bold" style={{ color: getBaremoColor(data.value) }}>
                                  Logro: {level}
                                </p>
                                <p className="text-[10px] text-gray-500">Puntaje Convertido: {data.value}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine x={50} stroke="#FBBF24" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'Esperado (50)', fill: '#FBBF24', fontSize: 10, fontWeight: 'bold' }} />
                      <ReferenceLine x={60} stroke="#3B82F6" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'Destacado (60)', fill: '#3B82F6', fontSize: 10, fontWeight: 'bold' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBaremoColor(entry.value)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {groupedData.map((group) => (
                    <div key={group.dimension} className="bg-gray-50/50 rounded-2xl p-2.5 border border-gray-100 flex flex-col gap-2.5">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{group.dimension}</h5>
                      <div className="flex flex-col gap-2 h-full">
                        {group.items.map((item: any) => (
                          <div key={item.name} className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-all flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <p className="text-[8px] font-black text-gray-900 uppercase tracking-wider text-center leading-tight">{item.name}</p>
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: getBaremoColor(item.value) }}></div>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex justify-between items-center text-[9px]">
                                <span className="text-gray-400 font-medium">Logro:</span>
                                <span className="font-bold text-gray-700 truncate ml-1">{getBaremoLevel(item.value)}</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px]">
                                <span className="text-gray-400 font-medium">Puntaje:</span>
                                <span className="font-bold text-blue-600">{item.value}%</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px]">
                                <span className="text-gray-400 font-medium">Baremo:</span>
                                <span className="font-bold text-purple-600">
                                  {item.value > 60 ? '>60' : item.value >= 50 ? '50-60' : '<50'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recomendaciones Section */}
              <section className="space-y-6">
                <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                  </div>
                  Recomendaciones
                </h4>
                
                <div className="space-y-4">
                  {[
                    { 
                      title: "Estimulación Temprana", 
                      desc: "Reforzar actividades de motora fina y lenguaje mediante juegos interactivos.",
                      icon: Star,
                      color: "text-amber-500",
                      bg: "bg-amber-50"
                    },
                    { 
                      title: "Seguimiento de Salud", 
                      desc: "Programar próximo control CRED y tamizaje de hemoglobina para el siguiente mes.",
                      icon: ClipboardCheck,
                      color: "text-blue-500",
                      bg: "bg-blue-50"
                    },
                    { 
                      title: "Alimentación", 
                      desc: "Continuar con dieta balanceada rica en hierro y proteínas según edad.",
                      icon: Activity,
                      color: "text-green-500",
                      bg: "bg-green-50"
                    }
                  ].map((rec, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 ${rec.bg} ${rec.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <rec.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm mb-1">{rec.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{rec.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </TooltipProvider>
  );
}
