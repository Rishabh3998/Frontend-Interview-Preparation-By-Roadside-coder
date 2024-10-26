import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      React router DOM tutorial
      <Header />
      {isLoading && <div>Loading....</div>}
      {/* <Footer/> */}
      {/* Note: To render children routes we need to use outlet */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
