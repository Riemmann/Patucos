import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-2xl font-bold mb-2">Aviso Legal</h1>
        <p className="text-sm text-muted-foreground mb-8">Ultima actualizacion: abril 2026</p>

        <div className="prose prose-sm prose-zinc max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Datos Identificativos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En cumplimiento del deber de informacion recogido en el articulo 10 de la Ley 34/2002, de 11 de julio,
              de Servicios de la Sociedad de la Informacion y del Comercio Electronico (LSSI-CE), a continuacion
              se reflejan los datos del titular de esta aplicacion:
            </p>
            <div className="mt-3 p-4 rounded-lg bg-white border border-border/40 text-sm space-y-1">
              <p><strong>Denominacion:</strong> [Nombre del centro educativo]</p>
              <p><strong>NIF/CIF:</strong> [CIF del centro]</p>
              <p><strong>Domicilio:</strong> [Direccion completa del centro]</p>
              <p><strong>Telefono:</strong> [Telefono del centro]</p>
              <p><strong>Email:</strong> [Email del centro]</p>
              <p><strong>Inscripcion registral:</strong> Centro autorizado por la Consejeria de Educacion de la Comunidad de Madrid</p>
            </div>
            <p className="text-xs text-amber-600 mt-2 italic">
              Nota: estos datos se personalizan para cada centro que contrata el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Objeto</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta aplicacion web tiene como finalidad facilitar la comunicacion entre el centro educativo
              y las familias de los alumnos/as matriculados, proporcionando una agenda digital que recoge
              la actividad diaria del menor, fotografias de actividades, comunicaciones del centro y
              herramientas de gestion educativa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Condiciones de Uso</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5 mt-2 list-disc pl-5">
              <li>El acceso a la aplicacion esta restringido a usuarios autorizados por el centro educativo.</li>
              <li>Las credenciales de acceso son personales e intransferibles.</li>
              <li>Queda prohibida la difusion de fotografias u otra informacion obtenida a traves de la aplicacion sin autorizacion del centro.</li>
              <li>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.</li>
              <li>Las fotografias compartidas a traves de la aplicacion son para uso exclusivo de las familias del centro y no deben publicarse en redes sociales ni compartirse con terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Propiedad Intelectual</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los contenidos de esta aplicacion (textos, imagenes, diseno, logotipos, software) estan protegidos
              por los derechos de propiedad intelectual e industrial. Queda prohibida su reproduccion, distribucion
              o transformacion sin autorizacion expresa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Proteccion de Datos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El tratamiento de datos personales se rige por nuestra{' '}
              <Link href="/legal/privacidad" className="text-indigo-600 underline">Politica de Privacidad</Link>,
              conforme al Reglamento General de Proteccion de Datos (RGPD) y la Ley Organica 3/2018 de
              Proteccion de Datos Personales y Garantia de los Derechos Digitales (LOPDGDD).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Limitacion de Responsabilidad</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El centro no se hace responsable de interrupciones del servicio por causas tecnicas, mantenimiento
              o causas de fuerza mayor. Se realizaran los mejores esfuerzos para garantizar la disponibilidad
              y seguridad de la aplicacion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Legislacion Aplicable</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Las presentes condiciones se rigen por la legislacion espanola. Para cualquier controversia
              que pudiera derivarse del acceso o uso de esta aplicacion, las partes se someten a los
              juzgados y tribunales del domicilio del centro educativo.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
