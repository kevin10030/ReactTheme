class Config {
    constructor() {
        this.urls = []
        this.config = {}
        this.configReady = false

        this.BACKEND_API_URL = "https://hfa3ovai45.execute-api.us-east-2.amazonaws.com/api/v1"
//        this.FILE_SERVER_URL = "http://localhost:3002"
        this.WEBSITE_URL = "https://trainingapp.godataplush.com/";
        this.STRIPE_PUBLISHABLE_KEY = "pk_test_51HoJ7lEW8ELLg74EpUwGfDBHRE818ndk53WS4MP1OfHKGcUhppaQjdrxZJ0SHQ33hxJAi7sPNIJkhqoPJF6940Fr00txoaVRxn"

//home page
        this.home_top_string1 = "Personalized "
        this.home_top_string2 = "Online Coding \nand Robotics "
        this.home_top_string2_mobile = "Online Coding and Robotics "
        this.home_top_string3 = "classes for \nbeginners"
        this.home_top_string3_mobile = "classes for beginners"
        this.home_top_string4 = "Interactive learning and personalized programs - Focus on IoT, \nCoding, Robotics and Cloud computing.World’s first of its kind tech \ncurriculum for Kids.Kick start your kid’s dream to build a \nsmarter world"
        this.home_top_string4_mobile = "Interactive learning and personalized programs - Focus on IoT, Coding, Robotics and Cloud computing.World’s first of its kind tech curriculum for Kids.Kick start your kid’s dream to build a smarter world"
        this.home_top_button_string1 = "Book a free trial"
        this.home_top_button_string2 = "Link for free trial"

        this.home_yourkids_willlearn = "Your Kids will Learn"
        this.home_yourkids_string1 = "Logic"
        this.home_yourkids_string2 = "Innovation"
        this.home_yourkids_string3 = "Creativity"
        this.home_yourkids_string4 = "Problem Solving"
        this.home_yourkids_string5 = "Analytical Thinking"
        this.home_yourkids_string6 = "Team Work"

        this.home_second_string1 = "Make your kid a creator for life by \nunlocking their potential in \ntechnology by interactive \ntraining on Creative thinking"
        this.home_second_string1_mobile = "Make your kid a creator for life by unlocking their potential in technology by interactive training on Creative thinking"
        this.home_second_string2 = "Basics of IoT and cloud computing"
        this.home_second_string3 = "Hands on projects on Robotics"
        this.home_second_string4 = "Live online support"

        this.home_third_string1 = "Highly qualified and experienced trainers.\nState of the art e-learning platform \non cloudSkill development and \nonline certification"
        this.home_third_string1_mobile = "Highly qualified and experienced trainers.State of the art e-learning platform on cloudSkill development and online certification"
        this.home_third_string2 = "Advanced trainning on IoT, Coding, Robotics and Cloud \ncomputing."
        this.home_third_string2_mobile = "Advanced trainning on IoT, Coding, Robotics and Cloud computing."
        this.home_third_string3 = "Hands on projects on Robotics"
        this.home_third_string4 = "Live online support"
        this.home_third_string5 = "Highly qualified and experienced trainers.\nState of the art e-learning platform on cloud \nSkill development and online certification"
        this.home_third_string5_mobile = "Highly qualified and experienced trainers.State of the art e-learning platform on cloud Skill development and online certification"
        this.home_third_button_string1 = "Book a free trial"
        this.home_third_button_string2 = "Link for free trial"

        this.home_aboutus_string1 = "About Us"
        this.home_aboutus_string2 = "Learning with Love \nand Laughter"
        this.home_aboutus_string3 = "Our mission is to sprad education that is easy accessible \nand everyone can learn"
        this.home_aboutus_string3_mobile = "Our mission is to sprad education that is easy accessible and everyone can learn"
        this.home_aboutus_button_string1 = "Read More"

        this.home_points_string1 = "Better Future"
        this.home_points_string1_exp = "Set have great you male grasses yielding \nyielding first their to called deep\nabundantly Set have\ngreat you male"
        this.home_points_string2 = "Qualified Trainers"
        this.home_points_string2_exp = "Set have great you male grasses yielding \nyielding first their to called deep\nabundantly Set have\ngreat you male"
        this.home_points_string3 = "Job Oppurtunity"
        this.home_points_string3_exp = "Set have great you male grasses yielding \nyielding first their to called deep\nabundantly Set have\ngreat you male"

        this.home_stemlearning_string1 = "The Ultimate STEM Learning Platform"
        this.home_stemlearning_string2 = "Explore a whole level of project making and problem - solving wiht cutting-edge technology and \nwell-rounded STEM learning resources"
        this.home_stemlearning_string2_mobile = "Explore a whole level of project making and problem - solving wiht cutting-edge technology and well-rounded STEM learning resources"

        this.home_stemlearning_first_string1 = "The STEM Safari"
        this.home_stemlearning_first_string2 = "A Journey Through the STEM World"
        this.home_stemlearning_first_string3 = "Uncover the ‘hows’ & ‘Whys’ of electronics, programming , robotic& other STEM\neducation fields on the STEM safari - Premium online courses providing \nLimitles hands-on exploration, creativity & innovativeness via engaging videos,\ntextual instrucations, quizzes & assessments."
        this.home_stemlearning_first_string3_mobile = "Uncover the ‘hows’ & ‘Whys’ of electronics, programming , robotic& other STEM education fields on the STEM safari - Premium online courses providing Limitles hands-on exploration, creativity & innovativeness via engaging videos,textual instrucations, quizzes & assessments."
        this.home_stemlearning_first_button_string = "Explore Courses"

        this.home_stemlearning_second_string1 = "Education STEM Kits"
        this.home_stemlearning_second_string2 = "Make counless robots and fascination DIY projects withour intuitive and \naffordable STEM learning kits for kids and beginners packed with more\n features than the age-old brands in the market"
        this.home_stemlearning_second_string2_mobile = "Make counless robots and fascination DIY projects withour intuitive and affordable STEM learning kits for kids and beginners packed with more features than the age-old brands in the market"
        this.home_stemlearning_second_button_string = "Explore Kits"

        this.home_stemlearning_third_string1 = "Augmented Graphical \nProgramming"
        this.home_stemlearning_third_string2 = "Learn coding, arfificial intelligence, machine learning, program action for\nrobots.make interactive games and do much more with PictoBlox.\na Scratch blocks based coding platgorm with enhanced \nhardware-interaction capbilities."
        this.home_stemlearning_third_string2_mobile = "Learn coding, arfificial intelligence, machine learning, program action for robots.make interactive games and do much more with PictoBlox.a Scratch blocks based coding platgorm with enhanced hardware-interaction capbilities."
        this.home_stemlearning_third_button_string = "Learn More"

        this.home_courses_string1 = "POPULAR COURSES"
        this.home_courses_string2 = "Your domain control panel is designed for ease-of-use and\nallows for all aspects of your domains."
        this.home_courses_string2_mobile = "Your domain control panel is designed for ease-of-use and allows for all aspects of your domains."

        this.home_cout_string1 = "“If we teach today as we taught yesterday, we rob our children of tomorrow.” "
        this.home_cout_string2 = "- John Dewey"

        this.home_free_trial_string1 = "learn from India’s best teachers with live doubt solving \nand personalised one-on-one attention"
        this.home_free_trial_field_string1 = "Name of your child"
        this.home_free_trial_field_string2 = "Mobile Number"
        this.home_free_trial_field_string3 = "Email (Optional)"
        this.home_free_trial_field_string4 = "State"
        this.home_free_trial_field_string5 = "Grade"
        this.home_free_trial_check_string = "I would like to receive updates via whatsApp"
        this.home_free_trial_string2 = "Hurry, Limited seats only!"
        this.home_free_trial_button_string = "Book your free class"

        this.home_blog_string1 = "BLOG"
        this.home_blog_card_button_string = "Web Development"
        this.home_blog_card_string1 = "Google inks pact for new \n35-storey office"
        this.home_blog_card_string2 = "Which whose darkness saying were life unto\nfish wherein all fish of together called\n"

        this.home_tesimonials_string1 = "TESIMONIALS"

//Terms and Conditions
        this.terms_string1 = "Personal identification information"
        this.terms_sub_string1 = "By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, \nand agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are \nprohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade \nmark law."
        this.terms_sub_string1_mobile = "By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law."

        this.terms_string2 = "Non-personal identification information"
        this.terms_sub_string2 = "A/ Permission is granted to temporarily download one copy of the materials (information or software) on  web site for personal, non-\ncommercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\n- modify or copy the materials;\n- use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n- attempt to decompile or reverse engineer any software contained on Jobify’s web site;\n- remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or “mirror” the \nmaterials on any other server.\n\nThis license shall automatically terminate if you violate any of these restrictions and may be terminated by Thedir at any time. Upon \nterminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your \npossession whether in electronic or printed format.\n\n"
        this.terms_sub_string2_mobile1 = "A/ Permission is granted to temporarily download one copy of the materials (information or software) on  web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
        this.terms_sub_string2_mobile2 = "- modify or copy the materials;"
        this.terms_sub_string2_mobile3 = "- use the materials for any commercial purpose, or for any public display (commercial or non-commercial);"
        this.terms_sub_string2_mobile4 = "- attempt to decompile or reverse engineer any software contained on Jobify’s web site;"
        this.terms_sub_string2_mobile5 = "- remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or “mirror” the materials on any other server."
        this.terms_sub_string2_mobile6 = "This license shall automatically terminate if you violate any of these restrictions and may be terminated by Thedir at any time. Upon \nterminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format."
        
        this.terms_string3 = "Web browser cookies"
        this.terms_sub_string3 = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other\nwarranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-\ninfringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the\naccuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any \nsites linked to this site."
        this.terms_sub_string3_mobile = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site."
        this.terms_string4 = "How we use collected information"
        this.terms_sub_string4 = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other \nwarranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-\ninfringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the \naccuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any \nsites linked to this site."
        this.terms_sub_string4_mobile = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site."
        this.terms_string5 = "How we protect your information"        
        this.terms_sub_string5 = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other \nwarranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-\ninfringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the \naccuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any \nsites linked to this site."
        this.terms_sub_string5_mobile = "The materials on s web site are provided “as is”.  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further,  does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site."
//Contact  us

        this.contactus_string1 = "Get in touch with us"
        this.contactus_string1_content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the \n1500s, when an unknown printer took a galley of type and scrambled it to make \na type specimen book. It has survived not only five centuries, but also the leap \ninto electronic typesetting, remaining essentially unchanged. "        
        this.contactus_string1_content_mobile = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
        this.contactus_string2 = "Opening Hours"
        this.contactus_string2_content="Daily: 8.00 AM–10.00 PM\nSunday & Holidays: Closed"
        this.contactus_string3 = "Contact Info"
        this.contactus_string3_sub1 = "Metrotech Center,\nBrooklyn, NY 11201,\nUSA"
        this.contactus_string3_sub2 = "info@gmail.com"
        this.contactus_string3_sub3 = "+41 1234567890"
        this.contactus_string4 = "Social Contact"
        this.contactus_string5 = "Let's Conversion \nwith Dataplush"


//About us
        this.aboutus_string1 = "Vision and Misssion"
        this.aboutus_string1_sub1 = "Vision"
        this.aboutus_string1_sub1_content = "Inspire the next generation to build a smarter world by enabling them to master intelligent \nasystems and technologies."
        this.aboutus_string1_sub1_content_mobile = "Inspire the next generation to build a smarter world by enabling them to master intelligent asystems and technologies."
        this.aboutus_string1_sub2 = "Mission"
        this.aboutus_string1_sub2_content1 = "To make the next generation active creators of smart technologies using tools like AI, IoT, \nData Analytics and Cloud Computing."
        this.aboutus_string1_sub2_content1_mobile = "To make the next generation active creators of smart technologies using tools like AI, IoT, Data Analytics and Cloud Computing."
        this.aboutus_string1_sub2_content2 = "Make kids involvement with technology creative and enriching rather than passive. "
        this.aboutus_string1_sub2_content2_mobile = "Make kids involvement with technology creative and enriching rather than passive. "
        this.aboutus_string1_sub2_content3 = "To instil Creativity, Technical Skills, Logical reasoning and Problem solving Skills in \nstudents."
        this.aboutus_string1_sub2_content3_mobile = "To instil Creativity, Technical Skills, Logical reasoning and Problem solving Skills in students."

        this.aboutus_string2 = "Area of Expertise"
        this.aboutus_string2_content1 = "Billions of physical devices around the \nworld are now connected to the internet, \nall collecting and sharing data. It's \npossible to turn anything, from \nsomething as small as a pill to \nsomething as big as an airplane, \ninto a part of the IoT"
        this.aboutus_string2_content2 = "Billions of physical devices around the \nworld are now connected to the internet, \nall collecting and sharing data. It's \npossible to turn anything, from \nsomething as small as a pill to \nsomething as big as an airplane, \ninto a part of the IoT"
        this.aboutus_string2_content3 = "Billions of physical devices around the \nworld are now connected to the internet, \nall collecting and sharing data. It's \npossible to turn anything, from \nsomething as small as a pill to \nsomething as big as an airplane, \ninto a part of the IoT"

        this.aboutus_string3 = "A global company with a strong vision to create technically skilled and \nconfident individuals. Highly synchronized with the new wave of digital \ntransformation operations irrespective of the nature of business or \norganization, the company has built an arena to learn and update \nto be more productive in their performance."
        this.aboutus_string3_mobile = "A global company with a strong vision to create technically skilled and confident individuals. Highly synchronized with the new wave of digital transformation operations irrespective of the nature of business or organization, the company has built an arena to learn and update to be more productive in their performance."
        this.aboutus_string4 = "QUALITY POLICY"
        this.aboutus_string4_content1 = "It is our policy of to provide the best quality service with respect to our \nmission. The company bears the responsibility to the individual as \nwell as the collective needs of the clients globally."
        this.aboutus_string4_content1_mobile = "It is our policy of to provide the best quality service with respect to our mission. The company bears the responsibility to the individual as well as the collective needs of the clients globally."
        this.aboutus_string4_content2 = "The company equates the commitments, actions and the service \ndeliverables to the quality concerns of the organizations. "
        this.aboutus_string4_content2_mobile = "The company equates the commitments, actions and the service deliverables to the quality concerns of the organizations. "
        this.aboutus_string4_content3 = "We reassure to monitor our performance and gauge the results as \na consistent activity to enhance the service and to provide an agenda \nfor ascertaining environmental mission and targets."
        this.aboutus_string4_content3_mobile = "We reassure to monitor our performance and gauge the results as a consistent activity to enhance the service and to provide an agenda for ascertaining environmental mission and targets."
//Why Us
        this.whyus_string1 = "The STEM Safari"
        this.whyus_string1_sub1 = "A Journey Through the STEM World"
        this.whyus_string1_sub2 = "Uncover the ‘hows’ & ‘Whys’ of electronics, programming , robotic& other STEM\neducation fields on the STEM safari - Premium online courses providing \nLimitles hands-on exploration, creativity & innovativeness via engaging videos,\ntextual instrucations, quizzes & assessments."
        this.whyus_string1_sub2_mobile = "Uncover the ‘hows’ & ‘Whys’ of electronics, programming , \nrobotic& other STEM education fields on the STEM safari\n - Premium online courses providing \nLimitles hands-on exploration, creativity & \ninnovativeness via engaging videos,\ntextual instrucations, quizzes & assessments."
        this.whyus_string2 = "Lorem ipsum"
        this.whyus_string2_sub1 = "dolor sit amet, consectetur \nadipisicing elit, sed do eiusmod \ntempor incididunt ut labore \net dolore magna aliqua. "
//Login
        this.login_left_string1 = "It is a long established fact that a reader will be \ndistracted by the readable content of a \npage when looking at its layout. "

//footer
        this.footer_string1 = "The are likely to focus on the text, disregarding the \nlayout and its e, an unacceptable risk in \ncorporate environments."
        this.footer_string1_mobile = "The are likely to focus on the text, disregarding the layout and its e, an unacceptable risk in corporate environments."
        this.newsletter_string1 = "Stay updated with our latest trends Seed \nheaven so said place winged over given forth fruit."
        this.footer_contactus_string1 = "Phone: +91 88888-99999"
        this.footer_contactus_string2 = "Email: info@info@dataplush.com"
        this.footer_contactus_string3 = "Address: Most of its text is made up from \nsections 1.10.32–3 of Cicero's De finibus"
        this.footer_contactus_string3_mobile = "Address: Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus"
    }
}

export default (new Config);
