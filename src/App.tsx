import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { HREFS } from "./constants";
import TransactionList from "./components/TransactionList/TransactionList";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store/store";
import AuthForm from "./components/AuthForm/AuthForm";
import { useEffect } from "react";

function App() {
  const isLoggedIn = !!useSelector(
    (state: RootState) => state.auth.accessToken
  );

  useEffect(()=>{
    let notiWorker: ServiceWorkerRegistration | null = null;
    const registerPushNotificationSW = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/push-noti-worker.js"
          );
          // subscribe to push notifications
          console.debug("Service Worker registered successfully", registration);
          await registration.pushManager.subscribe({
            applicationServerKey: "BLXxVs9IiiRh8D-ElOTd3awYLb4R_EJto3cTYU5jFSWBLGAknCwCyAo5L9OVW_Bx2copipFeXlWY1QcOVr3kRWY",
            userVisibleOnly: true,
          })
          console.debug("Push subscription created successfully");
          const subscription = await registration.pushManager.getSubscription()
          console.debug("Current subscription:", subscription);
          console.log(JSON.stringify(subscription));
          notiWorker = registration
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    }
    Notification.requestPermission().then(permission=>{
      if (permission === "granted") {
        console.debug("Notification permission granted");
        registerPushNotificationSW();
      }
    })
    return ()=>{
      if (notiWorker) {
        console.debug("Unregistering Service Worker");
        notiWorker.unregister()
      }
    }
  },[])

  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to={HREFS.dashboard} />
                ) : (
                  <Navigate to={HREFS.login} />
                )
              }
            />
            <Route path={HREFS.dashboard} element={<Dashboard />} />
            <Route path={HREFS.transactions} element={<TransactionList />} />
            <Route path={HREFS.login} element={<AuthForm isLogin={true} />} />
            <Route
              path={HREFS.register}
              element={<AuthForm isLogin={false} />}
            />
            <Route path="*" element={<Navigate to={HREFS.login} />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
