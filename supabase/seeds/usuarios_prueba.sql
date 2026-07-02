DO $$
DECLARE
  pid uuid;

  -- Nombres por categoría
  nombres_tec  text[] := ARRAY['Carlos Mendez','Diego Torres','Andrés Rojas','Luis Fernández','Miguel Castillo','Gabriel Vargas','Sebastián Mora','Ricardo Peña','Alejandro Díaz','Javier Soto','Daniel Ríos','Felipe Guzmán','Tomás Aguilar','Eduardo Ramos','Pablo Vega','Nicolás Castro','Ignacio Fuentes','Matías Herrera','Rodrigo Jiménez','Esteban Navarro','Cristóbal Paredes','Renato Espinoza','Simón Alvarado','Marco Reyes','Iván Muñoz'];
  nombres_ven  text[] := ARRAY['Valentina López','Camila Ruiz','Isabella Martínez','Sofía González','Daniela Pérez','Andrea Romero','Lucía Morales','Natalia Ortiz','Carolina Flores','Paola Herrera','Gabriela Medina','Fernanda Cruz','Mariana Silva','Alejandra Ramos','Catalina Vega','Renata Sánchez','Valeria Torres','Pamela Rojas','Mónica Ríos','Patricia Fuentes','Verónica Castillo','Claudia Vargas','Marcela Aguirre','Yolanda Espinoza','Adriana Pinto'];
  nombres_ops  text[] := ARRAY['Jorge Salinas','Héctor Campos','Ernesto Delgado','Gerardo Acosta','Ramón Ibáñez','Alfredo Molina','Gustavo Pedraza','Roberto Cervantes','Manuel Solís','Óscar Reina','Alberto Lara','Arturo Bravo','Julio Contreras','Fernando Tapia','Luis Vergara','Samuel Cárdenas','Hugo Quiñones','Emilio Montoya','Víctor Palma','Ángel Serrano','Rafael Cisneros','Armando Ponce','Raúl Becerra','Domingo Mena','César Carrillo'];
  nombres_fin  text[] := ARRAY['Adriana Blanco','Patricia Suárez','Liliana Guerrero','Gloria Pineda','Esperanza Nieto','Rosario Mendoza','Beatriz Ochoa','Consuelo Cabrera','Miriam Sandoval','Estela Palacios','Sandra Quispe','Carmen Villanueva','Rosa Galindo','Irma Pacheco','Elena Macias','Pilar Cano','Teresa Arroyo','Norma Chávez','Rebeca Núñez','Dolores Rangel','Eugenia Montes','Amparo Barrera','Silvia Conde','Fabiela Cuevas','Hilda Zamora'];

  -- Ocupaciones por categoría
  ocup_tec  text[] := ARRAY['Desarrollador Full Stack','Ingeniero de Software','Data Scientist','DevOps Engineer','CTO','Product Manager Tech','Desarrollador Mobile','Arquitecto de Software','Ingeniero Cloud','Especialista en IA','Backend Developer','Frontend Developer','Ingeniero de Datos','Analista de Sistemas','Tech Lead'];
  ocup_ven  text[] := ARRAY['Director Comercial','Growth Hacker','Marketing Manager','Community Manager','Especialista en Ventas','Brand Strategist','Head of Sales','Digital Marketing Lead','Copywriter Senior','Especialista SEO','Key Account Manager','CMO','Especialista en Paid Media','Inbound Marketer','Sales Coach'];
  ocup_ops  text[] := ARRAY['COO','Project Manager','Scrum Master','Operations Manager','Supply Chain Manager','Process Consultant','Business Analyst','Product Owner','Logística y Distribución','Coordinador de Proyectos','Consultor de Operaciones','Especialista en Procesos','Operations Lead','Gerente de Calidad','Director de Operaciones'];
  ocup_fin  text[] := ARRAY['CFO','Analista Financiero','Controller','Asesor de Inversiones','Contador Senior','Director Financiero','Especialista en M&A','Analista de Riesgo','Tesorero Corporativo','Gestor de Fondos','Consultor Financiero','Auditor Interno','Planificador Financiero','Especialista en Fintech','Gerente de Finanzas'];

  -- Pasiones por categoría
  pasiones_tec  text[] := ARRAY['IA','Tecnología','Startups','Videojuegos','Educación','Blockchain','Robótica','Open Source','Ciberseguridad','Cloud Computing'];
  pasiones_ven  text[] := ARRAY['Marketing Digital','Ventas','Branding','Redes Sociales','Emprendimiento','Comunicación','Retail','E-commerce','Experiencia del Cliente','Publicidad'];
  pasiones_ops  text[] := ARRAY['Productividad','Gestión de Proyectos','Logística','Procesos','Liderazgo','Startups','Innovación','Automatización','Consultoría','Emprendimiento'];
  pasiones_fin  text[] := ARRAY['Finanzas','Inversiones','Economía','Criptomonedas','Bolsa de Valores','Fintech','Startups','Emprendimiento','Negocios','Contabilidad'];

  -- Superpoderes por categoría
  supers_tec  text[] := ARRAY['Programación','Resolución de problemas','Pensamiento analítico','Arquitectura de sistemas','Machine Learning'];
  supers_ven  text[] := ARRAY['Negociación','Persuasión','Storytelling','Gestión de clientes','Estrategia de marca'];
  supers_ops  text[] := ARRAY['Organización','Planificación estratégica','Gestión de equipos','Optimización de procesos','Toma de decisiones'];
  supers_fin  text[] := ARRAY['Análisis financiero','Modelado financiero','Gestión de riesgo','Valoración de empresas','Planificación fiscal'];

  -- Sueños por categoría
  suenos_tec  text[] := ARRAY['Crear una startup de IA que transforme la educación','Construir una plataforma tecnológica de impacto global','Desarrollar software que resuelva problemas reales en Latinoamérica','Fundar una empresa de tecnología en el sector salud','Crear el próximo unicornio tech de la región'];
  suenos_ven  text[] := ARRAY['Crear una marca global que conecte a emprendedores','Construir una agencia de marketing enfocada en startups','Escalar un e-commerce a nivel latinoamericano','Lanzar una plataforma de ventas B2B innovadora','Crear una consultora de growth para empresas emergentes'];
  suenos_ops  text[] := ARRAY['Optimizar operaciones de startups para escalar rápido','Crear un sistema de gestión que revolucione la productividad','Construir una consultora de operaciones de alto impacto','Transformar la logística en Latinoamérica','Liderar la expansión operativa de un unicornio'];
  suenos_fin  text[] := ARRAY['Crear un fondo de inversión para startups latinoamericanas','Construir una fintech que bancarice a más personas','Democratizar el acceso a inversiones en la región','Fundar una firma de asesoría financiera para emprendedores','Revolucionar el sistema de pagos en Latinoamérica'];

  -- Frases tinder por categoría
  frases_tec  text[] := ARRAY['El código es poesía','Primero haz que funcione, luego hazlo bien','Los mejores productos nacen de problemas reales','La tecnología sin propósito es ruido','Construir es la mejor forma de aprender'];
  frases_ven  text[] := ARRAY['Las ventas son conversaciones con propósito','El mejor marketing es el que no parece marketing','Una buena historia vende más que cualquier producto','El cliente siempre tiene razón, pero tú tienes la solución','Vender es servir'];
  frases_ops  text[] := ARRAY['Los sistemas liberan el potencial humano','Un buen proceso hoy evita un caos mañana','La excelencia operativa es el motor del crecimiento','Mide todo lo que importa','Ejecutar bien es la ventaja competitiva más sostenible'];
  frases_fin  text[] := ARRAY['El dinero es un medio, no un fin','Las mejores inversiones son las que no se ven','El flujo de caja es el oxígeno de una empresa','Controla tus números o ellos te controlarán','La disciplina financiera separa a los que sueñan de los que logran'];

  nombre_actual     text;
  ocupacion_actual  text;
  categoria_actual  text;
  pasiones_cat      text[];
  supers_cat        text[];
  suenos_cat        text[];
  frases_cat        text[];
  ocup_cat          text[];
  nombres_cat       text[];
  idx               int;

