import React from "react";
import AppRouter from "./components/AppRouter";
import AppLayout from "./Layout/AppLayout";

function App() {
    return (
        <AppLayout>
            <AppRouter />
        </AppLayout>
    );
}

export default App;
