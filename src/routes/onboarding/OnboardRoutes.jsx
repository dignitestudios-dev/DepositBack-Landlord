import Addpersonalinfo from "../../pages/authentication/Addpersonalinfo";
import Accountcreated from "../../pages/onboarding/Accountcreated";
import Paymentmethod from "../../pages/onboarding/Paymentmethod";
import Profileapproved from "../../pages/onboarding/Profileapproved";
import RequestSubmitted from "../../pages/onboarding/RequestSubmitted";
import SubscriptionPlans from "../../pages/onboarding/Subscriptionplans";

export const OnboardRoutes = [
    {
        url: "personal-info",
        page: <Addpersonalinfo />,
        name: "Personal Info",
        isPublic: true,
    },
    {
        url: "subscription-plans",
        page: <SubscriptionPlans />,
        name: "Subscription PlanS",
        isPublic: true,
    },
    {
        url: "payment-method",
        page: <Paymentmethod />,
        name: "Payment Method",
        isPublic: true,
    },
     {
        url: "request-submitted",
        page: <RequestSubmitted />,
        name: "Request Submitted",
        isPublic: true,
    },
     {
        url: "profile-approved",
        page: <Profileapproved />,
        name: "Profile Approved",
        isPublic: true,
    },
    {
        url: "account-created",
        page: <Accountcreated />,
        name: "Account Created",
        isPublic: true,
    },
]