BEGIN
  FOR i IN 1..100 LOOP

    -- Determinar categoría y arrays según bloque de 25
    IF i <= 25 THEN
      categoria_actual := 'Tecnología';
      nombres_cat      := nombres_tec;
      ocup_cat         := ocup_tec;
      pasiones_cat     := pasiones_tec;
      supers_cat       := supers_tec;
      suenos_cat       := suenos_tec;
      frases_cat       := frases_tec;
      idx              := i;
    ELSIF i <= 50 THEN
      categoria_actual := 'Marketing - Ventas';
      nombres_cat      := nombres_ven;
      ocup_cat         := ocup_ven;
      pasiones_cat     := pasiones_ven;
      supers_cat       := supers_ven;
      suenos_cat       := suenos_ven;
      frases_cat       := frases_ven;
      idx              := i - 25;
    ELSIF i <= 75 THEN
      categoria_actual := 'Operaciones';
      nombres_cat      := nombres_ops;
      ocup_cat         := ocup_ops;
      pasiones_cat     := pasiones_ops;
      supers_cat       := supers_ops;
      suenos_cat       := suenos_ops;
      frases_cat       := frases_ops;
      idx              := i - 50;
    ELSE
      categoria_actual := 'Finanzas';
      nombres_cat      := nombres_fin;
      ocup_cat         := ocup_fin;
      pasiones_cat     := pasiones_fin;
      supers_cat       := supers_fin;
      suenos_cat       := suenos_fin;
      frases_cat       := frases_fin;
      idx              := i - 75;
    END IF;

    nombre_actual    := nombres_cat[idx];
    ocupacion_actual := ocup_cat[((idx - 1) % array_length(ocup_cat, 1)) + 1];
    pid              := gen_random_uuid();

    -- Perfil principal
    INSERT INTO perfiles_datos (id, nombre, ocupacion, foto, whatsapp, email, estado, aprobado, codigo_match)
    VALUES (
      pid,
      nombre_actual,
      ocupacion_actual,
      'https://i.pravatar.cc/150?img=' || ((i % 70) + 1),
      '+58414' || LPAD(i::text, 7, '0'),
      lower(replace(nombre_actual, ' ', '.')) || '@nomadas.com',
      'aprobado',
      true,
      gen_random_uuid()
    );

    -- Resultado / categoría
    INSERT INTO perfil_resultado (perfil_id, categoria, descripcion, busca)
    VALUES (
      pid,
      categoria_actual,
      'Perfil de ' || categoria_actual || ' con experiencia en ' || ocupacion_actual || '. Busca un cofundador complementario para construir una startup de impacto.',
      CASE categoria_actual
        WHEN 'Tecnología'       THEN 'Marketing - Ventas, Finanzas'
        WHEN 'Marketing - Ventas' THEN 'Tecnología, Operaciones'
        WHEN 'Operaciones'      THEN 'Tecnología, Marketing - Ventas'
        WHEN 'Finanzas'         THEN 'Tecnología, Operaciones'
      END
    );

    -- Sueños
    INSERT INTO perfil_suenos (perfil_id, sueno, tiene_idea)
    VALUES (
      pid,
      suenos_cat[((idx - 1) % array_length(suenos_cat, 1)) + 1],
      CASE WHEN i % 3 = 0 THEN 'Sí, tengo una idea clara' WHEN i % 3 = 1 THEN 'Tengo algunas ideas' ELSE 'No' END
    );

    -- Pasiones (3 por usuario, rotando)
    INSERT INTO perfil_pasiones (perfil_id, pasion) VALUES
      (pid, pasiones_cat[((idx - 1) % array_length(pasiones_cat, 1)) + 1]),
      (pid, pasiones_cat[(idx % array_length(pasiones_cat, 1)) + 1]),
      (pid, pasiones_cat[((idx + 1) % array_length(pasiones_cat, 1)) + 1]);

    -- También agregar "Startups" y "Emprendimiento" a algunos para generar matches cruzados
    IF i % 4 = 0 THEN
      INSERT INTO perfil_pasiones (perfil_id, pasion) VALUES (pid, 'Startups');
    END IF;
    IF i % 5 = 0 THEN
      INSERT INTO perfil_pasiones (perfil_id, pasion) VALUES (pid, 'Emprendimiento');
    END IF;

    -- Superpoderes (2 por usuario)
    INSERT INTO perfil_superpoderes (perfil_id, superpoder) VALUES
      (pid, supers_cat[((idx - 1) % array_length(supers_cat, 1)) + 1]),
      (pid, supers_cat[(idx % array_length(supers_cat, 1)) + 1]);

    -- Tinder
    INSERT INTO perfil_tinder (perfil_id, frase_representa)
    VALUES (
      pid,
      frases_cat[((idx - 1) % array_length(frases_cat, 1)) + 1]
    );

  END LOOP;
END $$;
