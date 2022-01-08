import { BrowserRouter, Routes, Route } from "react-router-dom";

// components & pages
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Feed from "./pages/home/components/Feed";
import PostPage from "./pages/post/Post";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import UserContextProvider from "./context/userContext";
import ProfilePage from "./pages/profile/Profile";
import NotFound from "./pages/errors/NotFound";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<Home />}>
              <Route index element={<Feed />} />
              <Route path="post/:postId" element={<PostPage />} />
            </Route>
            <Route path="/chat" element={<Chat />} />
            <Route path="user/:userId" element={<ProfilePage />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
