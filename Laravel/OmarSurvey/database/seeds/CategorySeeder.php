<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'section'       =>  'Humanidad',
                'name'          =>  'Amabilidad',
                'definition'    =>  'Ser amable y generoso con los demás. Capacidad de ayudar, cuidar o hacer un favor con cariño.',
                'description'   =>  'Las personas amables demuestran un comportamiento marcado por características éticas, una disposición agradable y una clara preocupación y consideración por los demás. Este tipo de persona ayuda a las personas en necesidad sin esperar nada a cambio. La amabilidad produce emociones positivas que generan bienestar psicológico; de hecho, la amabilidad puede verse como un antídoto natural contra el estrés, la ansiedad e incluso la depresión. Las personas amables se desempeñan muy bien como enfermeros, médicos, fisioterapeutas, trabajadores sociales, psicoterapeutas y carreras afines. También son buenos trabajando para organizaciones caritativas ya que poseen la cualidad de ser amigables, generosos y considerados.'
            ],
            [
                'section'       =>  'Humanidad',
                'name'          =>  'Amor',
                'definition'    =>  'Valorar relaciones íntimas con los demás, en particular con aquellas donde el compartir y el cariño es recíproco. Capacidad sentirse muy cerca a los demás.',
                'description'   =>  'El amor abarca una gama de estados emocionales y mentales positivos. En este caso en particular, el amor se refiere a un sentimiento de fuerte apego emocional por familiares, amigos, compañeros de trabajo, animales y por el mundo en general. Estas personas consideran que las relaciones íntimas son importantes, les es fácil dar y recibir cariño, sienten un profundo afecto y apego por muchas personas en su vida, son muy cercanos a sus familiares y sienten permanentemente el amor en su vida. Estudios científicos han demostrado que las personas amorosas se destacan por tener una buena salud física, mental y emocional, ya que existe una correlación directa entre los sentimientos positivos generados por el amor y la buena salud.'
            ],
            [
                'section'       =>  'Sabiduria',
                'name'          =>  'Amor por el Aprendizaje',
                'definition'    =>  'Dominio de nuevas capacidades, temas y conocimiento a través de aprendizaje formal o informal. El amor por el aprendizaje esta relacionado a la fortaleza de ‘curiosidad’, pero abarca aún mas, para demostrar la tendencia hacia la actualización sistemática del conocimiento propio.',
                'description'   =>  'Las personas que aman el aprendizaje se sienten motivadas a adquirir nuevas habilidades y conocimientos o a desarrollar las habilidades y conocimientos existentes. Estas personas se caracterizan por sentir un profundo bienestar cuando están aprendiendo cosas nuevas y cuando están incrementando su base de conocimiento. Debido a esto, las personas que aman el aprendizaje suelen tener un amplio conocimiento sobre cultura general, suelen leer muchos libros, disfrutan visitando museos y bibliotecas y sienten una verdadera pasión por aprender cosas nuevas, lo cual es una característica muy valiosa y codiciada en el ámbito escolar y laboral. 
'
            ],
            [
                'section'       =>  'Trascendencia',
                'name'          =>  'Apreciación por la belleza y la excelencia',
                'definition'    =>  'Notar y apreciar la belleza, la excelencia y/o habilidad en diversos ámbitos de la vida, tales como: la naturaleza, el arte, las matemáticas, la ciencia o las experiencias cotidianas.',
                'description'   =>  'Se refiere a la tendencia humana a sentir poderosas emociones trascendentales. En estos casos, un sentido de admiración, maravilla y exaltación es generado por la percepción y la contemplación de la belleza y la excelencia en diferentes ámbitos de la vida. Estos sentimientos son provocados, por ejemplo, al observar una obra de arte, al admirar la habilidad de un gran maestro, artista o científico, o al percibir la belleza natural que rodea la persona. Ciertas respuestas corporales y expresiones faciales generalmente acompañan estas experiencias como abrir los ojos de par en par, abrir la boca en señal de asombro, sentir la piel de gallina, así como el brote de lágrimas y los nudos en la garganta. Estas experiencias generan sentimientos positivos que hacen que las personas se sientan elevadas emocionalmente, positivas, agradecidas y felices. '
            ],
            [
                'section'       =>  'Moderacion',
                'name'          =>  'Autorregulación',
                'definition'    =>  'Regular lo que uno siente y hace. Ser disciplinado(a). Controlar sus apetitos y emociones.',
                'description'   =>  'La autorregulación implica controlar el comportamiento, las emociones y los pensamientos en la búsqueda de objetivos a largo plazo. Estas personas suelen ser muy disciplinadas y demuestran una gran fuerza de voluntad que les permite controlar sus apetitos e impulsos. El objetivo de la mayoría de los tipos de terapia psicológica es mejorar la capacidad del individuo para autorregularse, de manera de que la persona gane o recupere un sentido de control sobre su comportamiento y su vida. La autorregulación es muy valorada en trabajos donde es necesario interactuar con personas violentas, con problemas mentales o con problemas de adicción, o en oficios donde se tiene poder sobre otras personas como en la policía o las fuerzas militares. '
            ],
            [
                'section'       =>  'Sabiduria',
                'name'          =>  'Buen Juicio',
                'definition'    =>  'Capacidad para pensar con profundidad y tomar decisiones considerando todos los puntos de vista. No precipitarse a llegar a conclusiones prematuras. Ser capaz de cambiar de opinión al recibir nueva evidencia. Considerar toda evidencia justamente.',
                'description'   =>  'El buen juicio se refiere a tener las herramientas necesarias que permiten tomar decisiones inteligentes y bien informadas en una gran variedad de situaciones. Las personas con buen juicio usualmente evalúan todos los pros y los contras antes de tomar decisiones, por lo que son buenas llegando a conclusiones razonables y tomando decisiones acertadas. Asimismo, sus procesos de toma de decisiones son siempre deliberados, sistemáticos y lógicos. Las personas con buen juicio se mantienen flexibles y pueden cambiar de opinión al recibir nueva evidencia y sus instintos y emociones no interfieren en su pensamiento crítico, es decir, nunca se apresuran a sacar conclusiones prematuras.'
            ],
            [
                'section'       =>  'Sabiduria',
                'name'          =>  'Creatividad',
                'definition'    =>  'Capacidad de pensar en nuevas soluciones y formas de conceptualizar y de hacer las cosas. Incluye logros en expresión artística pero no se limita a ello.',
                'description'   =>  'Estas personas se caracterizan por tener pensamientos originales y creativos, por lo que se desempeñan muy bien en trabajos donde se necesita de mucha imaginación como en el área de publicidad y mercadeo, diseño gráfico, arquitectura, ingeniería, diseño industrial, artes plásticas, etc. La creatividad implica crear cosas nuevas y resolver problemas de maneras novedosas; por lo tanto, las personas creativas son buenas encontrando la forma optima de hacer las cosas y a su vez tienen una gran facilidad para inventar productos, técnicas o procesos innovadores, lo cual es muy valorado en muchas áreas de trabajo. La creatividad, como muchas capacidades humanas, puede ser mejorada mediante el pensamiento crítico y el pensamiento divergente, los cuales generan múltiples e ingeniosas soluciones a un mismo problema.'
            ],
            [
                'section'       =>  'Sabiduria',
                'name'          =>  'Curiosidad',
                'definition'    =>  'Impulso e interés por las experiencias y las cosas. Capacidad de encontrar, explorar y descubrir temas fascinantes.',
                'description'   =>  'Estas personas poseen una alta motivación e interés por tener nuevas experiencias que promuevan emociones positivas y satisfagan el instinto de descubrir lo desconocido. Por ejemplo, cuando ven algo nuevo, las personas curiosas siempre se detienen a investigar, les gusta aprender sobre temas novedosos e interesantes y sienten un gran deseo de saber cómo funcionan las cosas. La curiosidad es un factor importante de desempeño en el área laboral ya que las personas curiosas asumen la responsabilidad de aprender lo que necesitan saber para realizar un buen trabajo. Además, las personas curiosas tienden a ser abiertas y están dispuestas a considerar muchas perspectivas diferentes, lo que usualmente conduce a un pensamiento innovador.'
            ],
            [
                'section'       =>  'Valor',
                'name'          =>  'Entusiasmo',
                'definition'    =>  'Manera de abordar la vida con fogosidad y energía. No hacer las cosas a medias o con desinterés. Vivir la vida como una aventura. Sentirse vivo y activo.',
                'description'   =>  'Estas personas se caracterizan por vivir la vida con un sentido de emoción, anticipación, energía y buena actitud. Las personas con entusiasmo exudan ánimo y alegría, por lo tanto, el concepto de entusiasmo implica realizar las tareas diarias de todo corazón, con una actitud de aventura, vivacidad y osadía. Las personas entusiastas son muy valoradas en el trabajo, ya que transmiten esa energía positiva al resto del grupo y porque estas personas suelen ser más leales, enfocadas, conscientes y comprometidas con los valores de las empresas. Las personas que tienen entusiasmo usualmente disfrutan la vida más que las personas con poco entusiasmo y demuestran niveles más altos de alegría, energía y actividad física, por lo que se desempeñan muy bien trabajando con niños y adolecentes.'
            ],
            [
                'section'       =>  'Trascendencia',
                'name'          =>  'Esperanza',
                'definition'    =>  'Esperar lo mejor del futuro y trabajar para lograrlo. Pensar que un mejor futuro esta en sus manos.',
                'description'   =>  'La esperanza es un estado mental optimista que se basa en la expectativa de resultados positivos con respecto a los eventos y circunstancias del futuro. La esperanza permite a las personas ver la vida con una mentalidad que propicia el éxito, lo cual aumenta las posibilidades de que las personas logren alcanzar sus metas y objetivos. Las personas que tienen esperanza usualmente muestran un mejor rendimiento en el trabajo, son mas felices, se sienten más satisfechas, son más comprometidas y, en general, tienen una mejor salud física y mental. Los psicólogos creen que la esperanza es uno de los sentimientos más importante que podemos sentir. Estudios científicos han mostrado que la esperanza es clave para la buena salud, predice la noción de que la persona lleva una vida significativa y es un buen indicador del rendimiento académico y deportivo.'
            ],
            [
                'section'       =>  'Trascendencia',
                'name'          =>  'Espiritualidad',
                'definition'    =>  'Tener creencias coherentes sobre el gran propósito y el significado del universo. Ser consciente donde uno encaja dentro del esquema más amplio. Tener creencias sobre el significado de la vida que dan forma a una buena conducta y que proporcionan bienestar.',
                'description'   =>  'La espiritualidad es un concepto amplio con espacio para muchas perspectivas. En general, la espiritualidad incluye un sentido de conexión con algo más grande que nosotros mismos, y usualmente implica la búsqueda del significado de la vida. Típicamente, las personas espirituales creen en la existencia de un mundo espiritual separado del mundo material, creen en un Dios y en otros seres espirituales, frecuentemente atienden a actividades religiosas, tienen un sentido de fe inquebrantable y se sienten motivadas a llevar una vida que esté acorde con sus creencias religiosas. Estudios científicos sugieren que la espiritualidad y la oración son beneficiosas para la salud mental, la salud física e incluso pueden alargar la vida de las personas.'
            ],
            [
                'section'       =>  'Trascendencia',
                'name'          =>  'Gratitud',
                'definition'    =>  'Ser consciente y agradecido por las cosas buenas que sucedan. Tomar el tiempo necesario para expresar agradecimiento.',
                'description'   =>  'La gratitud que la mayoría de la gente conoce es el sentimiento de aprecio mostrado por una persona que recibe bondad, regalos, ayuda, favores u otros tipos de generosidad. Las personas agradecidas usualmente se aseguran de tomarse el tiempo necesario para expresar agradecimiento por los favores recibidos y algunas veces buscan maneras originales para expresar estos sentimientos. Pero hay otro tipo de gratitud, igualmente importante, que se basa en estar agradecido por las cosas pequeñas de la vida, por las cosas que salen bien, por las comodidades que la persona disfruta, por tener casa, comida y amigos, por tener servicios como agua, teléfono y electricidad, por poder disfrutar de buena salud, etc.'
            ],
            [
                'section'       =>  'Valor',
                'name'          =>  'Honestidad',
                'definition'    =>  'Capacidad de ser honesto, no solo por decir la verdad, si no también, por actuar de forma genuina y auténtica — sin pretensión de aparentar algo que no es. Capacidad de asumir responsabilidad por sus propios sentimientos y acciones.',
                'description'   =>  'La honestidad es una faceta del carácter moral que connota atributos positivos y virtuosos como integridad, veracidad, sencillez, junto con la ausencia de mentiras, trampas, robo, etc. Las personas honestas se caracterizan por no prometer algo que no van a cumplir, nunca andan con mentiras ni falsedades, siempre actúan de una forma genuina y auténtica, y siempre dicen la verdad así no le guste a otras personas. Además, estas personas no cometen ni toleran que otras personas cometan actos de corrupción y por sobre todo son transparentes, no aparentan lo que no es, lo que la gente ve es como realmente son. La honestidad se puede resumir como la práctica de decir la verdad y de evitar el engaño por omisión o falsificación.'
            ],
            [
                'section'       =>  'Moderacion',
                'name'          =>  'Humildad',
                'definition'    =>  'Dejar que los logros y las acciones hablen por si mismos. Actuar sin pretensión.',
                'description'   =>  'En lugar de enfocarse excesivamente en sí mismos y en las cualidades positivas que poseen, los individuos humildes reconocen sus limitaciones junto con sus fortalezas, buscan perspectivas diversas y aprecian las contribuciones de otros sin experimentar una amenaza significativa a su ego. Estas personas no se sienten más importantes o mejores que los demás y mantienen una visión modesta de su importancia personal. Las personas humildes generalmente persiguen un enfoque de vida bajo en egocentrismo y buscan activamente un estilo de vida de "bajo perfil", carente de riquezas y pretensión social. Estas personas son buenas trabajando en equipo y tienen una alta disposición de servicio a los demás.'
            ],
            [
                'section'       =>  'Trascendencia',
                'name'          =>  'Humor',
                'definition'    =>  'Apreciación por la risa y las bromas. Capacidad de hacer sonreír a las demás personas. Ver las cosas de forma más ligera. Hacer bromas (no necesariamente contando chistes).',
                'description'   =>  'El humor es un estado involuntario de diversión mental que está conformado por un contexto social, un proceso mental, una respuesta emocional y una respuesta fisiológica en forma de risa.  Las personas con sentido del humor se caracterizan por tener la capacidad de divertirse y reírse en una amplia variedad de situaciones, no importa dónde estén, con quién estén, o cómo se sientan, usualmente se divierten y se ríen con facilidad. Además, no pierden su sentido del humor cuando están teniendo un mal día. El sentido del humor es una de las claves del éxito en el trabajo ya que actúa como lubricante social, por lo cual es un componente importante del arte de llevarse bien con las personas.'
            ],
            [
                'section'       =>  'Justicia',
                'name'          =>  'Igualdad',
                'definition'    =>  'Capacidad de tratar a todas las personas de acuerdo con las nociones de ecuanimidad y justicia. No dejar que sentimientos personales sesguen al tomar decisiones sobre otras personas. Dar a todos una oportunidad justa.',
                'description'   =>  'La igualdad es un estado donde todas las personas dentro de una sociedad tienen el mismo estatus en ciertos aspectos, incluidos los derechos civiles, la libertad de expresión, los derechos de propiedad y el acceso igualitario a los bienes y servicios sociales. Las personas que valoran la igualdad demuestran una alta capacidad de tratar a los demás con imparcialidad y justicia, evitando que sus sesgos y sentimientos personales interfieran al momento de tratar con otras personas. Debido a que estos individuos no discriminan según la raza, sexo, orientación sexual, edad, estatus socioeconómico, religión, etc., terminan dándoles las mismas oportunidades a todas las personas, por los que se desempeñan muy bien trabajando en recursos humanos, como empleados públicos o en organizaciones no gubernamentales donde es necesario entrar en contacto con personas de diversos orígenes.'
            ],
            [
                'section'       =>  'Humanidad',
                'name'          =>  'Inteligencia Social',
                'definition'    =>  'Ser consciente de los motivos y sentimientos propios y de los demás. Saber qué hacer para encajar en distintas situaciones sociales. Capacidad entender las maneras de conectar con las demás personas.',
                'description'   =>  'La inteligencia social es la capacidad de establecer relaciones interpersonales y de navegar exitosamente los entornos sociales. La inteligencia social no se hereda, ésta se aprende y se desarrolla a partir de la experiencia. Los elementos de la inteligencia social incluyen la fluidez verbal y la habilidad de conversación, el poder percibir los sentimientos y los estados de animo de otras personas, el conocimiento de las reglas y los roles sociales, el sentirse socialmente seguro de sí mismo y el poseer la habilidad de generar buenas impresiones en otras personas. Todos estos elementos permiten que las personas con un alto grado de inteligencia social desarrollen nexos fuertes con una red de contactos amplia, lo cual es especialmente importante en una era donde se están generalizando los sentimientos de soledad y aislamiento social.'
            ],
            [
                'section'       =>  'Justicia',
                'name'          =>  'Liderazgo',
                'definition'    =>  'Capacidad de motivar a un grupo para lograr que se cumplan las metas, preservando las buenas relaciones dentro del mismo. Capacidad de organizar actividades grupales y velar por que estas se lleven a cabo.',
                'description'   =>  'El liderazgo es una habilidad práctica que abarca la capacidad que tiene una persona para influir en otros individuos, equipos u organizaciones, de manera de hacerlos internalizar una visión colectiva y movilizarlos para alcanzar esa visión. Una amplia investigación ha encontrado que los grandes líderes poseen los siguientes 10 rasgos de liderazgo: honestidad, capacidad para delegar, comunicación, sentido del humor, confianza, compromiso, actitud positiva, creatividad, intuición y capacidad para inspirar. El liderazgo es uno de los elementos más influyentes y críticos en todas las empresas, el cual tiene la capacidad de poner a las personas en la vía rápida hacia el éxito en la vida profesional.'
            ],
            [
                'section'       =>  'Moderacion',
                'name'          =>  'Perdón',
                'definition'    =>  'Perdonar a aquellos que han obrado mal. Aceptar los defectos de los demás. Capacidad de otorgar una segunda oportunidad. Tener el perdón como guía, y no la venganza.',
                'description'   =>  'Perdonar es el proceso mediante el cual una víctima decide deliberadamente generar un cambio intencional y voluntario en los sentimientos y la actitud con respecto a la persona que ha obrado mal. Estas personas dejan ir las emociones negativas como la venganza, la recompensa o el castigo del ofensor, por muy legal o moral que sea, y terminan deseándole el bien al ofensor. Estudios científicos han demostrado que los beneficios del perdón son muchos incluyendo mejores relaciones personales, mejor salud mental, menos ansiedad, estrés y hostilidad, disminución de los síntomas de la depresión, un sistema inmunológico más fuerte, mejor autoestima, etc.'
            ],
            [
                'section'       =>  'Valor',
                'name'          =>  'Perseverancia',
                'definition'    =>  'Completar los proyectos que se inician. Capacidad de perseverar en el plan de acción, a pesar de los obstáculos. Sacar las cosas adelante. Sentir satisfacción al cumplir cometidos y metas.',
                'description'   =>  'Estas personas sienten una poderosa motivación para alcanzar sus objetivos. Impulsados por la pasión, una vez que deciden hacer algo, no se detienen hasta alcanzar la meta y se mantienen motivados incluso en actividades que se extienden por meses o años. Para estas personas, cuanto más difícil es la tarea, más determinados se sienten a terminarla, lo cual incrementa su tenacidad al punto que continúan haciendo tareas difíciles, incluso, cuando otros se han dado por vencidos. La perseverancia es una clave importante para una vida exitosa ya que el éxito a menudo tiene mucho más que ver con la perseverancia que con las cualidades innatas de una persona.'
            ],
            [
                'section'       =>  'Sabiduria',
                'name'          =>  'Perspectiva',
                'definition'    =>  'Ser capaz de proporcionar sabios consejos a los demás. Tener formas de ver el mundo de una manera que tiene sentido para usted mismo y para los demás.',
                'description'   =>  'La perspectiva es la capacidad de pensar utilizando el conocimiento, la experiencia, la comprensión y el sentido común, lo cual permite dar recomendaciones sabias a personas en una variedad de situaciones. Las personas con buena perspectiva le es fácil ver el trasfondo de las situaciones, por lo que comprenden fácilmente como abordar los problemas de la vida. Estas personas siempre examinan las situaciones considerando todos los puntos de vista y toda la información relevante, y son buenos juzgando correctamente los asuntos relacionados a las contradicciones de la vida y la conducta de las personas. Estas personas son muy buenas dando consejos, por lo que la gente frecuentemente los busca para contarles sus problemas.'
            ],
            [
                'section'       =>  'Moderacion',
                'name'          =>  'Prudencia',
                'definition'    =>  'Tomar decisiones con cautela. No tomar riesgos innecesarios. No decir o hacer cosas de las que se pueda arrepentir en un futuro.',
                'description'   =>  'La prudencia es la inteligencia de los valientes, es la capacidad de gobernar y disciplinarse mediante el uso de la razón. Las personas prudentes se caracterizan por tener la capacidad de controlarse para evitar situaciones de las que se pueden llegar a arrepentir en el futuro. Son buenas evitando circunstancias que se pueden salir de control, evitan tomar riesgos innecesarios, siempre piensan muy bien las cosas antes de actuar, evitan decir cosas inapropiadas cuando están en situaciones acaloradas, y por sobre todo, siempre actúan con cuidado, precaución y buen juicio. Las personas prudentes no sacrifican los objetivos del futuro por placeres a corto plazo, sino que tiene en cuenta lo que eventualmente puede darles mayores niveles de satisfacción.'
            ],
            [
                'section'       =>  'Justicia',
                'name'          =>  'Trabajo en Equipo',
                'definition'    =>  'Participar y trabajar bien como parte de un equipo o grupo. Ser leal al grupo. Cumplir con sus responsabilidades y compromisos para alcanzar un objetivo común.',
                'description'   =>  'El trabajo en equipo es la capacidad de trabajar en conjunto hacia una visión común, es la capacidad de dirigir los logros individuales hacia los objetivos de la organización. En casi todos los dominios, la oficina, el hogar y, por supuesto, en el campo de juego, el trabajo en equipo es esencial. Estas personas se caracterizan porque siempre siguen las instrucciones así no estén de acuerdo con el líder del grupo, disfrutan más los proyectos en equipo que los proyectos individuales, tratan de incluir a todos los miembros del equipo porque valoran las contribuciones de todos los miembros, son buenos comunicando y escuchando a las personas y, generalmente, se esfuerzan más cuando trabajan como parte de un equipo que cuando trabajan individualmente.'
            ],
            [
                'section'       =>  'Valor',
                'name'          =>  'Valentía',
                'definition'    =>  'Capacidad de no reducirse por alguna amenaza, desafío, dificultad o dolor. Defender lo correcto y decir lo que piensa aunque tenga oposición. Actuar según sus convicciones. Incluye capacidad de valentía física sin limitarse a ella.',
                'description'   =>  'La valentía es la gestión del miedo, es la disposición que tienen algunas personas para enfrentar adversidades en el ámbito físico o moral. El valor físico es la valentía frente al dolor físico, las dificultades, la muerte o la amenaza de muerte, mientras que el valor moral es la capacidad de actuar correctamente ante la oposición popular, la vergüenza, el escándalo, el desaliento o la pérdida personal. Las personas valientes son capaces de arriesgar su vida por salvar a una persona que se encuentre en peligro, no se dejan intimidar por las amenazas de brabucones, siempre hacen lo correcto, dicen lo que piensan aunque su posición no sea popular y con gusto sacrificarían la seguridad y la conveniencia de su vida para lograr un objetivo que sea noble y digno.'
            ],
        ];

        for( $i = 0; $i < count( $categories ); $i ++ ){
            DB::table('categories')->insert([
                'section'       =>  $categories[$i]['section'],
                'name'          =>  $categories[$i]['name'],
                'definition'    =>  $categories[$i]['definition'],
                'description'   =>  $categories[$i]['description'],
                'status'        =>  1,
                'created_at'    =>  date('Y-m-d H:i:s'),
                'updated_at'    =>  date('Y-m-d H:i:s')
            ]);
        }
    }
}
