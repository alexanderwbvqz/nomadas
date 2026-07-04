DO $$
DECLARE
  pid        uuid;
  evento_id  uuid := gen_random_uuid();

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

  -- Millón de dólares por categoría
  millon_tec  text[] := ARRAY['Una plataforma de IA que personalice la educación para cada estudiante','Un sistema de salud digital accesible para toda Latinoamérica','Infraestructura cloud para startups en mercados emergentes','Una herramienta que automatice el trabajo repetitivo en PYMEs','Software que conecte talento tech con oportunidades globales'];
  millon_ven  text[] := ARRAY['Una plataforma que conecte marcas locales con mercados globales','Un sistema de ventas automatizado para pequeños negocios','Una red de distribución directa al consumidor en toda la región','Una agencia de branding para startups con impacto social','Un marketplace de servicios creativos para emprendedores'];
  millon_ops  text[] := ARRAY['Un sistema de logística inteligente para e-commerce regional','Una plataforma de gestión operativa para startups en crecimiento','Software de optimización de procesos para industrias tradicionales','Una red de proveedores certificados para empresas en expansión','Un sistema de control de calidad automatizado para manufactura'];
  millon_fin  text[] := ARRAY['Un fondo de microcréditos para emprendedores sin historial bancario','Una plataforma de inversión colectiva para proyectos locales','Un sistema de gestión financiera accesible para PYMEs','Una fintech que simplifique los pagos internacionales en LATAM','Una plataforma de educación financiera para jóvenes emprendedores'];

  -- Problema del mundo por categoría
  problema_tec  text[] := ARRAY['La brecha digital que excluye a millones de personas','La falta de acceso a educación de calidad en zonas rurales','La ineficiencia energética en ciudades en desarrollo','La desconexión entre talento y oportunidades laborales','La falta de herramientas tech accesibles para pequeños negocios'];
  problema_ven  text[] := ARRAY['La dificultad de los pequeños negocios para competir con grandes marcas','La falta de acceso a mercados internacionales para productores locales','El desperdicio de recursos por cadenas de distribución ineficientes','La poca visibilidad de productos locales de calidad','La desconexión entre consumidores y productores responsables'];
  problema_ops  text[] := ARRAY['La ineficiencia operativa que frena el crecimiento de las PYMEs','La falta de sistemas de gestión accesibles para negocios medianos','El desperdicio en cadenas de suministro mal optimizadas','La dificultad de escalar operaciones sin perder calidad','La falta de procesos claros en startups en etapa temprana'];
  problema_fin  text[] := ARRAY['La exclusión financiera de millones de personas en LATAM','La falta de acceso a capital para emprendedores con ideas brillantes','La opacidad del sistema financiero para el ciudadano común','La dificultad de gestionar finanzas personales sin educación formal','La falta de opciones de inversión accesibles para la clase media'];

  -- Admira en un emprendedor por categoría
  admira_tec  text[] := ARRAY['Su capacidad de resolver problemas complejos con soluciones simples','La persistencia ante los fracasos técnicos y la iteración constante','Su visión de largo plazo sin perder el foco en el producto','La habilidad de construir equipos técnicos de alto rendimiento','Su capacidad de aprender rápido y adaptarse a nuevas tecnologías'];
  admira_ven  text[] := ARRAY['Su habilidad para conectar con las personas de forma genuina','La capacidad de crear narrativas que inspiran y mueven a la acción','Su persistencia para cerrar tratos incluso en momentos difíciles','La visión para identificar oportunidades de mercado antes que nadie','Su energía para motivar a todo el equipo hacia una meta común'];
  admira_ops  text[] := ARRAY['Su capacidad de convertir el caos en sistemas que funcionan','La disciplina para ejecutar planes con consistencia y precisión','Su habilidad para escalar operaciones sin perder la calidad','La visión sistémica que anticipa cuellos de botella antes de que ocurran','Su capacidad de liderar equipos diversos hacia resultados concretos'];
  admira_fin  text[] := ARRAY['Su disciplina para gestionar el riesgo sin perder la ambición','La capacidad de leer oportunidades de inversión que otros no ven','Su transparencia y honestidad en el manejo del dinero','La habilidad de tomar decisiones bajo presión con datos sólidos','Su visión para construir negocios financieramente sostenibles desde el inicio'];

  -- Mayor aprendizaje por categoría
  aprendizaje_tec  text[] := ARRAY['El mejor código es el que no necesitas escribir','Lanzar rápido y aprender del usuario es más valioso que la perfección','Un equipo motivado construye mejor que uno de estrellas individuales','La tecnología es un medio, no un fin en sí mismo','Escuchar al cliente desde el día uno evita meses de trabajo perdido'];
  aprendizaje_ven  text[] := ARRAY['La confianza se construye con consistencia, no con grandes gestos','El NO es el inicio de una negociación, no el final','Conocer al cliente mejor que él mismo es la mayor ventaja competitiva','Las personas compran emociones, no productos','El seguimiento constante es lo que separa a los buenos vendedores de los grandes'];
  aprendizaje_ops  text[] := ARRAY['Lo que no se mide no se puede mejorar','Un proceso bien documentado es el mejor legado que puedes dejar','Delegar con confianza multiplica el impacto del equipo','La simplicidad operativa es más poderosa que la sofisticación innecesaria','Anticipar el problema es siempre más barato que resolverlo en crisis'];
  aprendizaje_fin  text[] := ARRAY['El flujo de caja es más importante que las ganancias en papel','Nunca inviertas en lo que no entiendes completamente','La disciplina financiera en tiempos buenos es lo que salva en tiempos malos','Diversificar no es solo una estrategia, es una mentalidad','El mejor momento para planear las finanzas fue ayer, el segundo mejor es hoy'];

  -- Preguntas rompe hielo por categoría
  hielo_tec  text[] := ARRAY['¿Qué problema técnico te quita el sueño pero no puedes dejar de pensar en él?','Si pudieras automatizar una sola cosa en el mundo, ¿qué sería?','¿Cuál fue el bug más difícil que resolviste y qué aprendiste?','¿Qué tecnología emergente crees que cambiará más el mundo en 5 años?','¿Prefieres construir el producto perfecto o lanzar rápido y mejorar?'];
  hielo_ven  text[] := ARRAY['¿Cuál fue la venta más difícil que cerraste y cómo lo lograste?','¿Qué marca te parece que hace el mejor marketing y por qué?','Si tuvieras que vender hielo en el polo norte, ¿cuál sería tu pitch?','¿Qué es lo primero que analizas cuando llegas a un mercado nuevo?','¿Cómo diferencias a un cliente potencial de uno que solo curiosea?'];
  hielo_ops  text[] := ARRAY['¿Cuál fue el proceso más caótico que lograste ordenar y cómo lo hiciste?','¿Qué herramienta de gestión no podrías vivir sin ella?','Si pudieras optimizar un solo proceso en cualquier industria, ¿cuál elegirías?','¿Cómo decides cuándo un proceso es suficientemente bueno para escalar?','¿Qué es lo primero que haces cuando llegas a una startup con operaciones desordenadas?'];
  hielo_fin  text[] := ARRAY['¿Cuál fue la mejor inversión que hiciste y qué te enseñó?','¿Cómo explicas el valor del dinero a alguien que nunca ha pensado en finanzas?','¿Qué métrica financiera crees que los emprendedores ignoran más?','Si solo pudieras revisar un número de tu negocio cada día, ¿cuál sería?','¿Cuándo crees que una startup está lista para levantar capital externo?'];

  -- Perfiles buscados por categoría (complementarios)
  busca_tec  text[] := ARRAY['Marketing - Ventas','Operaciones','Finanzas'];
  busca_ven  text[] := ARRAY['Tecnología','Operaciones','Finanzas'];
  busca_ops  text[] := ARRAY['Tecnología','Marketing - Ventas','Finanzas'];
  busca_fin  text[] := ARRAY['Tecnología','Operaciones','Marketing - Ventas'];

  -- Valores importantes
  valores_todos text[] := ARRAY['Ambición','Honestidad','Trabajo en equipo','Responsabilidad','Innovación','Perseverancia','Humildad','Liderazgo','Confianza','Compromiso'];

  -- Disponibilidad
  disponibilidades text[] := ARRAY['Menos de 5 horas','5 a 10 horas','10 a 20 horas','Más de 20 horas'];

  -- Emprendimientos en marcha por categoría
  emprend_tec  text[] := ARRAY['Una app de gestión de proyectos para startups','Una plataforma de e-learning con IA','Un marketplace de servicios tech para PYMEs'];
  emprend_ven  text[] := ARRAY['Una agencia de marketing digital para startups','Un SaaS de automatización de ventas','Una plataforma de influencer marketing'];
  emprend_ops  text[] := ARRAY['Un software de gestión de inventarios','Una consultora de procesos para startups','Una plataforma de logística last-mile'];
  emprend_fin  text[] := ARRAY['Una fintech de microcréditos','Una plataforma de inversiones para millennials','Un sistema de gestión financiera para PYMEs'];

  nombre_actual     text;
  ocupacion_actual  text;
  categoria_actual  text;
  pasiones_cat      text[];
  supers_cat        text[];
  suenos_cat        text[];
  frases_cat        text[];
  ocup_cat          text[];
  nombres_cat       text[];
  busca_cat         text[];
  emprend_cat       text[];
  millon_cat        text[];
  problema_cat      text[];
  admira_cat        text[];
  aprendizaje_cat   text[];
  hielo_cat         text[];
  idx               int;

