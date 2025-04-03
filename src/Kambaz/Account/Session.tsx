import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

interface SessionProps {
  children: React.ReactNode;
}

const Session: React.FC<SessionProps> = ({ children }) => {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      dispatch(setCurrentUser(user));
    } catch (error) {
      dispatch(setCurrentUser(null));
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return <>{!pending && children}</>;
};

export default Session;
