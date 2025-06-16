import AddPropertyDetail from "../../pages/app/Addpropertydetail";
import Dashboard from "../../pages/app/Dashboard";
import Documents from "../../pages/app/Documents";
import Privacypolicy from "../../pages/app/Privacypolicy";
import PropertyDetail from "../../pages/app/PropertyDetail";
import Renthistory from "../../pages/app/Renthistory";
import Termsandconditions from "../../pages/app/Termsandconditions";

export const appRoutes = [

    {
        url: "add-property-details",
        page: <AddPropertyDetail />,
        name: "Add Property Details",
        isPublic: true,
    },
    {
        url: "terms-and-conditions",
        page: <Termsandconditions />,
        name: "Terms And Conditions",
        isPublic: true,
    },
    {
        url: "privacy-policy",
        page: <Privacypolicy />,
        name: "Privacy policy",
        isPublic: true,
    },
    {
        url: "dashboard",
        page: <Dashboard />,
        name: "Dashboard",
        isPublic: true,
    },
     {
        url: "property-detail",
        page: <PropertyDetail />,
        name: "Property Detail",
        isPublic: true,
    },
     {
        url: "rent-history",
        page: <Renthistory />,
        name: "Rent History",
        isPublic: true,
    },
    {
        url: "documents",
        page: <Documents />,
        name: "Documents",
        isPublic: true,
    },
]