BEGIN
  -- Evento de prueba para que todos los perfiles aparezcan en el match
  INSERT INTO eventos (id, nombre, fecha, estado)
  VALUES (evento_id, 'Nómadas — Evento de prueba', CURRENT_DATE, 'activo');

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
      busca_cat        := busca_tec;
      emprend_cat      := emprend_tec;
      millon_cat       := millon_tec;
      problema_cat     := problema_tec;
      admira_cat       := admira_tec;
      aprendizaje_cat  := aprendizaje_tec;
      hielo_cat        := hielo_tec;
      idx              := i;
    ELSIF i <= 50 THEN
      categoria_actual := 'Marketing - Ventas';
      nombres_cat      := nombres_ven;
      ocup_cat         := ocup_ven;
      pasiones_cat     := pasiones_ven;
      supers_cat       := supers_ven;
      suenos_cat       := suenos_ven;
      frases_cat       := frases_ven;
      busca_cat        := busca_ven;
      emprend_cat      := emprend_ven;
      millon_cat       := millon_ven;
      problema_cat     := problema_ven;
      admira_cat       := admira_ven;
      aprendizaje_cat  := aprendizaje_ven;
      hielo_cat        := hielo_ven;
      idx              := i - 25;
    ELSIF i <= 75 THEN
      categoria_actual := 'Operaciones';
      nombres_cat      := nombres_ops;
      ocup_cat         := ocup_ops;
      pasiones_cat     := pasiones_ops;
      supers_cat       := supers_ops;
      suenos_cat       := suenos_ops;
      frases_cat       := frases_ops;
      busca_cat        := busca_ops;
      emprend_cat      := emprend_ops;
      millon_cat       := millon_ops;
      problema_cat     := problema_ops;
      admira_cat       := admira_ops;
      aprendizaje_cat  := aprendizaje_ops;
      hielo_cat        := hielo_ops;
      idx              := i - 50;
    ELSE
      categoria_actual := 'Finanzas';
      nombres_cat      := nombres_fin;
      ocup_cat         := ocup_fin;
      pasiones_cat     := pasiones_fin;
      supers_cat       := supers_fin;
      suenos_cat       := suenos_fin;
      frases_cat       := frases_fin;
      busca_cat        := busca_fin;
      emprend_cat      := emprend_fin;
      millon_cat       := millon_fin;
      problema_cat     := problema_fin;
      admira_cat       := admira_fin;
      aprendizaje_cat  := aprendizaje_fin;
      hielo_cat        := hielo_fin;
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
        WHEN 'Tecnología'         THEN 'Marketing - Ventas, Finanzas'
        WHEN 'Marketing - Ventas' THEN 'Tecnología, Operaciones'
        WHEN 'Operaciones'        THEN 'Tecnología, Marketing - Ventas'
        WHEN 'Finanzas'           THEN 'Tecnología, Operaciones'
      END
    );

    -- Sueños + emprendimiento
    INSERT INTO perfil_suenos (perfil_id, sueno, tiene_idea, tiene_emprendimiento, detalle_emprendimiento)
    VALUES (
      pid,
      suenos_cat[((idx - 1) % array_length(suenos_cat, 1)) + 1],
      CASE WHEN i % 3 = 0 THEN 'Sí' WHEN i % 3 = 1 THEN 'Tengo varias' ELSE 'No' END,
      CASE WHEN i % 4 = 0 THEN 'Sí' ELSE 'No' END,
      CASE WHEN i % 4 = 0 THEN emprend_cat[((idx - 1) % array_length(emprend_cat, 1)) + 1] ELSE NULL END
    );

    -- Pasiones (3 por usuario, rotando)
    INSERT INTO perfil_pasiones (perfil_id, pasion) VALUES
      (pid, pasiones_cat[((idx - 1) % array_length(pasiones_cat, 1)) + 1]),
      (pid, pasiones_cat[(idx % array_length(pasiones_cat, 1)) + 1]),
      (pid, pasiones_cat[((idx + 1) % array_length(pasiones_cat, 1)) + 1]);

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

    -- Preferencias
    INSERT INTO perfil_preferencias (perfil_id, perfiles_buscados, valores_importantes, disponibilidad)
    VALUES (
      pid,
      ARRAY[
        busca_cat[((idx - 1) % array_length(busca_cat, 1)) + 1],
        busca_cat[(idx % array_length(busca_cat, 1)) + 1]
      ],
      ARRAY[
        valores_todos[((i - 1) % array_length(valores_todos, 1)) + 1],
        valores_todos[(i       % array_length(valores_todos, 1)) + 1],
        valores_todos[((i + 1) % array_length(valores_todos, 1)) + 1]
      ],
      disponibilidades[((i - 1) % array_length(disponibilidades, 1)) + 1]
    );

    -- Tinder
    INSERT INTO perfil_tinder (perfil_id, frase_representa, millon_dolares, problema_resolver, admira_emprendedor, mayor_aprendizaje, pregunta_hielo)
    VALUES (
      pid,
      frases_cat[((idx - 1) % array_length(frases_cat, 1)) + 1],
      millon_cat[((idx - 1) % array_length(millon_cat, 1)) + 1],
      problema_cat[((idx - 1) % array_length(problema_cat, 1)) + 1],
      admira_cat[((idx - 1) % array_length(admira_cat, 1)) + 1],
      aprendizaje_cat[((idx - 1) % array_length(aprendizaje_cat, 1)) + 1],
      hielo_cat[((idx - 1) % array_length(hielo_cat, 1)) + 1]
    );

    -- Asistencia al evento de prueba
    INSERT INTO asistencias (evento_id, perfil_id, asistio)
    VALUES (evento_id, pid, true);

  END LOOP;
END $$;
