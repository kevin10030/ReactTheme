
import LoginPage from "../modules/website/LoginPage.js";
import RegisterPage from "../modules/website/RegisterPage.js";
import VerificationPage from "../modules/website/VerificationPage.js";
import Terms from "../modules/website/TermsAndConditions.js";
import Privacy from "../modules/website/PrivacyPolicy.js";
import About from "../modules/website/AboutPage.js";
import WhyUs from "../modules/website/WhyUs.js";
import Contact from "../modules/website/ContactPage.js";
import Home from "../modules/website/HomePage.js";
import ScheduleFreeClass from "../modules/website/ScheduleFreeClassPage.js";
import EmailConfirmationPage from "../modules/website/EmailConfirmationPage";
import ChangePasswordPage from "../modules/website/ChangePasswordPage";
import UserProfilePage from "../modules/website/UserProfilePage";

var dashRoutes = [
    {
        path: "/login-page",
        name: "Login Page",
        mini: "L",
        component: LoginPage,
        layout: "/auth"
    },
    {
        path: "/register-page",
        name: "Register Page",
        mini: "R",
        component: RegisterPage,
        layout: "/auth"
    },
    {
        path: "/verify",
        name: "Verification Page",
        mini: "V",
        component: VerificationPage,
        layout: "/auth"
    },
    {
        path: "/terms-and-conditions",
        name: "Terms and Conditions",
        mini: "T",
        component: Terms,
        layout: "/auth"
    },
    {
        path: "/privacy-policy",
        name: "Privacy Policy",
        mini: "P",
        component: Privacy,
        layout: "/auth"
    },
    {
        path: "/about",
        name: "AboutUs",
        mini: "A",
        component: About,
        layout: "/auth"
    },
    {
        path: "/why-us",
        name: "Why Us",
        mini: "W",
        component: WhyUs,
        layout: "/auth"
    },
    {
        path: "/contact",
        name: "Contact",
        mini: "C",
        component: Contact,
        layout: "/auth"
    },
    {
        path: "/schedule-free-class",
        name: "Schedule A Free Class",
        mini: "S",
        component: ScheduleFreeClass,
        layout: "/auth"
    },    
    {
        path: "/home",
        name: "Home",
        mini: "H",
        component: Home,
        layout: "/auth"
    },
    {
        path: "/email-confirmation",
        name: "EmailConfirmationPage",
        mini: "E",
        component: EmailConfirmationPage,
        layout: "/auth"
    },
    {
        path: "/change-password",
        name: "ChangePasswordPage",
        mini: "C",
        component: ChangePasswordPage,
        layout: "/auth"
    },
    {
        path: "/user-profile",
        name: "UserProfilePage",
        mini: "U",
        component: UserProfilePage,
        layout: "/auth"
    }
];
export default dashRoutes;
