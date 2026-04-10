import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-2xl font-bold mb-2">Politica de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-8">Ultima actualizacion: abril 2026</p>

        <div className="prose prose-sm prose-zinc max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Responsable del Tratamiento</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El responsable del tratamiento de los datos personales es el centro educativo que contrata el servicio
              (en adelante, "el Centro"). La identidad, direccion y datos de contacto del responsable se facilitan
              en el Aviso Legal del Centro y en el contrato de matriculacion.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              La aplicacion es desarrollada y mantenida por el proveedor tecnologico (en adelante, "el Encargado del Tratamiento"),
              que actua unicamente bajo las instrucciones del Centro conforme al contrato de encargado del tratamiento suscrito entre ambas partes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Datos que Recopilamos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Tratamos las siguientes categorias de datos personales:</p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li><strong>Datos del alumno/a:</strong> nombre, apellidos, fecha de nacimiento, aula asignada, alergias, notas medicas, fotografias de actividades.</li>
              <li><strong>Datos de los padres/tutores:</strong> nombre, apellidos, email, telefono, relacion con el alumno/a.</li>
              <li><strong>Datos del personal docente:</strong> nombre, apellidos, email, telefono, aula asignada, rol.</li>
              <li><strong>Datos de actividad:</strong> registros diarios (comidas, siestas, actividades, estado de animo), asistencia, mensajes entre familia y profesorado.</li>
              <li><strong>Datos de acceso:</strong> credenciales de usuario, registros de acceso a la plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Finalidades del Tratamiento</h2>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li>Gestion de la agenda diaria y comunicacion entre el Centro y las familias.</li>
              <li>Registro de la actividad educativa y asistencial del alumno/a.</li>
              <li>Gestion de la asistencia y control de personas autorizadas para la recogida.</li>
              <li>Comunicacion de incidencias de salud y avisos del Centro.</li>
              <li>Comparticion de fotografias de actividades educativas (con consentimiento expreso).</li>
              <li>Gestion administrativa del Centro (matriculacion, facturacion).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Base Juridica</h2>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li><strong>Ejecucion de contrato:</strong> el tratamiento es necesario para la prestacion del servicio educativo contratado (art. 6.1.b RGPD).</li>
              <li><strong>Obligacion legal:</strong> cumplimiento de obligaciones educativas y sanitarias aplicables al Centro (art. 6.1.c RGPD).</li>
              <li><strong>Consentimiento:</strong> para la captacion y difusion de imagenes del alumno/a y para el envio de comunicaciones no esenciales (art. 6.1.a RGPD).</li>
              <li><strong>Interes legitimo:</strong> para la seguridad de los menores (control de personas autorizadas) (art. 6.1.f RGPD).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Destinatarios de los Datos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los datos no se ceden a terceros salvo obligacion legal. Los datos son accesibles unicamente por:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li>El personal del Centro (profesorado y direccion) en funcion de su rol.</li>
              <li>Los padres/tutores legales, limitado a los datos de sus propios hijos/as.</li>
              <li>El proveedor tecnologico (Encargado del Tratamiento), para el mantenimiento de la plataforma.</li>
              <li>Proveedores de infraestructura: Vercel Inc. (hosting, USA, con clausulas contractuales tipo) y Supabase Inc. (base de datos, con DPA firmado).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Conservacion de los Datos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los datos se conservaran durante la relacion contractual con el Centro y, tras la baja del alumno/a,
              durante el plazo legalmente exigido (minimo 3 anos para obligaciones educativas).
              Las fotografias se conservan durante el curso escolar y se eliminan al finalizar, salvo consentimiento
              expreso para su conservacion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">7. Derechos de los Interesados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los padres/tutores legales pueden ejercer los siguientes derechos en nombre de sus hijos/as menores de 14 anos:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li><strong>Acceso:</strong> obtener confirmacion de si se tratan datos y acceder a ellos.</li>
              <li><strong>Rectificacion:</strong> corregir datos inexactos.</li>
              <li><strong>Supresion:</strong> solicitar la eliminacion de datos cuando ya no sean necesarios.</li>
              <li><strong>Limitacion:</strong> solicitar la limitacion del tratamiento en determinadas circunstancias.</li>
              <li><strong>Oposicion:</strong> oponerse al tratamiento de datos por motivos particulares.</li>
              <li><strong>Portabilidad:</strong> recibir los datos en un formato estructurado y de uso comun.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Estos derechos pueden ejercerse a traves de la propia aplicacion (seccion "Mi perfil") o contactando
              directamente con el Centro. Tambien puede presentar una reclamacion ante la
              Agencia Espanola de Proteccion de Datos (www.aepd.es).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">8. Medidas de Seguridad</h2>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
              <li>Comunicaciones cifradas mediante HTTPS/TLS.</li>
              <li>Base de datos cifrada en reposo.</li>
              <li>Control de acceso basado en roles (cada usuario solo accede a los datos que le corresponden).</li>
              <li>Autenticacion segura con contrasenas cifradas.</li>
              <li>Copias de seguridad automaticas diarias.</li>
              <li>Registro de accesos para auditoria.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">9. Menores de Edad</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conforme a la LOPDGDD (art. 7), el tratamiento de datos de menores de 14 anos requiere el consentimiento
              de los padres o tutores legales. El Centro recaba este consentimiento durante el proceso de matriculacion
              y, para finalidades adicionales (como la captacion de imagenes), a traves de la propia aplicacion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">10. Contacto</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Para cualquier consulta relacionada con la proteccion de datos, puede contactar con el Centro
              o con el Delegado de Proteccion de Datos a traves del correo electronico proporcionado en el
              Aviso Legal del Centro.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
